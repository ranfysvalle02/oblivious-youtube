import stories from '@/app/data/stories'
import cn from '@/utils/cn'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  id: string
}

export default function StoryViewer({ id }: Props) {
  const story = stories.find((story) => story.id === id)

  if (!story) {
    return notFound()
  }

  return (
    <div className="p-2 bg-zinc-500 rounded-[28px]">
      <div className="mx-auto max-w-[561px]">
        <div className="relative w-full h-full rounded-[20px]">
          <Image
            className="w-full h-full aspect-[561/812] object-cover rounded-[inherit]"
            src={story.imageSrc}
            alt={story.title}
            width={4 * 561}
            height={4 * 812}
            priority={true}
          />

          <div className="p-4 absolute w-full h-full flex flex-col justify-between inset-0 bg-gradient-to-t from-black/70 from-30% to-black/0 rounded-[inherit]">
            <svg
              className="mx-auto"
              width="200"
              height="5"
              viewBox="0 0 200 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="60" height="5" rx="2.5" fill="white" />
              <rect
                opacity="0.5"
                x="70"
                width="60"
                height="5"
                rx="2.5"
                fill="white"
              />
              <rect
                opacity="0.5"
                x="140"
                width="60"
                height="5"
                rx="2.5"
                fill="white"
              />
            </svg>

            <div className="">
              <h4 className="mb-4 text-white text-[40px] leading-normal font-bold">
                {story.title}
              </h4>

              <div className="flex items-center">
                <div className="px-[20px] py-[15px] min-w-[170px] text-center text-xl font-semibold bg-violet-100 text-violet-500 rounded-[5px]">
                  {story.field}
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 bottom-0 -left-24 m-auto w-[60px] h-[60px] p-[14px] rounded-[10px] bg-zinc-900">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M21.4141 3.2721C21.789 3.64715 21.9997 4.15577 21.9997 4.6861C21.9997 5.21642 21.789 5.72504 21.4141 6.1001L11.5141 16.0001L21.4141 25.9001C21.7784 26.2773 21.98 26.7825 21.9754 27.3069C21.9709 27.8313 21.7605 28.3329 21.3897 28.7037C21.0189 29.0746 20.5173 29.2849 19.9929 29.2894C19.4685 29.294 18.9633 29.0924 18.5861 28.7281L7.2721 17.4141C6.89715 17.039 6.68652 16.5304 6.68652 16.0001C6.68652 15.4698 6.89715 14.9612 7.2721 14.5861L18.5861 3.2721C18.9612 2.89715 19.4698 2.68652 20.0001 2.68652C20.5304 2.68652 21.039 2.89715 21.4141 3.2721Z" fill="white"/>
                </g>
              </svg>
            </div>
            <div className="absolute top-0 bottom-0 -right-24 m-auto w-[60px] h-[60px] p-[14px] rounded-[10px] bg-zinc-900">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5859 28.7279C10.211 28.3528 10.0003 27.8442 10.0003 27.3139C10.0003 26.7836 10.211 26.275 10.5859 25.8999L20.4859 15.9999L10.5859 6.0999C10.2216 5.7227 10.02 5.21749 10.0246 4.6931C10.0291 4.16871 10.2395 3.66708 10.6103 3.29626C10.9811 2.92545 11.4827 2.71511 12.0071 2.71055C12.5315 2.706 13.0367 2.90759 13.4139 3.2719L24.7279 14.5859C25.1028 14.961 25.3135 15.4696 25.3135 15.9999C25.3135 16.5302 25.1028 17.0388 24.7279 17.4139L13.4139 28.7279C13.0388 29.1028 12.5302 29.3135 11.9999 29.3135C11.4696 29.3135 10.961 29.1028 10.5859 28.7279Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
