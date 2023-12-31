import AdminNavbar from '@/components/Admin/AdminNavbar'
import {Providers} from '@/utils/providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
        <body className={inter.className}>
          <Providers>
            <section>
              {children}
            </section>
          </Providers>
        </body>
    </html>
  )
}
