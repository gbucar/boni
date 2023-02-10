import { writable } from 'svelte/store';
import type { RestaurantData } from '../../routes/types';

const defaultJustOpen: boolean = true;

export const filter = (restaurant: RestaurantData, justOpen: boolean) => {
    return restaurant.isOpen || !justOpen;
}

export const justOpen = writable(defaultJustOpen);
