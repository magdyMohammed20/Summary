import React from 'react'
import styles from './navbar.module.css'
import Link from 'next/link'
function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
      <li><Link href='/'>Home</Link></li>
        <li><Link href='/posts'>Posts</Link></li>
        <li><Link href='/articles'>Articles</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar