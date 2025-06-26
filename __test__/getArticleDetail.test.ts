import { ArticleScheme } from "@/lib/zodScheme";
import { getArticleDetail } from "@/services/api";

global.fetch = jest.fn();

describe("getArticleDetail", () => {
  const mockArticle = {
    id: "123",
    title: "Sample Article",
    date: "2024-06-01",
    image: "img.jpg",
    body: "This is a sample article",
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("fetch article and return parsed data", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockArticle,
    });

    const result = await getArticleDetail("123");
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/articles/123.json")
    );
    expect(result).toEqual(ArticleScheme.parse(mockArticle));
  });

  it("should throw an error on fetch failure", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      text: async () => "Not Found",
      status: 404,
    });

    await expect(getArticleDetail("123")).rejects.toThrow(
      "HTTP error 404: Not Found"
    );
  });
});
