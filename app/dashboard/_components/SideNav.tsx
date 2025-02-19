"use client"
import { FileClock, Home, Settings, WalletCards, Menu, BotMessageSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TrackUsage from './TrackUsage'

function SideNav() {
    const [isOpen, setIsOpen] = useState(true); // Toggle state for sidebar

    const menuItems = [
        { name: "Home", icon: Home, path: "/dashboard" },
        { name: "History", icon: FileClock, path: "/dashboard/history" },
        { name: "Billing", icon: WalletCards, path: "/dashboard/billing" },
        { name: "Settings", icon: Settings, path: "/dashboard/setting" },
    ]

    const path = usePathname();

    useEffect(() => {
        console.log(path);
    }, [])

    return (
        <div className={`h-screen relative p-5 shadow-sm border bg-white transition-all duration-300
            ${isOpen ? 'min-w-[250px]' : 'w-[70px]'} flex flex-col`}
        >
            {/* Toggle Button for Mobile */}
            <button onClick={() => setIsOpen(!isOpen)} className='block md:hidden mb-5'>
                <Menu className='w-6 h-6' />
            </button>
            
            <div className='flex flex-col items-center'>
                <Link href='/dashboard'>
                <BotMessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />                </Link>
                {isOpen && (
                    <>
                        <h2 className='text-lg font-bold mt-2'>AI Writer Studio</h2>
                        <p className='text-gray-600 text-[13px]'>Write smarter and better with AI.</p>
                    </>
                )}
            </div>

            <hr className='my-6' />

            <div className='mt-3'>
                {menuItems.map((menu, index) => (
                    <Link key={index} href={menu.path} className="block">
                        <div className={`flex items-center gap-2 mb-2 p-3 hover:bg-blue-800 hover:text-white rounded-lg cursor-pointer transition-all duration-300
                            ${path === menu.path ? 'bg-blue-800 text-white' : ''}
                        `}>
                            {menu.icon && <menu.icon />}
                            {isOpen && <h2>{menu.name}</h2>}
                        </div>
                    </Link>
                ))}
            </div>
            <div className='absolute bottom-10 left-0 w-full'>
                <TrackUsage/>
            </div>
        </div> 
    );
}

export default SideNav
