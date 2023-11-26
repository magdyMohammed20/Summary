import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/global/navbar/Navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home Page',
  description: 'Home Page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
      
      </body>
    </html>
  )
}
