import { SignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'

export default function Header() {
  return (
    <header className='border-b w-full'>
        <div className='wrapper flex items-center justify-between'>
            <Link href="/" className='w-36'>
                <Image src="/assets/images/logo.svg" alt='Eventify logo' width={128} height={38} ></Image>
            </Link>
            <SignedIn>
              <nav className='hidden  md:flex-between w-full max-w-xs'>
                <NavItems/>
              </nav>
            </SignedIn>
            <div className='flex w-32 justify-end gap-3'>
              <SignedIn>
                <UserButton afterSignOutUrl='/'></UserButton>
                <MobileNav/>
              </SignedIn>
              <SignedOut>
                <Button asChild className='rounded-full' size="lg">
                  <Link href="/sign-in">Login</Link>
                </Button>
              </SignedOut>
            </div>
        </div>
    </header>
  )
}
