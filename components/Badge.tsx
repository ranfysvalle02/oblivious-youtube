import cn from '@/utils/cn'

export type BadgeProps = {
  label: string
  className?: string
}

export default function Badge({ label, className }: BadgeProps) {
  return (
    <div
      className={cn(
        'px-1 py-1 min-w-6 text-xs font-medium text-center rounded-full bg-violet-400/20 text-violet-800',
        className,
      )}
    >
      {label}
    </div>
  )
}
