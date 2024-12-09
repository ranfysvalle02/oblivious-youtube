import cn from '@/utils/cn'
import Image from 'next/image'
import Link from 'next/link'

export type ArticleItemProps = {
  id: string
  imageSrc: string
  title: string
  summary: string
  field: string
  date: string
  writer: string
  status: 'Created' | 'Published' | 'Draft'
  tags: string[]
}

export default function ArticleItem({
  id,
  imageSrc,
  title,
  summary,
  field,
  date,
  writer,
  status,
  tags,
}: ArticleItemProps) {
  return (
    <div className="p-4 sm:p-6 min-w-[300px] sm:min-w-[472px] bg-white rounded-3xl">
      <Image
        className="mb-5 block object-cover aspect-[435/228] rounded-xl"
        src={imageSrc}
        alt={title}
        width={2 * 435}
        height={2 * 228}
        priority={true}
      />

      <div className="mb-2 flex flex-wrap items-center">
        <div className="py-2 text-violet-500 font-extrabold uppercase">{field}</div>
        <svg
          className="mx-2"
          width="5"
          height="5"
          viewBox="0 0 5 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="2.5" cy="2.5" r="2.5" fill="#D9D9D9" />
        </svg>
        <div className="mr-auto text-slate-400 font-semibold">{date}</div>
        <div className="flex items-center gap-2">
          <Image
            className="w-[30px] h-[30px] rounded-full"
            src="/images/avatars/ben-den-engelsen-ZEjjjYnMYbo-unsplash.jpg"
            alt={title}
            width={30}
            height={30}
          />
          <div className="font-semibold text-black">{writer}</div>
        </div>
      </div>

      <div className="flex items-center">
        <h4 className="mb-2 grow text-slate-900 text-2xl leading-normal font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
          {title}
        </h4>
        <div className={cn('px-[20px] py-[10px] hidden sm:block font-semibold text-center text-nowrap leading-tight rounded-[5px]', status === 'Created' && 'bg-violet-100 text-violet-500', status === 'Published' && 'bg-teal-100/75 text-teal-600')}>
          {status}
        </div>
      </div>
      <p className="mb-3 text-slate-400">{summary}</p>

      <div className="mb-5 flex flex-wrap items-center gap-[7px] sm:gap-[11px]">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="px-[10px] sm:px-[20px] py-[5px] sm:py-[10px] text-slate-400 bg-slate-50 font-semibold rounded-[5px]"
          >
            {tag}
          </div>
        ))}
      </div>

      <div className="flex items-stretch gap-4">
        <Link
          className="px-6 py-4 grow text-violet-500 bg-violet-100 hover:bg-violet-200 active:scale-95 transition will-change-transform rounded-[10px] font-semibold text-center"
          href=""
        >
          View
        </Link>
        <button aria-label="More" className="px-5 py-4 flex items-center text-violet-500 bg-slate-50 hover:bg-slate-200 active:scale-95 transition will-change-transform rounded-[10px] font-semibold text-center">
          <svg
            width="21"
            height="7"
            viewBox="0 0 21 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3.21239" cy="3.49996" r="2.915" fill="#9058FF" />
            <circle cx="10.4996" cy="3.49996" r="2.915" fill="#9058FF" />
            <circle cx="17.7876" cy="3.49996" r="2.915" fill="#9058FF" />
          </svg>
        </button>
      </div>
    </div>
  )
}
