import React, { useEffect, useState } from 'react'
import Drawer from '@/components/Drawer'
import HeroSection from '@/components/HeroSection'
import chatHelper from '@/server/chatHelper';

function Landing() {
  
  return (
    <>
      <Drawer />
      <HeroSection />
    </>
  )
}

export default Landing