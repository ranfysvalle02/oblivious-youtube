'use client'  
  
import { ReactNode, useEffect, useRef } from 'react'  
  
export type SideBarProps = {  
  navItems: ReactNode  
  footerItems: ReactNode  
  children: ReactNode  
}  
  
export default function SideBar({  
  navItems,  
  footerItems,  
  children,  
}: SideBarProps) {  
  const sidebarRef = useRef<HTMLDivElement>(null)  
  const containerRef = useRef<HTMLDivElement>(null)  
  
  function onResize() {  
    if (window.innerWidth < 1024 && containerRef.current && sidebarRef.current) {  
      containerRef.current.scrollLeft =  
        sidebarRef.current.offsetWidth +  
        containerRef.current.offsetWidth -  
        containerRef.current.clientWidth  
    }  
  }  
  
  useEffect(() => {  
    window.addEventListener('resize', onResize)  
    onResize()  
    return () => {  
      window.removeEventListener('resize', onResize)  
    }  
  }, [])  
  
  return (  
    <div  
      ref={containerRef}  
      className="w-full h-full relative grid grid-cols-[auto,1fr] overflow-x-auto NoScrollbar snap-mandatory snap-x"  
    >  
      <div  
        ref={sidebarRef}  
        className="px-4 py-6 min-w-72 w-dvw sm:w-auto flex flex-col gap-8 bg-white overflow-y-auto snap-start"  
      >  
        {/* Logo and Header */}  
        <div className="flex items-center space-x-2">  
          <img  
            src="https://play-lh.googleusercontent.com/RhNizqvWTXtqlxmB4IvI6aR3KTXwyQKC1Mbb5mQxdVm8fAzbaAORnN4k_M9kAc6HmT0=w240-h480-rw"  
            alt="Sidebar Logo"  
            className="w-10 h-10 object-contain"  
          />  
          <h1 className="text-lg font-semibold text-gray-800" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>  
            oblivious-youtube  
          </h1>  
        </div>  
  
        {/* Navigation Items */}  
        <nav>  
          <ul className="flex flex-col space-y-2">{navItems}</ul>  
        </nav>  
  
        {/* Spacer to push footer to bottom */}  
        <div className="flex-grow"></div>  
  
        {/* Footer Items */}  
        <aside>  
          <ul className="flex flex-col space-y-2">{footerItems}</ul>  
        </aside>  
      </div>  
  
      {/* Main Content */}  
      <div className="lg:w-auto w-dvw overflow-y-auto snap-start">{children}</div>  
    </div>  
  )  
}  
