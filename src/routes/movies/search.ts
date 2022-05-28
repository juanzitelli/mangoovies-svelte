import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get("query");

  const TMDB_URL = `${
    import.meta.env.VITE_TMDB_API_BASE_URL
  }/search/movie?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }&language=en-US&page=1&include_adult=false&query=${query}`;

  const { results } = await (await fetch(TMDB_URL)).json();

  const searchedMovies = results?.map((item: Record<string, string>) => {
    return {
      ...item,
      poster_path: `${import.meta.env.VITE_TMDB_IMAGES_BASE_URL}${
        item.poster_path
      }`,
    };
  });

  return {
    body: {
      movies: searchedMovies,
    },
  };
};
