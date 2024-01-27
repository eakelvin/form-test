import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className="bg-blue-950 text-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/favicon.ico" className="h-8" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">EA-FORMS</span>
                </a>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <a href="#" className="text-sm dark:text-blue-500 hover:underline">Get Started</a>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar