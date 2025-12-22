import Link from 'next/link';

async function getBlogs() {
  // Example: use jsonplaceholder for blog posts
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function BlogList() {
  const blogs = await getBlogs();
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Blog List (ISR)</h1>
      <ul className="space-y-4">
        {blogs.map((blog: any) => (
          <li key={blog.id} className="border-b pb-2">
            <Link href={`/blog/${blog.id}`} className="text-blue-600 underline font-semibold">
              {blog.title}
            </Link>
            <p className="text-sm text-gray-600">{blog.body.slice(0, 80)}...</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
