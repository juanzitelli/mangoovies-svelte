<script lang="ts">
  import Rating from "../components/Rating.svelte";

  import type { Movie } from "./../_types";

  export let discoveryMovies: Array<Movie> | null = null;
  let searchedMovies: Promise<Array<Movie>> | null = null;
  let term: string | null = null;
  let selectedRating: number | null = null;

  const searchMovies = async ({ query }: { query: string }) => {
    const { movies } = await (
      await fetch(`/movies/search?query=${query}`)
    ).json();

    return movies;
  };

  const onRatingSelectHandler = (rating: number | null) =>
    (selectedRating = rating);

  const inputChangeHandler: HTMLInputElement["oninput"] = (event) =>
    //@ts-ignore I'll need to figure out what's the correct typing for inputs
    (term = event?.target?.["value"]);

  $: {
    if (typeof term === "string" && term.length > 0) {
      searchedMovies = searchMovies({ query: term });
    } else {
      searchedMovies = null;
    }
  }
</script>

<svelte:head>
  <title>Mangoovies | Svelte Edition</title>
</svelte:head>

<h1>Movies</h1>

<form on:submit|preventDefault={() => {}}>
  <label for="term">Search</label>
  <input
    on:input={inputChangeHandler}
    class="border rounded"
    type="text"
    name="term"
    id="term"
  />
</form>

{#if term}
  {#await searchedMovies then movies}
    <h1>Searched movies</h1>
    <Rating onSelectRating={onRatingSelectHandler} />
    <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
      {#if movies}
        {#each movies as movie (movie)}
          {#if selectedRating !== null}
            {#if movie.vote_average > selectedRating - 2 && movie.vote_average <= selectedRating}
              <a href={`/movie/${movie.id}`}>
                <article
                  class="border p-2 rounded-lg shadow-md flex flex-col max-w-[15rem]"
                >
                  <img
                    class="rounded"
                    src={movie.poster_path}
                    alt={movie.title}
                    title={movie.title}
                  />
                  <h2>{movie.title}</h2>
                  <h3>Vote average: {movie.vote_average}</h3>
                </article>
              </a>{/if}
          {:else}
            <a href={`/movie/${movie.id}`}>
              <article
                class="border p-2 rounded-lg shadow-md flex flex-col max-w-[15rem]"
              >
                <img
                  class="rounded"
                  src={movie.poster_path}
                  alt={movie.title}
                  title={movie.title}
                />
                <h2>{movie.title}</h2>
                <h3>Vote average: {movie.vote_average}</h3>
              </article>
            </a>
          {/if}
        {/each}
      {/if}
    </section>
  {/await}
{:else if discoveryMovies !== null}
  <h1>Discovery movies</h1>
  <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
    {#each discoveryMovies as movie (movie)}
      <a href={`/movie/${movie.id}`}>
        <article
          class="border p-2 rounded-lg shadow-md flex flex-col max-w-[15rem]"
        >
          <img
            class="rounded"
            src={movie.backdrop_path}
            alt={movie.title}
            title={movie.title}
          />
          <h2>{movie.title}</h2>
        </article>
      </a>
    {/each}
  </section>
{:else}
  <p>No movies</p>
{/if}
