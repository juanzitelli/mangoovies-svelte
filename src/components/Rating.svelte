<script lang="ts">
  export let onSelectRating: (rating: number | null) => void;
  let currentlySelectedRating: number | null = null;
  const stars = [2, 4, 6, 8, 10];

  const getAverageScoreMessage = (score: number | null) =>
    score !== null
      ? `Showing movies with an average score between ${score - 2} and ${score}`
      : `Inactive filter`;
</script>

<span class="flex flex-row p-5 border">
  {#each stars as star (star)}
    <div
      on:click={() => {
        onSelectRating(star);
        currentlySelectedRating = star;
      }}
    >
      {typeof currentlySelectedRating === "number" &&
      star <= currentlySelectedRating
        ? "⭐️"
        : "☆"}
    </div>
  {/each}
  {#if currentlySelectedRating !== null}
    <button
      on:click={() => {
        onSelectRating(null);
        currentlySelectedRating = null;
      }}>Clear</button
    >{/if}
</span>

{getAverageScoreMessage(currentlySelectedRating)}
