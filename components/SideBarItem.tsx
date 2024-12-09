import cn from '@/utils/cn'
import { ReactNode } from 'react'

export type SideBarItemProps = {
  label: string
  icon: ReactNode
  badge?: ReactNode
  active?: boolean
}

export default function SideBarItem({
  label,
  icon,
  badge,
  active = false,
}: SideBarItemProps) {
  return (
    <div
      className={cn(
        'px-5 py-4 flex items-center gap-4 font-semibold rounded-xl bg-transparent hover:bg-violet-200/50 active:scale-95 will-change-transform transition select-none',
        active && '!bg-violet-500 !text-white',
      )}
    >
      {icon}
      {label}
      {badge}
    </div>
  )
}
