import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='p-5 shadow-sm border-b-2 flex flex-wrap justify-between items-center bg-white gap-3'>
      {/* Search Bar */}
      <div className='flex gap-2 items-center p-2 border rounded-md bg-white w-full sm:max-w-md'>
        <Search className='text-gray-500'/>
        <input className='outline-none w-full' type='text' placeholder='Search'/>
      </div>

      {/* Membership Banner */}
      <div className='flex gap-4'>
        <h2 className='bg-[#1e40af] p-2 rounded-md text-xs sm:text-sm text-white px-3 text-center'>
          🚀 Join membership for more access
        </h2>
        <UserButton/>
      </div>
    </div>
  )
}

export default Header
