import React from 'react'

export const metadata = {
    title: "Posts",
    description: "All Posts"
}
function layout({children}) {
  return (
      <div>
          {children}
    </div>
  )
}

export default layout