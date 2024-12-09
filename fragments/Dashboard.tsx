import DashboardItem from "@/components/DashboardItem"
import Icon from "@/components/Icon"

export default function Dashboard() {
  return (
    <div className="">
      <h2 className="text-slate-900 text-4xl leading-normal font-semibold">Hello Admin,</h2>
      <p className="mb-8 text-slate-400 text-lg">This is what we got you for today.</p>
      
      <div className="mb-10 flex flex-wrap gap-3 sm:gap-8">
        <div className="grow basis-0 flex flex-wrap gap-3 sm:gap-8">
          <DashboardItem
            icon={<Icon icon="dashboard_articles" className="w-16 h-14 sm:w-[78px] sm:h-[78px]"/>}
            title="Articles"
            summary="4,950 New Updates"
          />
          <DashboardItem
            icon={<Icon icon="dashboard_categories" className="w-16 h-14 sm:w-[78px] sm:h-[78px]"/>}
            title="Categories"
            summary="10,275 New Updates"
          />
        </div>
        <div className="grow basis-0 flex flex-wrap gap-3 sm:gap-8">
          <DashboardItem
            icon={<Icon icon="dashboard_stories" className="w-16 h-14 sm:w-[78px] sm:h-[78px]"/>}
            title="Stories"
            summary="4,193 New Updates"
          />
          <DashboardItem
            icon={<Icon icon="dashboard_advetisements" className="w-16 h-14 sm:w-[78px] sm:h-[78px]"/>}
            title="Advertisements"
            summary="928 New Updates"
          />
        </div>
      </div>
    </div>
  )
}
