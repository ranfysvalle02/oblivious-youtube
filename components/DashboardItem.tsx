import { ReactNode } from "react"

export type DashboardItemProps = {
  icon: ReactNode
  title: string
  summary: string
}

export default function DashboardItem({ icon, title, summary }: DashboardItemProps) {
  return (
    <div className="px-6 sm:px-6 py-5 sm:py-6 gap-3 grow basis-0 flex flex-wrap content-center items-center bg-white hover:bg-slate-500/10 active:scale-95 will-change-transform transition rounded-3xl select-none">
      {icon}
      <div className="">
        <div className="mb-1 text-slate-900 text-2xl font-semibold">{title}</div>
        <div className="mb-1 text-slate-900 text-nowrap">{summary}</div>
      </div>
    </div>
  )
}
