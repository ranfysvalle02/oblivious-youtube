import AdvertisementItem from '@/components/AdvertisementItem'
import Link from 'next/link'

export default function Advertisements() {
  return (
    <div className="">
      <div className="mb-9 flex items-center">
        <h3 className="text-slate-900 text-2xl leading-normal font-semibold">
          Advertisement
        </h3>
        <Link
          className="ml-auto text-violet-500 hover:text-violet-700 text-xl font-semibold"
          href=""
        >
          See all
        </Link>
      </div>

      <div className="mb-10 max-w-full grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-3 sm:gap-[20px]">
        <AdvertisementItem
          imageSrc="/images/advertisements/1.jpg"
          title="Build your business"
          description="Shopify has all the tools you need to start, sell, market, and manage."
          href=""
        />
        <AdvertisementItem
          imageSrc="/images/advertisements/2.jpg"
          title="Libre Coffee"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
          href=""
        />
        <AdvertisementItem
          imageSrc="/images/advertisements/3.jpg"
          title="KFC"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
          href=""
        />
      </div>
    </div>
  )
}
