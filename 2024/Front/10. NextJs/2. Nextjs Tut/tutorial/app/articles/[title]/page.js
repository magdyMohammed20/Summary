import React from 'react'
import styles from '../../page.module.css'
function Article({params}) {
  return (
      <main className={styles.main}>
          <h1>Title - {params.title }</h1>
      </main>
  )
}

export default Article