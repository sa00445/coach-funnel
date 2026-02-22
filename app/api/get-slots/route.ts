import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const startDate = searchParams.get('startDate') // epoch ms
  const endDate = searchParams.get('endDate')     // epoch ms
  const timezone = searchParams.get('timezone') || 'UTC'

  const calendarId = process.env.GHL_CALENDAR_ID
  const token = process.env.GHL_API_TOKEN

  if (!calendarId || !token) {
    return NextResponse.json({ error: 'Missing config' }, { status: 500 })
  }

  try {
    const params = new URLSearchParams({
      startDate: startDate || '',
      endDate: endDate || '',
      timezone,
    })

    const url = `https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots?${params}`
    console.log('Fetching GHL slots:', url)

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Version: '2021-07-28',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    const data = await res.json()
    console.log('GHL response status:', res.status)
    console.log('GHL response data:', JSON.stringify(data).slice(0, 500))

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'GHL API error', detail: data }, { status: res.status })
    }

    // GHL v2 returns: { _dates_: { "YYYY-MM-DD": { slots: [...] } } }
    // or: { data: { "YYYY-MM-DD": { slots: [...] } } }
    let slots: { startTime: string; endTime: string }[] = []

    const slotsContainer = data._dates_ || data.data || {}
    const dateKeys = Object.keys(slotsContainer)

    for (const dateKey of dateKeys) {
      const dayData = slotsContainer[dateKey]
      const rawSlots = dayData?.slots || dayData || []
      if (Array.isArray(rawSlots)) {
        for (const s of rawSlots) {
          const startTime = typeof s === 'string' ? s : s.startTime || s.time
          if (startTime) {
            const endTime = new Date(new Date(startTime).getTime() + 30 * 60000).toISOString()
            slots.push({ startTime, endTime })
          }
        }
      }
    }

    return NextResponse.json({ slots, _raw: data })
  } catch (e) {
    console.error('Error fetching slots:', e)
    return NextResponse.json({ error: 'Failed to fetch slots', detail: String(e) }, { status: 500 })
  }
}
