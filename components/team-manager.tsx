'use client'

import { motion } from 'framer-motion'
import { useAppContext } from '@/lib/app-context'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, MoreVertical } from 'lucide-react'

export default function TeamManager() {
  const { users, tasks } = useAppContext()

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'manager':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getUserTaskCount = (userName: string) => {
    return tasks.filter(t => t.assignee === userName).length
  }

  const getUserCompletedCount = (userName: string) => {
    return tasks.filter(t => t.assignee === userName && t.status === 'done').length
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team Management</h1>
          <p className="text-muted-foreground">Manage team members and their roles</p>
        </div>
        <Button>
          Add Member
        </Button>
      </div>

      {/* Team Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Total Members</h3>
          <p className="text-3xl font-bold">{users.length}</p>
          <p className="text-xs text-muted-foreground mt-2">Active team size</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Tasks Assigned</h3>
          <p className="text-3xl font-bold">{tasks.length}</p>
          <p className="text-xs text-muted-foreground mt-2">Total in progress</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Completed</h3>
          <p className="text-3xl font-bold">{tasks.filter(t => t.status === 'done').length}</p>
          <p className="text-xs text-muted-foreground mt-2">Tasks finished</p>
        </Card>
      </div>

      {/* Team Members */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Team Members</h2>
        </div>
        <div className="divide-y divide-border">
          {users.map((user, i) => {
            const taskCount = getUserTaskCount(user.name)
            const completedCount = getUserCompletedCount(user.name)
            const completionRate = taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0
            
            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                    <AvatarFallback>{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Mail size={14} />
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-semibold">{taskCount} tasks</div>
                    {taskCount > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {completedCount} completed ({completionRate}%)
                      </div>
                    )}
                  </div>
                  <Badge className={`text-xs capitalize ${getRoleColor(user.role)} whitespace-nowrap`}>
                    {user.role}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical size={18} />
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Member Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user, i) => {
          const taskCount = getUserTaskCount(user.name)
          const completedCount = getUserCompletedCount(user.name)
          const inProgressCount = tasks.filter(t => t.assignee === user.name && t.status === 'in-progress').length
          
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow h-full">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="h-10 w-10 bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    <AvatarFallback>{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{user.name}</h3>
                    <Badge className={`text-xs capitalize mt-1 ${getRoleColor(user.role)}`}>
                      {user.role}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold">{taskCount}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">In Progress</p>
                      <p className="text-lg font-semibold text-blue-600">{inProgressCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Completed</p>
                      <p className="text-lg font-semibold text-green-600">{completedCount}</p>
                    </div>
                  </div>
                  {taskCount > 0 && (
                    <div className="pt-2 border-t border-border">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Completion Rate</span>
                        <span className="text-xs font-semibold">{Math.round((completedCount / taskCount) * 100)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-green-500 h-full transition-all duration-500"
                          style={{ width: `${(completedCount / taskCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
