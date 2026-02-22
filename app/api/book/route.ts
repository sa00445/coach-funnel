import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, niche, followers, goal, slot, timezone } = body

  const token = process.env.GHL_API_TOKEN
  const locationId = process.env.GHL_LOCATION_ID
  const calendarId = process.env.GHL_CALENDAR_ID

  if (!token || !locationId || !calendarId) {
    return NextResponse.json({ error: 'Missing server config' }, { status: 500 })
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
  }

  try {
    // Step 1: Create or update contact
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || ''

    const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        locationId,
        tags: ['funnel-lead', 'discovery-call'],
        customField: {
          coaching_niche: niche,
          follower_count: followers,
          biggest_goal: goal,
        },
        source: 'Landing Page',
      }),
    })

    const contactData = await contactRes.json()
    const contactId = contactData?.contact?.id

    if (!contactId) {
      console.error('Contact creation failed:', contactData)
      return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
    }

    // Step 2: Book the appointment
    const appointmentRes = await fetch('https://services.leadconnectorhq.com/calendars/events/appointments', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        calendarId,
        locationId,
        contactId,
        startTime: slot.startTime,
        endTime: slot.endTime,
        title: `Discovery Call - ${name}`,
        appointmentStatus: 'confirmed',
        timezone: timezone || 'UTC',
        selectedTimezone: timezone || 'UTC',
      }),
    })

    const appointmentData = await appointmentRes.json()

    if (!appointmentRes.ok) {
      console.error('Appointment creation failed:', appointmentData)
      return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 })
    }

    return NextResponse.json({ success: true, appointment: appointmentData })
  } catch (e) {
    console.error('Booking error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
