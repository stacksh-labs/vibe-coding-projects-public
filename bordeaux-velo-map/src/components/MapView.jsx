import { useEffect, useRef } from 'react'
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

function FitBounds({ circuit }) {
  const map = useMap()
  useEffect(() => {
    if (circuit) {
      const bounds = L.latLngBounds(circuit.waypoints)
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 })
    }
  }, [circuit, map])
  return null
}

function CircuitLine({ circuit, isSelected, isHovered, onSelect }) {
  const color = isSelected
    ? COLORS_BRIGHT[circuit.source]
    : COLORS[circuit.source]

  const weight = isSelected ? 5 : isHovered ? 4 : 3
  const opacity = isSelected ? 1 : isHovered ? 0.9 : 0.7

  return (
    <>
      <Polyline
        positions={circuit.waypoints}
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
        <Marker position={circuit.waypoints[0]} icon={flagIcon} />
      )}
    </>
  )
}

export default function MapView({ circuits, selectedId, hoveredId, onSelect }) {
  const selectedCircuit = circuits.find((c) => c.id === selectedId) || null

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
      <FitBounds circuit={selectedCircuit} />
      {circuits.map((c) => (
        <CircuitLine
          key={c.id}
          circuit={c}
          isSelected={selectedId === c.id}
          isHovered={hoveredId === c.id}
          onSelect={onSelect}
        />
      ))}
    </MapContainer>
  )
}
