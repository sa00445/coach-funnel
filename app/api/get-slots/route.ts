import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const timezone = searchParams.get('timezone') || 'UTC'

  const calendarId = process.env.GHL_CALENDAR_ID
  const token = process.env.GHL_API_TOKEN
  const locationId = process.env.GHL_LOCATION_ID

  if (!calendarId || !token) {
    return NextResponse.json({ error: 'Missing config' }, { status: 500 })
  }

  try {
    const params = new URLSearchParams({
      startDate: startDate || '',
      endDate: endDate || '',
      timezone,
    })

    const res = await fetch(
      `https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Version: '2021-07-28',
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await res.json()

    // Extract slots from the response
    let slots: { startTime: string; endTime: string }[] = []
    
    if (data.data) {
      // GHL returns slots nested by date
      const dateKey = Object.keys(data.data)[0]
      if (dateKey && data.data[dateKey]?.slots) {
        slots = data.data[dateKey].slots.map((s: any) => ({
          startTime: s,
          endTime: new Date(new Date(s).getTime() + 30 * 60000).toISOString(),
        }))
      }
    }

    return NextResponse.json({ slots })
  } catch (e) {
    console.error('Error fetching slots:', e)
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 })
  }
}
