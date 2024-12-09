import cn from '@/utils/cn'
import Image from 'next/image'
import Link from 'next/link'

export type StoryItemProps = {
  id: string
  imageSrc: string
  title: string
  field: string
  date: string
  status: string
  views: number
}

export default function StoryItem({
  id,
  imageSrc,
  title,
  field,
  date,
  status,
  views,
}: StoryItemProps) {
  return (
    <div className="relative w-[300px] min-w-[300px] sm:w-[340px] sm:min-w-[340px] h-[440px] sm:h-[500px] bg-white rounded-3xl">
      <Image
        className="w-full h-full rounded-[inherit]"
        src={imageSrc}
        alt={title}
        width={2 * 340}
        height={2 * 500}
        priority={true}
      />

      <div className="p-4 absolute w-full h-full flex flex-col justify-between inset-0 bg-gradient-to-t from-black/70 from-30% to-black/0 rounded-[inherit]">
        <div className="justify-end flex gap-[5px] items-center">
          <div className="px-[10px] py-[5px] gap-[5px] flex items-center bg-white text-violet-500 rounded-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3C4.66667 3 1.82 5.07333 0.666668 8C1.82 10.9267 4.66667 13 8 13C11.3333 13 14.18 10.9267 15.3333 8C14.18 5.07333 11.3333 3 8 3ZM8 11.3333C6.16 11.3333 4.66667 9.84 4.66667 8C4.66667 6.16 6.16 4.66667 8 4.66667C9.84 4.66667 11.3333 6.16 11.3333 8C11.3333 9.84 9.84 11.3333 8 11.3333ZM8 6C6.89333 6 6 6.89333 6 8C6 9.10667 6.89333 10 8 10C9.10667 10 10 9.10667 10 8C10 6.89333 9.10667 6 8 6Z" fill="#9058FF"/>
            </svg>
            <div className="text-xs font-semibold">{views}</div>
          </div>
          <div className="px-[10px] py-[5px] gap-[5px] flex items-center bg-white text-violet-500 rounded-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.58667 12.6002C4.31334 12.6002 4.08667 12.3735 4.08667 12.1002V10.7202C4.08667 10.4469 4.31334 10.2202 4.58667 10.2202C4.86 10.2202 5.08667 10.4469 5.08667 10.7202V12.1002C5.08667 12.3802 4.86 12.6002 4.58667 12.6002Z" fill="#9058FF"/>
              <path d="M8 12.6002C7.72667 12.6002 7.5 12.3735 7.5 12.1002V9.3335C7.5 9.06016 7.72667 8.8335 8 8.8335C8.27333 8.8335 8.5 9.06016 8.5 9.3335V12.1002C8.5 12.3802 8.27333 12.6002 8 12.6002Z" fill="#9058FF"/>
              <path d="M11.4133 12.5998C11.14 12.5998 10.9133 12.3731 10.9133 12.0998V7.95312C10.9133 7.67979 11.14 7.45312 11.4133 7.45312C11.6867 7.45312 11.9133 7.67979 11.9133 7.95312V12.0998C11.9133 12.3798 11.6933 12.5998 11.4133 12.5998Z" fill="#9058FF"/>
              <path d="M4.58667 8.78645C4.36 8.78645 4.16 8.63312 4.1 8.40645C4.03334 8.13978 4.19334 7.86645 4.46667 7.79978C6.92 7.18645 9.08 5.84645 10.7267 3.93312L11.0333 3.57312C11.2133 3.36645 11.5267 3.33978 11.74 3.51978C11.9467 3.69978 11.9733 4.01312 11.7933 4.22645L11.4867 4.58645C9.70667 6.66645 7.36 8.11312 4.70667 8.77312C4.66667 8.78645 4.62667 8.78645 4.58667 8.78645Z" fill="#9058FF"/>
              <path d="M11.4133 6.34657C11.14 6.34657 10.9133 6.1199 10.9133 5.84657V4.3999H9.46C9.18667 4.3999 8.96 4.17324 8.96 3.8999C8.96 3.62657 9.18667 3.3999 9.46 3.3999H11.4133C11.6867 3.3999 11.9133 3.62657 11.9133 3.8999V5.85324C11.9133 6.12657 11.6933 6.34657 11.4133 6.34657Z" fill="#9058FF"/>
              <path d="M10 15.1668H6C2.38 15.1668 0.833336 13.6202 0.833336 10.0002V6.00016C0.833336 2.38016 2.38 0.833496 6 0.833496H10C13.62 0.833496 15.1667 2.38016 15.1667 6.00016V10.0002C15.1667 13.6202 13.62 15.1668 10 15.1668ZM6 1.8335C2.92667 1.8335 1.83334 2.92683 1.83334 6.00016V10.0002C1.83334 13.0735 2.92667 14.1668 6 14.1668H10C13.0733 14.1668 14.1667 13.0735 14.1667 10.0002V6.00016C14.1667 2.92683 13.0733 1.8335 10 1.8335H6Z" fill="#9058FF"/>
            </svg>
          </div>
        </div>
        
        <div className="">
          <h4 className="text-white text-2xl leading-normal font-semibold">
            {title}
          </h4>
          
          <div className="mb-3 flex items-center">
            <div className="text-white font-extrabold uppercase">
              {field}
            </div>
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
            <div className="text-slate-300 font-semibold">{date}</div>
            <div
              className={cn(
                'ml-auto px-[20px] py-[10px] hidden sm:block font-semibold text-center text-nowrap leading-tight rounded-[5px]',
                status === 'Created' && 'bg-blue-100 text-blue-500',
                status === 'Published' && 'bg-teal-50 text-teal-600',
                status === 'Draft' && 'bg-slate-200 text-slate-600',
              )}
            >
              {status}
            </div>
          </div>

          <div className="flex items-stretch gap-[10px]">
            <Link
              className="px-6 py-4 grow text-violet-500 bg-violet-100 hover:bg-violet-200 active:scale-95 transition will-change-transform rounded-[10px] font-semibold text-center"
              href={`/stories/${id}`}
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
      </div>
    </div>
  )
}
