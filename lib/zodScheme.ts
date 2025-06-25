import { z } from "zod";

export const ArticleIndexScheme = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  banner_url: z.string(),
});

export const ArticleScheme = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  body: z.string(),
  image: z.string(),
});

export type ArticleIndex = z.infer<typeof ArticleIndexScheme>;
export type Article = z.infer<typeof ArticleScheme>;
