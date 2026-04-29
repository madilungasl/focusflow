'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import type { Task, User, FocusSession, TeamAnalytics } from './types'

interface AppContextType {
  tasks: Task[]
  users: User[]
  focusSessions: FocusSession[]
  currentUser: User
  analytics: TeamAnalytics
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  deleteTask: (taskId: string) => void
  startFocusSession: (taskId: string) => void
  endFocusSession: (sessionId: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const MOCK_USERS: User[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', avatar: 'AJ', role: 'owner' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', avatar: 'SC', role: 'manager' },
  { id: '3', name: 'Mike Davis', email: 'mike@example.com', avatar: 'MD', role: 'member' },
  { id: '4', name: 'Emma Wilson', email: 'emma@example.com', avatar: 'EW', role: 'member' },
]

const MOCK_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Design new dashboard layout',
    description: 'Create mockups and wireframes for the updated dashboard UI',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Sarah Chen',
    dueDate: '2026-05-05',
    estimatedHours: 8,
    tags: ['design', 'ui'],
  },
  {
    id: 'task-2',
    title: 'Implement authentication system',
    description: 'Set up JWT authentication with refresh tokens',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Mike Davis',
    dueDate: '2026-05-02',
    estimatedHours: 12,
    tags: ['backend', 'security'],
  },
  {
    id: 'task-3',
    title: 'Write API documentation',
    description: 'Document all REST endpoints with examples',
    status: 'todo',
    priority: 'medium',
    assignee: 'Alex Johnson',
    dueDate: '2026-05-08',
    estimatedHours: 6,
    tags: ['documentation', 'api'],
  },
  {
    id: 'task-4',
    title: 'Fix responsive issues on mobile',
    description: 'Ensure all pages work correctly on mobile devices',
    status: 'in-review',
    priority: 'medium',
    assignee: 'Emma Wilson',
    dueDate: '2026-04-30',
    estimatedHours: 4,
    tags: ['bug', 'mobile'],
  },
  {
    id: 'task-5',
    title: 'Set up database migrations',
    description: 'Create migration scripts for schema updates',
    status: 'done',
    priority: 'high',
    assignee: 'Mike Davis',
    dueDate: '2026-04-25',
    estimatedHours: 5,
    completedAt: '2026-04-25',
    tags: ['database', 'devops'],
  },
  {
    id: 'task-6',
    title: 'Optimize image loading',
    description: 'Implement lazy loading and image optimization',
    status: 'todo',
    priority: 'low',
    assignee: 'Alex Johnson',
    dueDate: '2026-05-15',
    estimatedHours: 3,
    tags: ['performance'],
  },
  {
    id: 'task-7',
    title: 'Create user onboarding flow',
    description: 'Design and implement guided setup wizard',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Sarah Chen',
    dueDate: '2026-05-10',
    estimatedHours: 10,
    tags: ['ux', 'frontend'],
  },
  {
    id: 'task-8',
    title: 'Set up monitoring and alerts',
    description: 'Configure error tracking and performance monitoring',
    status: 'todo',
    priority: 'high',
    assignee: 'Emma Wilson',
    dueDate: '2026-05-03',
    estimatedHours: 7,
    tags: ['devops', 'monitoring'],
  },
]

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>([])
  const currentUser = MOCK_USERS[0]

  const analytics: TeamAnalytics = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'done').length,
    inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
    totalFocusTime: focusSessions.reduce((sum, s) => sum + s.duration, 0),
    averageTaskDuration: 6,
    tasksCompletedToday: 2,
    streak: 5,
  }

  const addTask = useCallback((task: Task) => {
    setTasks(prev => [...prev, task])
  }, [])

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)))
  }, [])

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId))
  }, [])

  const startFocusSession = useCallback((taskId: string) => {
    const newSession: FocusSession = {
      id: `session-${Date.now()}`,
      taskId,
      startTime: new Date().toISOString(),
      duration: 0,
      completed: false,
    }
    setFocusSessions(prev => [...prev, newSession])
  }, [])

  const endFocusSession = useCallback((sessionId: string) => {
    setFocusSessions(prev =>
      prev.map(s => {
        if (s.id === sessionId) {
          const endTime = new Date().toISOString()
          const duration = Math.round(
            (new Date(endTime).getTime() - new Date(s.startTime).getTime()) / (1000 * 60)
          )
          return { ...s, endTime, duration, completed: true }
        }
        return s
      })
    )
  }, [])

  const value: AppContextType = {
    tasks,
    users: MOCK_USERS,
    focusSessions,
    currentUser,
    analytics,
    addTask,
    updateTask,
    deleteTask,
    startFocusSession,
    endFocusSession,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
