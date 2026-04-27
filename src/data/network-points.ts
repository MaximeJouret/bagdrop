/**
 * Network of partner hotels + airports for the coverage map.
 * Hotels are placeholders for v0 — to be replaced with real partners.
 */

export type NetworkPoint = {
  id: string;
  type: "hotel" | "airport";
  name: string;
  area?: string;
  code?: string;
  lat: number;
  lng: number;
};

export const NETWORK_POINTS: NetworkPoint[] = [
  // Airports
  {
    id: "bru",
    type: "airport",
    name: "Brussels Airport",
    code: "BRU",
    area: "Zaventem",
    lat: 50.9010,
    lng: 4.4856,
  },
  {
    id: "crl",
    type: "airport",
    name: "Brussels South",
    code: "CRL",
    area: "Charleroi",
    lat: 50.4592,
    lng: 4.4534,
  },
  // Hotel partners (placeholders — premium areas of Brussels)
  {
    id: "h-metropole",
    type: "hotel",
    name: "Hôtel Métropole",
    area: "De Brouckère",
    lat: 50.8513,
    lng: 4.3539,
  },
  {
    id: "h-amigo",
    type: "hotel",
    name: "Hôtel Amigo",
    area: "Sablon",
    lat: 50.8467,
    lng: 4.3525,
  },
  {
    id: "h-steigenberger",
    type: "hotel",
    name: "Steigenberger Wiltcher's",
    area: "Louise",
    lat: 50.8336,
    lng: 4.3603,
  },
  {
    id: "h-thehotel",
    type: "hotel",
    name: "The Hotel Brussels",
    area: "Louise",
    lat: 50.8366,
    lng: 4.3573,
  },
  {
    id: "h-nh-sablon",
    type: "hotel",
    name: "NH Grand Sablon",
    area: "Sablon",
    lat: 50.8413,
    lng: 4.3565,
  },
  {
    id: "h-leplaza",
    type: "hotel",
    name: "Hôtel Le Plaza",
    area: "Centre",
    lat: 50.8542,
    lng: 4.3566,
  },
  {
    id: "h-sofitel",
    type: "hotel",
    name: "Sofitel Le Louise",
    area: "Louise",
    lat: 50.8367,
    lng: 4.3597,
  },
  {
    id: "h-radisson",
    type: "hotel",
    name: "Radisson Collection",
    area: "Quartier européen",
    lat: 50.8430,
    lng: 4.3700,
  },
  {
    id: "h-warwick",
    type: "hotel",
    name: "Warwick Brussels",
    area: "Centre",
    lat: 50.8488,
    lng: 4.3499,
  },
];

/** Brussels city center (used as default map center) */
export const BRUSSELS_CENTER: [number, number] = [50.8503, 4.3517];
