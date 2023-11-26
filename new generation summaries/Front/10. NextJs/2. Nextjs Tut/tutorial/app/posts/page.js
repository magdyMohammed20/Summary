import styles from '../page.module.css'
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

export default async function PostsPage() {

  const response = await fetch(`${process.env.API_URL}/posts/1`)
  const post = await response.json();
  return (
<main className={styles.main}>
      <h1>All Posts - {post.id}</h1>
  </main>
  )
}
