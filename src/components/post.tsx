'use client'; // Allows us to use React Hooks and other CSR stuffs (window object, state, ..).

import useGetPosts from '@/services/use-get-posts';
import { isServer } from '@tanstack/react-query';

export function Posts() {
  console.log('[components/posts] Is Server:', isServer);

  // This is the service call, which will return the data
  // that is already fetched and dehydrated by the Server Component (post/page.tsx)
  const { data: posts, isLoading, isSuccess, isFetched } = useGetPosts();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isFetched) {
    console.log('[components/posts] Fetched.');
  }

  if (isSuccess) {
    console.log('[components/posts] Succeeded:');
  }

  return posts ? (
    posts.map((post) => (
      <p key={post.id}>
        {post.id}) {post.title}
      </p>
    ))
  ) : (
    <p>No data</p>
  );
}
