import { useParams } from 'react-router-dom'
import { getProject, members } from '../../data/mock'
import { Avatar } from '../../components/Avatar'

export default function ProjectHome() {
  const { projectId } = useParams()
  const project = getProject(projectId)!
  const projectMembers = project.memberIds.map((id) => members.find((m) => m.id === id)!)

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-stone-900">{project.title}</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-stone-200 bg-white p-5">
            <h2 className="text-sm font-medium text-stone-900">About this project</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{project.description}</p>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-5">
            <h2 className="text-sm font-medium text-stone-900">Recent activity</h2>
            <ul className="mt-3 space-y-3">
              {project.recentActivity.map((a, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-300" />
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="rounded-xl border border-stone-200 bg-white p-5">
          <h2 className="text-sm font-medium text-stone-900">Members</h2>
          <ul className="mt-3 space-y-3">
            {projectMembers.map((m) => (
              <li key={m.id} className="flex items-center gap-3">
                <Avatar member={m} />
                <div>
                  <div className="text-sm text-stone-800">{m.name}</div>
                  <div className="text-xs text-stone-400">{m.role}</div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-stone-400">See the Members page for details and options.</p>
        </aside>
      </div>
    </div>
  )
}
