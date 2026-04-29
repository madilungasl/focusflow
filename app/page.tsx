'use client'

import { useState } from 'react'
import { AppProvider } from '@/lib/app-context'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'
import KanbanBoard from '@/components/kanban-board'
import FocusMode from '@/components/focus-mode'
import TimelineView from '@/components/timeline-view'
import CalendarView from '@/components/calendar-view'
import Analytics from '@/components/analytics'
import TeamManager from '@/components/team-manager'

type ViewType = 'kanban' | 'focus' | 'timeline' | 'calendar' | 'analytics' | 'team'

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<ViewType>('kanban')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderView = () => {
    switch (currentView) {
      case 'focus':
        return <FocusMode />
      case 'timeline':
        return <TimelineView />
      case 'calendar':
        return <CalendarView />
      case 'analytics':
        return <Analytics />
      case 'team':
        return <TeamManager />
      case 'kanban':
      default:
        return <KanbanBoard />
    }
  }

  return (
    <AppProvider>
      <div className="flex h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} currentView={currentView} onViewChange={setCurrentView} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-auto p-6">
            {renderView()}
          </main>
        </div>
      </div>
    </AppProvider>
  )
}
