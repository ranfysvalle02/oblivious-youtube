import stories from '@/app/data/stories'
import ProfilePopover from '@/components/ProfilePopover'
import TopBar from '@/components/TopBar'
import StoryHeader from '@/fragments/StoryHeader'
import StoryViewer from '@/fragments/StoryViewer'

type Props = {
  params: { storyId: string }
}

export default function Story({ params }: Props) {
  return (
    <TopBar
      start={
        <>
          <TopBar.Back />
          <TopBar.Title title="Stories" />
        </>
      }
      end={
        <>
          <ProfilePopover />
        </>
      }
    >
      <StoryHeader />
      <StoryViewer id={params.storyId} />
    </TopBar>
  )
}

export async function generateStaticParams() {
  return stories.map(({ id }) => ({
    storyId: id,
  }))
}
