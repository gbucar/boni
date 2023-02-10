<script>
    import { justOpen } from "$lib/stores/filter";
    import MapIcon from "$lib/icons/MapIcon.svelte";
    import BarsIcon from "$lib/icons/BarsIcon.svelte";
    import ClockIcon from "$lib/icons/ClockIcon.svelte";
    export let data;
</script>

<nav>
    <a class="nav_element" href="/"><BarsIcon /></a>
    <a class="nav_element" href="/map"><MapIcon /></a>
    <button
        style="fill:{$justOpen ? 'grey' : '#545454'}"
        class="nav_element"
        on:click={() => justOpen.set(!$justOpen)}><ClockIcon /></button
    >
</nav>

<slot />

<style>
    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: #545454;
    }
    button:focus {
        outline: none;
    }
    nav {
        display: flex;
        color: #545454;
        align-items: center;
        background-color: #f1f1f1;
        padding-left: 20px;
        height: 50px;
        width: 100vw;
        top: 0;
        left: 0;
        position: fixed;
        z-index: 1;
    }
    .nav_element {
        margin-right: 20px;
        fill: #545454;
        font-size: 20px;
        text-decoration: none;
        color: #000;
    }
</style>
