import React from 'react'
import styles from './styles/article.module.css'
export const metadata = {
    title: 'Articles',
    description: 'Articles Page',
}
  
function layout({ children}) {
  return (
    <div className={styles.flex}>
      <div className={styles.art}>Diff Arts</div>
          {children}
    </div>
  )
}

export default layout