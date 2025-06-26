import { getArticleDetail } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useArticleDetail = (id: string) => {
  return useQuery({
    queryKey: ["article-detail", id],
    queryFn: () => getArticleDetail(id),
    staleTime: 1000 * 60 * 60,
  });
};
