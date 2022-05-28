<script lang="ts">
  import type { Movie } from "src/_types";

  export let movie: Movie | null = null;
</script>

<svelte:head>
  <title>Single movie</title>
</svelte:head>

<nav>
  <a href="/">Home</a>
</nav>

<main>
  {#if movie !== null}
    <section>
      <img
        class="rounded"
        src={movie.poster_path}
        alt={movie.title}
        title={movie.title}
        width={184}
        height={276}
      />
      <h2>{movie.title}</h2>
    </section>
  {:else}
    <p>Something went wrong trying to fetch the movie</p>
  {/if}
</main>
