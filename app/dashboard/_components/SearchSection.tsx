import { Search } from 'lucide-react'
import React from 'react'

function SearchSection({ onSearchInp }: any) {
    return (
        <div className='p-5 sm:p-10 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex flex-col items-center justify-center text-white text-center rounded-b-md'>
            {/* Title & Subtitle */}
            <h2 className='text-2xl sm:text-3xl font-bold'>Templates for Every Need</h2>
            <p className='text-sm sm:text-base mt-1'>Ready to create something amazing?</p>

            {/* Search Bar */}
            <div className='w-full flex justify-center mt-4'>
                <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-full sm:w-[75%] md:w-[50%] max-w-lg'>
                    <Search className='text-indigo-900' />
                    <input 
                        type="text" 
                        placeholder='Search' 
                        className='bg-transparent outline-none text-black w-full'
                        onChange={(event) => onSearchInp(event.target.value)} 
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchSection
