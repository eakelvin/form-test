import Form from '@/components/Form'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <>
      {/* <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6"> */}
      <div className="text-gray-900 sm:text-lg dark:text-gray-400 p-5 max-md:!w-full">
        <Form />
      </div>
    </>
  )
}

export default Home