process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

export default async function PostsPage() {
  const response = await fetch(`${process.env.API_URL}/posts`);
  const posts = await response.json();
  return (
    <main>
      <h1>All Posts - {JSON.stringify(posts.length)}</h1>
    </main>
  );
}
