import React from 'react'
import styles from '@/app/page.module.css'
function SingleBlogPage({params}) {
  return (
      <div className={styles.main}>
      <h1>Single Blog Page - {params.id}</h1>
      
    </div>
  )
}

export default SingleBlogPage