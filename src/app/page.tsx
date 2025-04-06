import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen w-screen bg-gradient-to-br from-blue-700 relative to-blue-300'>
      <div className='size-full absolute bg-blue-700/80 z-10 '/>
      <Image src={"https://i.pinimg.com/736x/52/36/e5/5236e5bf3228dbfeaf0d90be5c57e8ae.jpg"} alt='' fill className='object-cover' />
      <Card className='flex flex-col gap-2 p-12 backdrop-blur-3xl border-none text-white bg-blue-200/40 z-20 shadow-2xl shadow-black text-center items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h1 className='text-5xl font-bold'>Welcome to Your project Success</h1>
        <p className='mt-4 text-lg '>Your journey begins here!</p>
        <Button className='bg-white text-blue-700' asChild>
        <Link href='https://github.com/DUSHIME1212/electron-next15-boilerplate.git' className=''>
          Go give stars on github
        </Link>
      </Button>
      </Card>

    </div>
  )
}

export default page