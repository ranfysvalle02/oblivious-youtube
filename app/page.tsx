import DatePicker from '@/components/DatePicker'
import ProfilePopover from '@/components/ProfilePopover'
import TopBar from '@/components/TopBar'
import Advertisements from '@/fragments/Advertisements'
import Articles from '@/fragments/Articles'
import Dashboard from '@/fragments/Dashboard'
import Stories from '@/fragments/Stories'

export default function Content() {
  return (
    <TopBar
      start={
        <>
          <TopBar.Search />
        </>
      }
      end={
        <>
          <DatePicker />
          <ProfilePopover />
        </>
      }
    >
      <Dashboard />
      <Articles />
      <Stories />
    </TopBar>
  )
}
