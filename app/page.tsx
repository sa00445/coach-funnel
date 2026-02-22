'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import Process from '@/components/Process'
import Booking from '@/components/Booking'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Process />
      <Booking />
      <FAQ />
      <Footer />
    </main>
  )
}
