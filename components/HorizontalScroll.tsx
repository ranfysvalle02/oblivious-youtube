import cn from '@/utils/cn'
import { ReactNode } from 'react'

export type HorizontalScrollProps = {
  children: ReactNode
  className?: string
}

export default function HorizontalScroll({
  children,
  className,
}: HorizontalScrollProps) {
  return (
    // This trick is my discovery ;-)
    <div className={cn('HorizontalScroll grid', className)}>
      <div className="overflow-x-auto pb-2 -mx-4 -mr-2 sm:-mx-14 px-4 pr-2 sm:px-14">{children}</div>
    </div>
  )
}
