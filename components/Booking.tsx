'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Clock, Calendar, CheckCircle } from 'lucide-react'
import { format, addDays, startOfDay, isSameDay, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns'

interface Slot {
  startTime: string
  endTime: string
}

type BookingStep = 'calendar' | 'form' | 'success'

export default function Booking() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [step, setStep] = useState<BookingStep>('calendar')
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', niche: '', followers: '', goal: '' })
  const [error, setError] = useState('')

  const today = startOfDay(new Date())
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startPadding = getDay(monthStart)
  const paddingDays = Array.from({ length: startPadding })

  useEffect(() => {
    if (selectedDate) {
      fetchSlots(selectedDate)
    }
  }, [selectedDate])

  async function fetchSlots(date: Date) {
    setLoadingSlots(true)
    setSlots([])
    setSelectedSlot(null)
    try {
      const startDate = format(date, "yyyy-MM-dd'T'00:00:00")
      const endDate = format(date, "yyyy-MM-dd'T'23:59:59")
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      const res = await fetch(`/api/get-slots?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&timezone=${encodeURIComponent(tz)}`)
      const data = await res.json()
      setSlots(data.slots || [])
    } catch {
      setSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  async function handleBook() {
    if (!selectedSlot || !form.name || !form.email) return
    setSubmitting(true)
    setError('')
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slot: selectedSlot, timezone: tz }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Booking failed')
      setStep('success')
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const isPastDay = (day: Date) => day < today
  const isCurrentMonth = (day: Date) => day.getMonth() === currentMonth.getMonth()

  return (
    <section id="booking" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Free Strategy Call</h2>
          <p className="text-lg text-gray-600">30 minutes. No pitch. Just a clear plan for your funnel.</p>
        </div>

        {step === 'success' ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">You're booked!</h3>
            <p className="text-gray-600 mb-2">
              Your strategy call is confirmed for{' '}
              <strong>{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}</strong> at{' '}
              <strong>{selectedSlot ? format(new Date(selectedSlot.startTime), 'h:mm a') : ''}</strong>.
            </p>
            <p className="text-gray-500 text-sm">Check your email for the calendar invite and call details.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-5">

              {/* Left: Calendar */}
              <div className="md:col-span-3 p-8 border-b md:border-b-0 md:border-r border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setCurrentMonth(m => addMonths(m, -1))}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    disabled={currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="font-semibold text-gray-900">{format(currentMonth, 'MMMM yyyy')}</h3>
                  <button
                    onClick={() => setCurrentMonth(m => addMonths(m, 1))}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {paddingDays.map((_, i) => <div key={`pad-${i}`} />)}
                  {days.map((day, i) => {
                    const past = isPastDay(day)
                    const selected = selectedDate && isSameDay(day, selectedDate)
                    return (
                      <button
                        key={i}
                        disabled={past}
                        onClick={() => { setSelectedDate(day); setStep('calendar') }}
                        className={`
                          aspect-square rounded-full text-sm font-medium transition-colors flex items-center justify-center
                          ${past ? 'text-gray-200 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
                          ${selected ? 'bg-gray-900 text-white hover:bg-gray-800' : 'text-gray-900'}
                        `}
                      >
                        {day.getDate()}
                      </button>
                    )
                  })}
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Clock className="w-4 h-4" />
                      <span>{format(selectedDate, 'MMMM d')} · 30 min</span>
                    </div>
                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : slots.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">No available slots for this day.</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {slots.map((slot, i) => (
                          <button
                            key={i}
                            onClick={() => { setSelectedSlot(slot); setStep('form') }}
                            className={`
                              py-2 px-3 rounded-xl text-sm font-medium border transition-colors
                              ${selectedSlot?.startTime === slot.startTime
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'border-gray-200 text-gray-700 hover:border-gray-400'}
                            `}
                          >
                            {format(new Date(slot.startTime), 'h:mm a')}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right: Form */}
              <div className="md:col-span-2 p-8">
                {step === 'form' && selectedSlot ? (
                  <div>
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{format(new Date(selectedSlot.startTime), 'h:mm a')} · 30 min</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-5">Your details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Full Name *</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email *</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
                          placeholder="you@email.com"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Coaching Niche</label>
                        <input
                          type="text"
                          value={form.niche}
                          onChange={e => setForm(f => ({ ...f, niche: e.target.value }))}
                          className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
                          placeholder="e.g. Fitness, Business, Mindset"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Approx. Followers</label>
                        <select
                          value={form.followers}
                          onChange={e => setForm(f => ({ ...f, followers: e.target.value }))}
                          className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400 bg-white"
                        >
                          <option value="">Select range</option>
                          <option value="10k-25k">10k – 25k</option>
                          <option value="25k-50k">25k – 50k</option>
                          <option value="50k-100k">50k – 100k</option>
                          <option value="100k-200k">100k – 200k</option>
                          <option value="200k+">200k+</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Biggest Goal</label>
                        <textarea
                          value={form.goal}
                          onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
                          className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400 resize-none"
                          placeholder="What do you want to achieve?"
                          rows={2}
                        />
                      </div>
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                      <button
                        onClick={handleBook}
                        disabled={submitting || !form.name || !form.email}
                        className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? 'Booking...' : 'Confirm Booking'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-200 mb-4" />
                    <p className="text-gray-500 text-sm">
                      {selectedDate ? 'Select a time slot to continue' : 'Select a date to see available times'}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  )
}
