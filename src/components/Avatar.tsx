import type { Member } from '../types'

export function Avatar({ member, size = 'md' }: { member: Member; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-6 w-6 text-[10px]',
    md: 'h-8 w-8 text-xs',
    lg: 'h-12 w-12 text-sm',
  }
  return (
    <span
      className={`${sizes[size]} ${member.color} inline-flex shrink-0 items-center justify-center rounded-full font-medium text-white`}
      title={member.name}
    >
      {member.initials}
    </span>
  )
}
