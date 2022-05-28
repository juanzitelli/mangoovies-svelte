import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ params }) => {
  const TMDB_URL = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${
    params.id
  }?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

  const result = await (await fetch(TMDB_URL)).json();

  const movie = {
    ...result,
    poster_path: `${import.meta.env.VITE_TMDB_IMAGES_BASE_URL}/${
      result.poster_path
    }`,
  };

  return {
    body: {
      movie,
    },
  };
};
