import React from 'react'
import Navbar from '../fullstack-app/components/MyNavigation'
function PageLayout({children}) {
  return (
      <div>
            <Navbar/>
          <div>
                {children}
        </div>
    </div>
  )
}

export default PageLayout