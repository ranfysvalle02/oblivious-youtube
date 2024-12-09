import DashboardItem from "@/components/DashboardItem"
import Icon from "@/components/Icon"

export default function Dashboard() {
  return (
    <div className="">
      <h2 className="text-slate-900 text-4xl leading-normal font-semibold">Hello <span className="text-violet-500">anonymous</span>,</h2>
      <p className="mb-8 text-slate-400 text-lg">This is what we got you for today.</p>
      
      <div className="mb-10 flex flex-wrap gap-3 sm:gap-8">
        <div className="grow basis-0 flex flex-wrap gap-3 sm:gap-8">
          <DashboardItem
            icon={<Icon icon="dashboard_articles" className="w-16 h-14 sm:w-[78px] sm:h-[78px]"/>}
            title="videos"
            summary="4,950 Channels, 2,303 Playlists, 3,000 Searches"
          />
          <DashboardItem
            icon={<Icon icon="dashboard_categories" className="w-16 h-14 sm:w-[78px] sm:h-[78px]"/>}
            title="Categories"
            summary="10,275 Categories"
          />
        </div>
        <div className="grow basis-0 flex flex-wrap gap-3 sm:gap-8">
          <DashboardItem
            icon={<Icon icon="dashboard_stories" className="w-16 h-14 sm:w-[78px] sm:h-[78px]"/>}
            title="Summaries"
            summary="4,193 Summaries"
          />
          <DashboardItem
            icon={<Icon icon="dashboard_advetisements" className="w-16 h-14 sm:w-[78px] sm:h-[78px]"/>}
            title="Advertisements"
            summary="will never interfere with the UX"
          />
        </div>
      </div>
    </div>
  )
}
