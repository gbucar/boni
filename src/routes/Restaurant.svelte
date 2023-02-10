<script lang="ts">
    import { fly, slide } from "svelte/transition";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import MapLocationIcon from "$lib/icons/MapLocationIcon.svelte";
    import NavigationIcon from "$lib/icons/NavigationIcon.svelte";
    import type { RestaurantData } from "./types";
    export let restaurant: RestaurantData;
    let collapsed = true;
    const days = ["pon", "tor", "sre", "čet", "pet", "sob", "ned"];

    const radius = tweened(25, {
        duration: 200,
        easing: cubicOut,
    });

    const mapsLink = (
        restaurant: RestaurantData,
        navigation: boolean = false
    ) => {
        const dq = navigation ? "destination" : "query";
        return (
            "https://www.google.com/maps/" +
            (navigation ? "dir" : "search") +
            "/?api=1&" +
            dq +
            "=" +
            restaurant.lat +
            "," +
            restaurant.lon +
            "&" +
            dq +
            "_place_id=" +
            restaurant.google_maps_place_id
        );
    };

    $: collapsed ? radius.set(25, { delay: 250 }) : radius.set(0);
</script>

<div class="card" id={restaurant.posid} transition:slide>
    <button
        style={`border-radius: 25px 25px ${$radius}px ${$radius}px`}
        on:click={() => (collapsed = !collapsed)}
    >
        <h2>{restaurant.name}</h2>
        <h2>{restaurant.surcharge}€</h2>
    </button>
    {#if !collapsed}
        <div class="details" transition:slide>
            <div class="work_hours">
                {#each days as day}
                    <div class="day">
                        <p>{day}</p>
                        {#if day == "sob"}
                            <p>{restaurant.sat_str}</p>
                        {:else if day == "ned"}
                            <p>{restaurant.sun_str}</p>
                        {:else}
                            <p>{restaurant.week_str}</p>
                        {/if}
                    </div>
                {/each}
            </div>
            <div class="directions">
                <MapLocationIcon
                    href={mapsLink(restaurant)}
                    id={restaurant.posid}
                />
                <NavigationIcon
                    href={mapsLink(restaurant, true)}
                    id={restaurant.posid}
                />
            </div>
        </div>
    {/if}
</div>

<style>
    button {
        display: flex;
        margin: auto;
        margin-top: 10px;
        padding: 1.5rem;
        justify-content: space-between;
        align-items: center;
        width: 90vw;
        height: 50px;
        border-radius: 25px;
        border: none;
        font-size: 13px;
        font-weight: 500;
        text-align: left;
        color: #545454;
        cursor: pointer;
        background-color: #f1f1f1;
        overflow: hidden;
        box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.1);
    }
    .details {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 0 0 25px 25px;
        background-color: #f5f5f5;
        width: 90vw;
        margin: auto;
        color: #545454;
        box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.1);
    }
    .work_hours {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 70vw;
        padding: 10px;
        color: #545454;
    }
    .day {
        color: #545454;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 40vw;
        height: 18px;
    }
    .directions {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        width: 50vw;
    }
</style>
