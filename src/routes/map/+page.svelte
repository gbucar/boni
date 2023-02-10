<script lang="ts">
    import { Map, NavigationControl, Marker, Popup } from "maplibre-gl";
    import { onMount } from "svelte";
    import "maplibre-gl/dist/maplibre-gl.css";
    import { PUBLIC_MAPTILER_API_KEY } from "$env/static/public";
    import type { RestaurantData } from "../types";
    import { filter, justOpen } from "$lib/stores/filter";

    export let curLocation = {
        lon: 14.510421716630992,
        lat: 46.05795751211096,
    };

    export let data: { restaurants: RestaurantData[] };
    let map: Map;

    onMount(() => {
        map = new Map({
            container: "map",
            style: `https://api.maptiler.com/maps/4ca8c369-155e-4009-b3b0-ea014ca4e506/style.json?key=${PUBLIC_MAPTILER_API_KEY}`,
            center: curLocation,
            zoom: 13,
        });

        map.addControl(new NavigationControl(), "bottom-right");
        data.restaurants
            .sort((a, b) => b.surcharge - a.surcharge)
            .filter((a) => filter(a, $justOpen))
            .forEach((element) => {
                let color = `hsl(${(120 * (5.5 - element.surcharge)) / 5.5}, ${
                    (100 * (5.5 - element.surcharge)) / 5.5
                }%, 50%)`;
                let mar = new Marker({ color: color })
                    .setLngLat([element.lon, element.lat])
                    .addTo(map)
                    .setPopup(
                        new Popup().setHTML(`
              <a class="popup-link" href="/#${element.posid}"><h3>${element.name}</h3></a>
              <p>Doplačilo: <b>${element.surcharge} €</b></p>
              <p>Odprto do: <b>${element.closes_at_string}</b></p>
            `)
                    );
            });
    });
</script>

<div class="map-wrap">
    <div id="map" />
</div>

<style>
    .map-wrap {
        width: 100%;
        height: 100%;
    }

    #map {
        height: 100%;
        width: 100%;
        position: fixed;
        left: 0px;
        top: 0px;
    }
</style>
