import { Inter , Lalezar } from 'next/font/google' // Import The Font From Google
import './globals.css'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import { ThemeProvider } from '@/context/themeProvider'
const inter = Inter({ subsets: ['latin'] })

// Create Font Config
const lalezar = Lalezar({ subsets: ['arabic'] , weight: ['400'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

// Use The Font Here Using className={lalezar.className}
export default function RootLayout({ children }) {
  return (
    
    
      <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
        <div className='container'>
            <Navbar/>
              {children}
            <Footer/>
          </div>
      </ThemeProvider>
         
        </body>
        </html>
      
    
  )
}
