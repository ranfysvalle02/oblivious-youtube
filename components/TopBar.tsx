import Link from 'next/link'
import { ReactNode } from 'react'

export type TopBarProps = {
  start: ReactNode
  end: ReactNode
  children: ReactNode
}

function TopBar({ start, end, children }: TopBarProps) {
  return (
    <div className="w-full h-full grid grid-rows-[auto,_1fr] bg-slate-100">
      

      <div className="px-4 pr-2 py-8 sm:px-14 sm:py-14 overflow-auto">{children}</div>
    </div>
  )
}

TopBar.Search = function Search() {
  return (
    <div className="px-4 py-0 min-w-28 sm:min-w-72 w-full lg:w-auto flex items-center rounded-3xl bg-slate-50 hover:bg-slate-100 focus-within:hover:bg-slate-50 focus-within:outline focus-within:outline-1 focus-within:outline-violet-700 transition">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 21L16.514 16.506M19 10.5C19 12.7543 18.1045 14.9163 16.5104 16.5104C14.9163 18.1045 12.7543 19 10.5 19C8.24566 19 6.08365 18.1045 4.48959 16.5104C2.89553 14.9163 2 12.7543 2 10.5C2 8.24566 2.89553 6.08365 4.48959 4.48959C6.08365 2.89553 8.24566 2 10.5 2C12.7543 2 14.9163 2.89553 16.5104 4.48959C18.1045 6.08365 19 8.24566 19 10.5V10.5Z"
          stroke="#CECECE"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        className="px-2 py-4 w-full bg-transparent text-sm placeholder:text-zinc-300 outline-none"
        type="text"
        placeholder="Search"
        name="Search"
      />
    </div>
  )
}

TopBar.Back = function Back() {
  return (
    <Link className="px-3 py-3 hover:bg-slate-200 active:scale-95 transition will-change-transform rounded-md" href="/">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.16825 15.9685C6.30924 15.9685 6.42203 15.9685 6.53483 15.9685C12.8794 15.9685 19.231 15.9685 25.5756 15.9685C25.7237 15.9685 25.8788 15.9685 26.0197 15.9473C26.6119 15.8486 26.9855 15.4115 26.9996 14.8194C27.0137 14.2484 26.626 13.7831 26.0409 13.6703C25.8717 13.6351 25.7096 13.6351 25.5404 13.6351C19.2028 13.6351 12.8653 13.6351 6.52072 13.6351C6.40793 13.6351 6.29514 13.6351 6.1753 13.6351C6.1894 13.48 6.29514 13.4306 6.36564 13.3601C7.47946 12.2463 8.59329 11.1395 9.70712 10.0187C10.3063 9.41239 10.1794 8.49595 9.46038 8.12938C9.01626 7.89674 8.48754 7.98134 8.09982 8.35496C7.78964 8.65104 7.48651 8.96122 7.18338 9.26435C5.66068 10.7871 4.13798 12.3098 2.61528 13.8325C2.24871 14.199 2.03017 14.6009 2.19231 15.1366C2.2628 15.3622 2.39675 15.5455 2.55889 15.7076C4.39177 17.5405 6.22464 19.3804 8.05752 21.2133C8.47345 21.6292 8.91757 21.7138 9.37579 21.4953C9.84106 21.2768 10.116 20.8115 10.0737 20.3039C10.0455 19.9867 9.86925 19.747 9.65777 19.5355C8.55804 18.4358 7.45831 17.3361 6.35859 16.2363C6.30219 16.1658 6.21055 16.1165 6.16825 15.9685Z"
          fill="#212121"
        />
      </svg>
    </Link>
  )
}

export type TitleProps = {
  title: string
}

TopBar.Title = function Title({ title }: TitleProps) {
  return <h1 className="text-3xl font-bold">{title}</h1>
}

export default TopBar
