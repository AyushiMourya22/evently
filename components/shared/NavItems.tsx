'use client';
import React from 'react'
import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function NavItems() {
    const path=usePathname()
  return (
    <ul className='flex md:flex-between w-full flex-col items-start gap-5 md:flex-row'>
        {headerLinks.map((l)=>{
            const isActive=path===l.route

            return (
                <li 
                key={l.route}
                className={`${isActive && 'text-primary-500'} flex-center p-medium-16 whitespace-nowrap`}
                ><Link href={l.route}>{l.label}</Link></li>
            )
        })}
    </ul>
  )
}
