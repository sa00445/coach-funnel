'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Clock, Calendar, CheckCircle } from 'lucide-react'
import { format, addMonths, startOfDay, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns'

interface Slot {
  startTime: string
  endTime: string
}

type BookingStep = 'calendar' | 'form' | 'success'

const inputStyle = {
  backgroundColor: '#0a0a0a',
  border: '1px solid #2a2a2a',
  color: '#F5F0E8',
  borderRadius: '12px',
  padding: '12px 16px',
  width: '100%',
  fontSize: '14px',
  outline: 'none',
}

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

  const isPrevMonthDisabled = currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()

  useEffect(() => {
    if (selectedDate) fetchSlots(selectedDate)
  }, [selectedDate])

  async function fetchSlots(date: Date) {
    setLoadingSlots(true)
    setSlots([])
    setSelectedSlot(null)
    try {
      const startMs = new Date(date).setHours(0, 0, 0, 0)
      const endMs = new Date(date).setHours(23, 59, 59, 999)
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      const res = await fetch(`/api/get-slots?startDate=${startMs}&endDate=${endMs}&timezone=${encodeURIComponent(tz)}`)
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

  return (
    <section id="booking" className="py-20 px-6" style={{backgroundColor: '#0a0a0a'}}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{color: '#F5F0E8'}}>Book Your Free Strategy Call</h2>
          <p className="text-lg" style={{color: '#9A8A6A'}}>30 minutes. No pitch. Just a clear plan for your funnel.</p>
        </div>

        {step === 'success' ? (
          <div className="rounded-3xl p-12 text-center border" style={{backgroundColor: '#1a1a1a', borderColor: '#3a3020'}}>
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-16 h-16" style={{color: '#C9A84C'}} />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{color: '#F5F0E8'}}>You're booked!</h3>
            <p className="mb-2" style={{color: '#9A8A6A'}}>
              Your strategy call is confirmed for{' '}
              <strong style={{color: '#C9A84C'}}>{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}</strong> at{' '}
              <strong style={{color: '#C9A84C'}}>{selectedSlot ? format(new Date(selectedSlot.startTime), 'h:mm a') : ''}</strong>.
            </p>
            <p className="text-sm" style={{color: '#9A8A6A'}}>Check your email for the calendar invite and call details.</p>
          </div>
        ) : (
          <div className="rounded-3xl border overflow-hidden" style={{backgroundColor: '#1a1a1a', borderColor: '#2a2a2a'}}>
            <div className="grid md:grid-cols-5">

              {/* Left: Calendar */}
              <div className="md:col-span-3 p-8 border-b md:border-b-0 md:border-r" style={{borderColor: '#2a2a2a'}}>
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setCurrentMonth(m => addMonths(m, -1))}
                    disabled={isPrevMonthDisabled}
                    className="p-2 rounded-full transition-colors disabled:opacity-30"
                    style={{color: '#C9A84C'}}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="font-semibold" style={{color: '#F5F0E8'}}>{format(currentMonth, 'MMMM yyyy')}</h3>
                  <button
                    onClick={() => setCurrentMonth(m => addMonths(m, 1))}
                    className="p-2 rounded-full transition-colors"
                    style={{color: '#C9A84C'}}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <div key={d} className="text-center text-xs font-medium py-1" style={{color: '#9A8A6A'}}>{d}</div>
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
                        className="aspect-square rounded-full text-sm font-medium transition-all flex items-center justify-center"
                        style={{
                          color: past ? '#2a2a2a' : selected ? '#0a0a0a' : '#F5F0E8',
                          background: selected ? 'linear-gradient(135deg, #C9A84C, #A07830)' : 'transparent',
                          cursor: past ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {day.getDate()}
                      </button>
                    )
                  })}
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-sm mb-3" style={{color: '#9A8A6A'}}>
                      <Clock className="w-4 h-4" />
                      <span>{format(selectedDate, 'MMMM d')} · 30 min</span>
                    </div>
                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{borderColor: '#C9A84C', borderTopColor: 'transparent'}} />
                      </div>
                    ) : slots.length === 0 ? (
                      <p className="text-sm text-center py-4" style={{color: '#9A8A6A'}}>No available slots for this day. Try another date.</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {slots.map((slot, i) => {
                          const isSelected = selectedSlot?.startTime === slot.startTime
                          return (
                            <button
                              key={i}
                              onClick={() => { setSelectedSlot(slot); setStep('form') }}
                              className="py-2 px-3 rounded-xl text-sm font-medium border transition-all"
                              style={{
                                background: isSelected ? 'linear-gradient(135deg, #C9A84C, #A07830)' : 'transparent',
                                borderColor: isSelected ? '#C9A84C' : '#2a2a2a',
                                color: isSelected ? '#0a0a0a' : '#F5F0E8',
                              }}
                            >
                              {format(new Date(slot.startTime), 'h:mm a')}
                            </button>
                          )
                        })}
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
                      <div className="flex items-center gap-2 text-sm mb-1" style={{color: '#9A8A6A'}}>
                        <Calendar className="w-4 h-4" style={{color: '#C9A84C'}} />
                        <span>{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm" style={{color: '#9A8A6A'}}>
                        <Clock className="w-4 h-4" style={{color: '#C9A84C'}} />
                        <span>{format(new Date(selectedSlot.startTime), 'h:mm a')} · 30 min</span>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-5" style={{color: '#F5F0E8'}}>Your details</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'Your name' },
                        { label: 'Email *', key: 'email', type: 'email', placeholder: 'you@email.com' },
                        { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+1 (555) 000-0000' },
                        { label: 'Coaching Niche', key: 'niche', type: 'text', placeholder: 'e.g. Fitness, Business, Mindset' },
                      ].map(({ label, key, type, placeholder }) => (
                        <div key={key}>
                          <label className="text-xs font-medium uppercase tracking-wide block mb-1" style={{color: '#9A8A6A'}}>{label}</label>
                          <input
                            type={type}
                            value={form[key as keyof typeof form]}
                            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                            placeholder={placeholder}
                            style={inputStyle}
                          />
                        </div>
                      ))}
                      <div>
                        <label className="text-xs font-medium uppercase tracking-wide block mb-1" style={{color: '#9A8A6A'}}>Approx. Followers</label>
                        <select
                          value={form.followers}
                          onChange={e => setForm(f => ({ ...f, followers: e.target.value }))}
                          style={{...inputStyle, backgroundColor: '#0a0a0a'}}
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
                        <label className="text-xs font-medium uppercase tracking-wide block mb-1" style={{color: '#9A8A6A'}}>Biggest Goal</label>
                        <textarea
                          value={form.goal}
                          onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
                          placeholder="What do you want to achieve?"
                          rows={2}
                          style={{...inputStyle, resize: 'none'}}
                        />
                      </div>
                      {error && <p className="text-red-400 text-sm">{error}</p>}
                      <button
                        onClick={handleBook}
                        disabled={submitting || !form.name || !form.email}
                        className="w-full py-4 rounded-xl font-semibold transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{background: 'linear-gradient(135deg, #C9A84C, #A07830)', color: '#0a0a0a'}}
                      >
                        {submitting ? 'Booking...' : 'Confirm Booking'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-8">
                    <Calendar className="w-12 h-12 mb-4" style={{color: '#2a2a2a'}} />
                    <p className="text-sm" style={{color: '#9A8A6A'}}>
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
