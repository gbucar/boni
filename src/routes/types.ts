export type RestaurantData = {
    name: string;
    surcharge: number;
    posid: string;
    lat: number;
    lon: number;
    google_maps_place_id: string;
    week_from: number;
    week_to: number;
    sat_from: number;
    sat_to: number;
    sun_from: number;
    sun_to: number;
    week_str: string;
    sat_str: string;
    sun_str: string;
    isOpen: boolean;
}
