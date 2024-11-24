import React from 'react'
import styles from '../../page.module.css'

export default function PostDetails({params}) {
  return (
      <main className={styles.main}>
          <h1>post - {params.postId }</h1>
    </main>
  )
}

 