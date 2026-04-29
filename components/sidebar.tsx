'use client'

import { LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface SidebarProps {
  isOpen: boolean
  currentView: string
  onViewChange: (view: string) => void
}

const NAV_ITEMS = [
  { id: 'kanban', label: 'Kanban Board', icon: '📋' },
  { id: 'focus', label: 'Focus Mode', icon: '⏱️' },
  { id: 'timeline', label: 'Timeline', icon: '📅' },
  { id: 'calendar', label: 'Calendar', icon: '🗓️' },
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'team', label: 'Team', icon: '👥' },
]

export default function Sidebar({ isOpen, currentView, onViewChange }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: isOpen ? 0 : -280 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen overflow-y-auto hidden md:flex flex-col"
    >
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">FF</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">FocusFlow</h1>
            <p className="text-xs text-sidebar-foreground/60">Task Manager</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as any)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent/10"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </motion.aside>
  )
}
