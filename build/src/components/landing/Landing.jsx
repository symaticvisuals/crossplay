import React from 'react'
import Footer from './Footer'
import Hero from './Hero'
import Info from './Info'
import Partners from './Partners'
import Why from './Why'
import Works from './Works'

function Landing() {
  return (
    <div style={{
      backgroundColor: '#000',
      color:"white"
    }}>
    <Hero />
    <Info />
    <Works />
    {/* <Why /> */}
    {/* <Partners /> */}
    <Footer />
    </div>
  )
}

export default Landing