import { notFound } from 'next/navigation';

async function getBlog(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function BlogDetail({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);
  if (!blog) return notFound();

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      <p className="mb-4">{blog.body}</p>
      <div className="text-sm text-gray-500">Blog ID: {blog.id}</div>
    </main>
  );
}
