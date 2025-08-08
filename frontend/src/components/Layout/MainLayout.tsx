'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-content1">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background/50 backdrop-blur-sm">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}