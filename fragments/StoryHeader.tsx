import Image from 'next/image'

export default function StoryHeader() {
  return (
    <div className="mb-6 flex flex-wrap items-center">
      <div className="py-4 gap-6 flex flex-wrap items-center">
        <div className="gap-2 flex flex-wrap items-center">
          <Image
            className="w-[30px] h-[30px] object-cover rounded-full"
            src="/images/avatars/ashton-bingham-EQFtEzJGERg-unsplash.jpg"
            alt="James Robert"
            width={120}
            height={120}
          />
          <div className="text-slate-400 text-[22px] font-semibold">
            James Robert
          </div>
        </div>
        <div className="text-blue-400 text-[22px] font-medium">
          Created on 13 January 2022
        </div>
      </div>

      <div className="ml-auto gap-6 flex flex-wrap items-center">
        <div className="px-[15px] py-[10px] gap-[10px] min-h-[50px] flex items-center rounded-[10px] border border-transparent bg-slate-200/50 hover:bg-slate-200">
          <div className="text-xl font-semibold">Accessibility</div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.2561 17.1763C12.0008 17.175 11.749 17.1169 11.5189 17.0062C11.2889 16.8955 11.0863 16.735 10.9261 16.5363L6.71605 11.4363C6.47004 11.1292 6.31524 10.7593 6.26927 10.3685C6.2233 9.9778 6.28802 9.58201 6.45605 9.22627C6.59233 8.9171 6.81472 8.65368 7.09667 8.46749C7.37862 8.2813 7.7082 8.1802 8.04605 8.17627H16.4661C16.8039 8.1802 17.1335 8.2813 17.4154 8.46749C17.6974 8.65368 17.9198 8.9171 18.0561 9.22627C18.2241 9.58201 18.2888 9.9778 18.2428 10.3685C18.1969 10.7593 18.0421 11.1292 17.7961 11.4363L13.5861 16.5363C13.4258 16.735 13.2232 16.8955 12.9932 17.0062C12.7631 17.1169 12.5113 17.175 12.2561 17.1763Z"
              fill="#A0A3BD"
            />
          </svg>
        </div>
        <div className="px-[15px] py-[10px] gap-[10px] min-h-[50px] flex items-center rounded-[10px] border border-transparent bg-slate-200/50 hover:bg-slate-200">
          <svg
            width="28"
            height="8"
            viewBox="0 0 28 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4" r="4" fill="#9058FF" />
            <circle cx="14" cy="4" r="4" fill="#9058FF" />
            <circle cx="24" cy="4" r="4" fill="#9058FF" />
          </svg>
        </div>
      </div>
    </div>
  )
}
