import { supabase } from "$lib/supabaseClient";
import type { RestaurantData } from "./types";

const timeStr = (time: number) => (Math.floor(time / 60) || "00") + ":" + ((time % 60) || "00");
const fromToTimeString = (from: number, to: number) => timeStr(from) + " - " + timeStr(to) === "00:00 - 00:00" ? "Zaprto" : timeStr(from) + " - " + timeStr(to);

export const load = async () => {

    let { data, error } = await supabase
        .from('Restaurants')
        .select("*")
        .eq("city", "LJUBLJANA")
        .order("surcharge")

    return {
        restaurants: data?.map((restaurant: RestaurantData) => {
            const date = new Date;
            const currentDay = date.getDay();
            const currentTime = date.getHours() * 60 + new Date().getMinutes();
            let isOpen = false;
            switch (currentDay) {
                case 0:
                    isOpen = restaurant.sun_from < currentTime && restaurant.sun_to > currentTime;
                    break;
                case 6:
                    isOpen = restaurant.sat_from < currentTime && restaurant.sat_to > currentTime;
                    break;
                default:
                    isOpen = restaurant.week_from < currentTime && restaurant.week_to > currentTime;
                    break;
            }

            return {
                ...restaurant,
                week_str: fromToTimeString(restaurant.week_from, restaurant.week_to),
                sat_str: fromToTimeString(restaurant.sat_from, restaurant.sat_to),
                sun_str: fromToTimeString(restaurant.sun_from, restaurant.sun_to),
                name: restaurant.name.length > 20 ? restaurant.name.substring(0, 20) + "..." : restaurant.name,
                isOpen: isOpen
            }
        })
    }
}
