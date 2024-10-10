import StreamVideoProvider from '@/Provider/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "ViColab",
  description: "Collab App",
  icons:{
    icon:'/icons/LOGO.jpg'
  }
};

//we wrape all the folder of the root inside the StreamVideoProvider so that they can use the functionalites of
// the video audio calling
function RootLayout({children}:{children:ReactNode}) {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout