export const convertDate = (str: string) => {
  const formatted = new Date(str).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatted;
};

export const getWords = (str: string, n: number) => {
  return str.split(" ").slice(0, n).join(" ");
};
