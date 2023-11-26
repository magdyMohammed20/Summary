import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Home Page - {process.env.API_URL}</h1>
    </main>
  )
}
