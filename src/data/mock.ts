import type { Member, Project, ProgressPost, Task } from '../types'

export const members: Member[] = [
  { id: 'm1', name: 'Ava Chen', role: 'Project Lead', initials: 'AC', color: 'bg-stone-700' },
  { id: 'm2', name: 'Liam Patel', role: 'Developer', initials: 'LP', color: 'bg-amber-700' },
  { id: 'm3', name: 'Maya Rossi', role: 'Designer', initials: 'MR', color: 'bg-teal-700' },
  { id: 'm4', name: 'Noah Kim', role: 'Client', initials: 'NK', color: 'bg-rose-700' },
  { id: 'm5', name: 'Sofia Diaz', role: 'Teacher', initials: 'SD', color: 'bg-indigo-700' },
]

export const projects: Project[] = [
  {
    id: 'apollo',
    title: 'Project Apollo',
    description: 'Building a campus mobile app for event discovery and ticketing.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=60&auto=format&fit=crop',
    lastModified: '2025-10-13T09:30:00Z',
    memberIds: ['m1', 'm2', 'm3', 'm4'],
    recentActivity: [
      'Maya moved "Ticket flow redesign" to Review',
      'Liam commented on "Sprint 6 demo" update',
      'Ava created task "Push notification setup"',
      'Noah approved the Sprint 6 demo delivery',
    ],
  },
  {
    id: 'beacon',
    title: 'Project Beacon',
    description: 'Web platform for the university research lab management system.',
    lastModified: '2025-10-12T14:05:00Z',
    memberIds: ['m1', 'm2', 'm5'],
    recentActivity: [
      'Sofia reviewed the requirements document',
      'Liam closed 3 tasks in Done',
      'Ava posted "Mid-term progress" update',
    ],
  },
  {
    id: 'cedar',
    title: 'Project Cedar',
    description: 'Client website redesign for a local nonprofit organization.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=60&auto=format&fit=crop',
    lastModified: '2025-10-11T17:45:00Z',
    memberIds: ['m3', 'm4', 'm5'],
    recentActivity: [
      'Maya uploaded new homepage mockups',
      'Noah requested changes to the footer',
      'Sofia added 2 new tasks to To do',
    ],
  },
  {
    id: 'dune',
    title: 'Project Dune',
    description: 'IoT sensor dashboard for the environmental science class.',
    lastModified: '2025-10-09T08:15:00Z',
    memberIds: ['m1', 'm2', 'm3'],
    recentActivity: [
      'Liam finished the data pipeline integration',
      'Ava updated the roadmap for Q4',
    ],
  },
]

export const tasks: Task[] = [
  { id: 't1', title: 'Set up CI pipeline', assigneeId: 'm2', priority: 'high', column: 'todo' },
  { id: 't2', title: 'Design onboarding screens', assigneeId: 'm3', priority: 'medium', column: 'todo' },
  { id: 't3', title: 'Push notification setup', assigneeId: 'm2', priority: 'high', column: 'todo' },
  { id: 't4', title: 'Ticket flow implementation', assigneeId: 'm2', priority: 'high', column: 'inprogress' },
  { id: 't5', title: 'Dark mode support', assigneeId: 'm3', priority: 'low', column: 'inprogress' },
  { id: 't6', title: 'Ticket flow redesign', assigneeId: 'm3', priority: 'high', column: 'review' },
  { id: 't7', title: 'Login API integration', assigneeId: 'm1', priority: 'medium', column: 'done' },
  { id: 't8', title: 'Project scaffolding', assigneeId: 'm2', priority: 'medium', column: 'done' },
]

export const progressPosts: ProgressPost[] = [
  {
    id: 'p1',
    title: 'Sprint 6 demo delivered',
    description:
      'We finished the ticket booking flow and demonstrated it to the client. Feedback was positive, with a few UI tweaks requested for the confirmation screen.',
    authorId: 'm1',
    time: 'Oct 12, 2025',
    photos: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=60&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=60&auto=format&fit=crop',
    ],
    comments: [
      { id: 'c1', authorId: 'm4', text: 'Looks great! Looking forward to the final version.', time: '2h ago' },
      { id: 'c2', authorId: 'm2', text: 'I will start on the confirmation screen tweaks tomorrow.', time: '1h ago' },
    ],
  },
  {
    id: 'p2',
    title: 'Design system v2 published',
    description:
      'Updated typography, spacing scale, and component states. All screens now follow the new neutral light theme.',
    authorId: 'm3',
    time: 'Oct 8, 2025',
    photos: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=60&auto=format&fit=crop',
    ],
    comments: [
      { id: 'c3', authorId: 'm1', text: 'Nice work, the new states look much cleaner.', time: '5d ago' },
    ],
  },
]

export function getMember(id?: string): Member {
  return members.find((m) => m.id === id) ?? members[0]
}

export function getProject(id: string | undefined): Project | undefined {
  return projects.find((p) => p.id === id)
}
