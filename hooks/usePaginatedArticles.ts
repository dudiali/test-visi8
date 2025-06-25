import { getAllArticles } from "@/lib/api";
import { ArticleIndex } from "@/lib/zodScheme";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;
let allArticlesCache: ArticleIndex[] | null = null;

export const usePaginatedArticles = () => {
  return useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: async ({ pageParam = 0 }) => {
      if (pageParam === 0 || allArticlesCache === null) {
        allArticlesCache = await getAllArticles();
      }

      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const pageData = allArticlesCache.slice(start, end);

      return pageData;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flat().length;
      if (allArticlesCache && totalLoaded < allArticlesCache.length) {
        return allPages.length;
      }
      return undefined;
    },
  });
};
