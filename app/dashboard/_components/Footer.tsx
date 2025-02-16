import { BotMessageSquare, Github, Heart, Instagram, Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
    const containerClass = "container mx-auto px-4 sm:px-6 lg:px-8"
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-6">
            <div className={`${containerClass} flex flex-wrap justify-between items-center text-center sm:text-left`}>
                
                {/* Left Section - Logo */}
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-start mb-4 sm:mb-0">
                    <BotMessageSquare className="w-6 h-6 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-xl font-bold">AI Writer Studio</span>
                </div>

                {/* Center Section - Made with ❤️ */}
                <div className="w-full sm:w-auto flex justify-center items-center">
                    <p className='flex items-center gap-2 text-sm sm:text-base'>
                        Made with <Heart className='w-4 h-4 text-red-600' /> by Jimil Soni
                    </p>
                </div>

                {/* Right Section - Social Links */}
                <nav className="w-full sm:w-auto flex justify-center mt-4 gap-3 sm:justify-end">
                    <ul className="flex space-x-5 sm:space-x-6">
                        <li>
                            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                            </Link>
                        </li>
                    </ul>
                </nav>

            </div>
        </footer>
    )
}

export default Footer
