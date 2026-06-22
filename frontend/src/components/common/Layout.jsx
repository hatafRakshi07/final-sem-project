import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Chatbot from './Chatbot'
import BottomNav from './BottomNav'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 pb-20 sm:pb-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <BottomNav />
      <Chatbot />
    </div>
  )
}
