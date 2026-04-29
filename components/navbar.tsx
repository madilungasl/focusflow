'use client'

import { Menu, Bell, Search, Settings, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useAppContext } from '@/lib/app-context'
import { useState, useEffect } from 'react'

interface NavbarProps {
  onSidebarToggle: () => void
}

export default function Navbar({ onSidebarToggle }: NavbarProps) {
  const { currentUser } = useAppContext()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }

  return (
    <nav className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          className="md:hidden"
        >
          <Menu size={20} />
        </Button>
        <div className="hidden sm:flex items-center bg-input rounded-lg px-3 py-2 w-64">
          <Search size={18} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="ml-2 bg-transparent outline-none flex-1 text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
        >
          <Settings size={20} />
        </Button>

        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground">{currentUser.role}</p>
          </div>
          <Avatar className="h-9 w-9 bg-primary text-primary-foreground flex items-center justify-center">
            <AvatarFallback>{currentUser.avatar}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  )
}
