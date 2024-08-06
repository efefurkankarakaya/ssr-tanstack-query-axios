import { dehydrate, HydrationBoundary, isServer, QueryClient } from '@tanstack/react-query';
import { getPosts } from '@/services/use-get-posts';
import { Posts } from '@/components/post';

export default async function PostsRoute() {
  console.log('[page/posts] Is Server:', isServer);

  // Creating a new QueryClient instance
  const queryClient = new QueryClient();

  // Prefetching the data
  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  // Dehydrating (making accessible the data and state over the client-side)
  // the Query Client instance
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  );
}
