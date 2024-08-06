import { isServer, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

export interface IPostModel {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getPosts = async () => {
  console.log('[services/get-posts] isServer: ', isServer);

  try {
    const endpoint = `https://jsonplaceholder.typicode.com/posts`;

    const { data } = await axios.get<IPostModel[], AxiosResponse<IPostModel[]>>(endpoint);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// This part is Tanstack Query
// We are using useQuery to cache our data for 10 minutes
const useGetPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 10 * 60 * 1000, // This will override the global staleTime
  });
};

export default useGetPosts;
