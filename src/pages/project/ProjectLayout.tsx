import { NavLink, Outlet, useParams } from 'react-router-dom'
import { getProject } from '../../data/mock'
import { LayoutDashboard, SquareKanban, Map, Settings, Users } from 'lucide-react'

const links = [
  { to: '', label: 'Progress updates', icon: LayoutDashboard },
  { to: 'board', label: 'Board', icon: SquareKanban },
  { to: 'roadmap', label: 'Roadmap', icon: Map },
  { to: 'settings', label: 'Project Settings', icon: Settings },
  { to: 'members', label: 'Members', icon: Users },
]

export default function ProjectLayout() {
  const { projectId } = useParams()
  const project = getProject(projectId)

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 text-sm text-stone-500">
        Project not found.
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-stone-50">
      <aside className="flex w-60 shrink-0 flex-col border-r border-stone-200 bg-white">
        <NavLink to="/home" className="flex items-center gap-3 border-b border-stone-200 px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 text-xs font-semibold text-white">
            {project.title.split(' ').map((w: string) => w[0]).slice(0, 2).join('')}
          </span>
          <div>
            <div className="text-sm font-medium text-stone-900">{project.title}</div>
            <div className="text-[11px] text-stone-400">Team workspace</div>
          </div>
        </NavLink>
        <nav className="flex-1 space-y-1 p-3">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={label}
              to={to ? `/project/${project.id}/${to}` : `/project/${project.id}`}
              end={!to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-stone-100 font-medium text-stone-900'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-stone-200 p-4 text-xs text-stone-400">Prototype UI</div>
      </aside>
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  )
}
