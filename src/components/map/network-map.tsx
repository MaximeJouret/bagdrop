"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  NETWORK_POINTS,
  BRUSSELS_CENTER,
  type NetworkPoint,
} from "@/data/network-points";

/** Custom cobalt circle pin for hotels — minimal, branded */
const hotelIcon = L.divIcon({
  className: "bagdrop-marker bagdrop-marker--hotel",
  html: `
    <div class="bagdrop-pin">
      <span class="bagdrop-pin__core"></span>
    </div>
  `,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -10],
});

/** Larger yellow halo pin for airports */
const airportIcon = L.divIcon({
  className: "bagdrop-marker bagdrop-marker--airport",
  html: `
    <div class="bagdrop-airport">
      <span class="bagdrop-airport__halo"></span>
      <span class="bagdrop-airport__core"></span>
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -16],
});

const hotels = NETWORK_POINTS.filter((p) => p.type === "hotel");
const airports = NETWORK_POINTS.filter((p) => p.type === "airport");

/** Generate a "all hotels → BRU" route visualization */
const routesToBRU: [number, number][][] = hotels.map((h) => [
  [h.lat, h.lng],
  [airports[0].lat, airports[0].lng],
]);

export function NetworkMap() {
  return (
    <MapContainer
      center={BRUSSELS_CENTER}
      zoom={12}
      scrollWheelZoom={false}
      zoomControl={false}
      className="h-full w-full"
      style={{ minHeight: "560px", background: "var(--brand-cream)" }}
    >
      {/* Carto Voyager — modern, minimalist, Apple-esque */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        subdomains={["a", "b", "c", "d"]}
      />
      {/* Labels layer on top — keeps map clean but readable */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
        subdomains={["a", "b", "c", "d"]}
        opacity={0.85}
      />

      <ZoomControl position="bottomright" />

      {/* Route lines: subtle dashed connections to BRU */}
      {routesToBRU.map((route, i) => (
        <Polyline
          key={`route-${i}`}
          positions={route}
          pathOptions={{
            color: "var(--brand-cobalt)",
            weight: 1.25,
            opacity: 0.25,
            dashArray: "4 6",
          }}
        />
      ))}

      {/* Hotel markers */}
      {hotels.map((point: NetworkPoint) => (
        <Marker
          key={point.id}
          position={[point.lat, point.lng]}
          icon={hotelIcon}
        >
          <Popup className="bagdrop-popup">
            <div className="font-sans">
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--brand-cobalt)] mb-1">
                Hôtel partenaire
              </p>
              <p className="font-semibold text-sm text-[var(--brand-ink)] m-0">
                {point.name}
              </p>
              {point.area && (
                <p className="text-xs text-muted-foreground m-0 mt-0.5">
                  {point.area}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Airport markers */}
      {airports.map((point: NetworkPoint) => (
        <Marker
          key={point.id}
          position={[point.lat, point.lng]}
          icon={airportIcon}
        >
          <Popup className="bagdrop-popup">
            <div className="font-sans">
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--brand-cobalt)] mb-1">
                Aéroport · {point.code}
              </p>
              <p className="font-semibold text-sm text-[var(--brand-ink)] m-0">
                {point.name}
              </p>
              {point.area && (
                <p className="text-xs text-muted-foreground m-0 mt-0.5">
                  {point.area}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
