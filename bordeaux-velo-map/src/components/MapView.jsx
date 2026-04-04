import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fix default marker icon issue in Leaflet + bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const flagIcon = L.divIcon({
  html: '<div style="font-size:20px;line-height:1">🚩</div>',
  className: '',
  iconSize: [20, 20],
  iconAnchor: [4, 20],
})

const COLORS = {
  'bordeaux-metropole': '#3b82f6',
  'communaute': '#22c55e',
}

const COLORS_BRIGHT = {
  'bordeaux-metropole': '#60a5fa',
  'communaute': '#4ade80',
}

async function fetchAndParseGpx(gpxUrl) {
  try {
    const response = await fetch(gpxUrl);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'application/xml');

    // Try with namespace
    const ns = 'http://www.topografix.com/GPX/1/1';
    let trkpts = Array.from(doc.getElementsByTagNameNS(ns, 'trkpt'));

    // Fallback without namespace
    if (trkpts.length === 0) {
      trkpts = Array.from(doc.getElementsByTagName('trkpt'));
    }

    let coords = trkpts.map(pt => [
      parseFloat(pt.getAttribute('lat')),
      parseFloat(pt.getAttribute('lon'))
    ]);

    // Simplify: keep 1 out of every 3 points if more than 150 points
    if (coords.length > 150) {
      coords = coords.filter((_, i) => i % 3 === 0);
    }

    return coords;
  } catch (e) {
    console.error('GPX load error:', gpxUrl, e);
    return null;
  }
}

function FitBounds({ circuit, gpxCoords }) {
  const map = useMap()
  useEffect(() => {
    if (circuit) {
      const positions = gpxCoords.has(circuit.id)
        ? gpxCoords.get(circuit.id)
        : circuit.waypoints
      if (positions && positions.length > 0) {
        const bounds = L.latLngBounds(positions)
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 })
      }
    }
  }, [circuit, gpxCoords, map])
  return null
}

function CircuitLine({ circuit, isSelected, isHovered, onSelect, gpxCoords }) {
  const color = isSelected
    ? COLORS_BRIGHT[circuit.source]
    : COLORS[circuit.source]

  const weight = isSelected ? 5 : isHovered ? 4 : 3
  const opacity = isSelected ? 1 : isHovered ? 0.9 : 0.7

  const positions = gpxCoords.has(circuit.id)
    ? gpxCoords.get(circuit.id)
    : circuit.waypoints

  if (!positions || positions.length === 0) return null

  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{ color, weight, opacity }}
        eventHandlers={{ click: () => onSelect(circuit.id) }}
      >
        <Tooltip sticky>
          <div className="text-xs">
            <strong>{circuit.name}</strong>
            <br />
            {circuit.distance} | {circuit.duree}
          </div>
        </Tooltip>
      </Polyline>
      {(isSelected || isHovered) && (
        <Marker position={positions[0]} icon={flagIcon} />
      )}
    </>
  )
}

export default function MapView({ circuits, selectedId, hoveredId, onSelect }) {
  const selectedCircuit = circuits.find((c) => c.id === selectedId) || null
  const [gpxCoords, setGpxCoords] = useState(new Map())

  useEffect(() => {
    const loadGpx = async () => {
      const map = new Map();
      for (const circuit of circuits) {
        if (circuit.gpxFile) {
          const coords = await fetchAndParseGpx(circuit.gpxFile);
          if (coords && coords.length > 0) {
            map.set(circuit.id, coords);
          }
        }
      }
      setGpxCoords(map);
    };
    loadGpx();
  }, []);

  return (
    <MapContainer
      center={[44.8378, -0.5706]}
      zoom={10}
      className="h-full w-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds circuit={selectedCircuit} gpxCoords={gpxCoords} />
      {circuits.map((c) => (
        <CircuitLine
          key={c.id}
          circuit={c}
          isSelected={selectedId === c.id}
          isHovered={hoveredId === c.id}
          onSelect={onSelect}
          gpxCoords={gpxCoords}
        />
      ))}
    </MapContainer>
  )
}
