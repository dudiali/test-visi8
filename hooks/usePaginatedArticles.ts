import { getAllArticles } from "@/lib/api";
import { ArticleIndex } from "@/lib/zodScheme";
import { setData } from "@/state/sessionSlice";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const PAGE_SIZE = 5;
let allArticlesCache: ArticleIndex[] | null = null;

export const usePaginatedArticles = () => {
  const dispatch = useDispatch();
  return useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: async ({ pageParam = 0 }) => {
      if (pageParam === 0 || allArticlesCache === null) {
        allArticlesCache = await getAllArticles();
      }

      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const pageData = allArticlesCache.slice(start, end);
      dispatch(setData(pageData));

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
