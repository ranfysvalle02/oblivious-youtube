import Image from 'next/image'
import Link from 'next/link'

export type AdvertisementItemProps = {
  imageSrc: string
  title: string
  description: string
  href: string
}

export default function AdvertisementItem({
  imageSrc,
  title,
  description,
  href,
}: AdvertisementItemProps) {
  return (
    <div className="max-w-[600px] grid grid-cols-[45%,_auto] items-stretch bg-white rounded-3xl shadow-[0_0_10px_0_hsl(0deg_0%_0%_/_25%)]">
      <Image
        className="block w-full h-auto object-cover aspect-[226/212] rounded-[inherit] rounded-r-none"
        src={imageSrc}
        alt={title}
        width={226}
        height={212}
        priority={true}
      />
      
      <div className="px-5 py-5">
        <h4 className="mb-2 text-slate-800 text-2xl leading-normal font-semibold">
          {title}
        </h4>
        <p className="mb-3 text-slate-400">{description}</p>
        
        <div className="flex items-stretch gap-[10px]">
          <Link
            className="px-6 py-4 grow text-violet-500 bg-violet-100 hover:bg-violet-200 active:scale-95 transition will-change-transform rounded-[10px] font-semibold text-center"
            href={href}
          >
            Visit
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
  )
}
