<script lang="ts">
    import { filter, justOpen } from "$lib/stores/filter";
    import Restaurant from "./Restaurant.svelte";
    import type { RestaurantData } from "./types";

    export let data: { restaurants: RestaurantData[] } | null;

    let restaurants: RestaurantData[];

    $: restaurants = (data?.restaurants ?? [])
        .sort((r1, r2) => r1.surcharge - r2.surcharge)
        .filter((r) => filter(r, $justOpen));
</script>

<div class="restaurants">
    {#each restaurants as restaurant}
        <Restaurant {restaurant} />
    {/each}
</div>

<style>
    .restaurants {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 50px;
    }
</style>
