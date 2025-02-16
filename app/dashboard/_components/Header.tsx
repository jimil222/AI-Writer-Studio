import { UserButton } from '@clerk/nextjs'
import { FileClock, Home, Menu, Search, Settings, WalletCards } from 'lucide-react'
import React from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Link from 'next/link'


function Header() {
  return (
    <div className='p-5 shadow-sm border-b-2 flex items-center justify-between bg-white gap-3'>
      {/* Search Bar (Hidden on small screens) */}
      <div className='hidden md:flex gap-2 items-center p-2 border rounded-md bg-white flex-grow max-w-[60%]'>
        <Search className='text-gray-500' />
        <input className='outline-none w-full' type='text' placeholder='Search' />
      </div>

      {/* Menubar (Visible on md and smaller) */}
      <div className="md:hidden flex">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="border-none outline-none ring-0 focus:ring-0 focus:outline-none p-0">
              <Menu className="w-6 h-6" />
            </MenubarTrigger>
            <MenubarContent>
            <Link href='/dashboard'>
              <MenubarItem className="flex items-center gap-3">
                <Home className="w-5 h-5" />
                Home
              </MenubarItem>
                <MenubarSeparator/>
            </Link>
            <Link href='/dashboard/history'>
              <MenubarItem className="flex items-center gap-3">
                <FileClock className="w-5 h-5" />
                History
              </MenubarItem>
                <MenubarSeparator/>
            </Link>
            <Link href='/dashboard/billing'>
              <MenubarItem className="flex items-center gap-3">
                <WalletCards className="w-5 h-5" />
                Billing
              </MenubarItem>
                <MenubarSeparator/>
            </Link>
            <Link href='/dashboard/settings'>
              <MenubarItem className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                Settings
              </MenubarItem>
                <MenubarSeparator/>
            </Link>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      {/* Membership Banner + User Button */}
      <div className='flex items-center gap-4'>
        <h2 className='bg-[#1e40af] p-2 rounded-md text-xs sm:text-sm text-white px-3 text-center whitespace-nowrap'>
          🚀 Join membership for more access
        </h2>
        <UserButton />
      </div>
    </div>
  )
}



export default Header
