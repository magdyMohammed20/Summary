import Image from 'next/image'
import styles from './page.module.css'
import Hero from '/public/images/hero/hero2.svg'
export const metadata = {
  title: 'Home Page',
  description: 'Home Page Is The First Page In The Site'
}
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
      <div className={styles.col}>
          <h1 className={styles.title}>
            Front End Developer
          </h1>
          <p className={styles.description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text  
          </p>

          <button className={styles.button}>
          Shop Now
        </button>
        </div>
        <div className={styles.col}>
          <Image src={Hero} alt='hero image' className={styles.img} />
        </div>

        
        
      </div>
    </main>
  )
}
