import { BotMessageSquare, Github, GithubIcon, Heart, Instagram, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
    const containerClass = "container mx-auto px-4 sm:px-6 lg:px-8"
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-8">
            <div className={`${containerClass} flex flex-col sm:flex-row justify-between items-center`}>
                <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                    <BotMessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-xl font-bold">AI Writer Studio</span>
                </div>
                <div className='flex justify-center items-center text-center'>
                    <p className='flex items-center gap-2'>Made with <Heart className='w-4 h-4 text-red-600' /> by Jimil Soni</p>
                </div>
                <nav className="flex justify-center sm:justify-end w-full sm:w-auto">
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Instagram/>
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Github/>
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Mail/>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
