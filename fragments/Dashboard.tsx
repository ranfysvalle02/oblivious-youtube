import DashboardItem from "@/components/DashboardItem"
import Icon from "@/components/Icon"

export default function Dashboard() {
  return (
    <div className="">
      <h2 className="text-slate-900 text-4xl leading-normal font-semibold">Hello <span className="text-violet-500">anonymous</span>,</h2>
      <p className="mb-8 text-slate-400 text-lg">This is what we got you for today.</p>
    </div>
  )
}
