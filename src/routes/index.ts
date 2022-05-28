import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async () => {
  const TMDB_URL = `${
    import.meta.env.VITE_TMDB_API_BASE_URL
  }/discover/movie?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

  const { results } = await (await fetch(TMDB_URL)).json();

  const discoveryMovies = results.map((item: Record<string, string>) => {
    return {
      ...item,
      backdrop_path: `${import.meta.env.VITE_TMDB_IMAGES_BASE_URL}${
        item.backdrop_path
      }`,
    };
  });

  return {
    body: {
      discoveryMovies,
    },
  };
};
