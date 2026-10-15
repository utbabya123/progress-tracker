export type Priority = 'low' | 'medium' | 'high'

export interface Member {
  id: string
  name: string
  role: string
  initials: string
  color: string
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  lastModified: string // ISO date
  memberIds: string[]
  recentActivity: string[]
}

export interface Task {
  id: string
  title: string
  assigneeId?: string
  priority: Priority
  column: 'todo' | 'inprogress' | 'review' | 'done'
}

export interface Comment {
  id: string
  authorId: string
  text: string
  time: string
}

export interface ProgressPost {
  id: string
  title: string
  description: string
  authorId: string
  time: string
  photos: string[]
  comments: Comment[]
}
