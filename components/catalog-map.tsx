'use client'

import { useCallback, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { formatPriceShort, type ResidentialComplex } from '@/lib/mock-data'

function pinHtml(complex: ResidentialComplex, selected: boolean): string {
  const price = formatPriceShort(complex.priceFrom).replace(' млн ₸', '').replace(' млн', '')
  const border = selected ? '#C8261E' : '#1F4FA8'
  const bg = selected ? '#1F4FA8' : '#FFFFFF'
  const fg = selected ? '#FFFFFF' : '#1F4FA8'
  return `
    <div style="display:flex;flex-direction:column;align-items:center;pointer-events:auto;">
      <div style="
        background:${bg};
        color:${fg};
        border:2px solid ${border};
        border-radius:9999px;
        padding:6px 10px;
        box-shadow:0 4px 16px rgba(11,14,22,0.18);
        font-size:11px;
        font-weight:700;
        font-family:system-ui,-apple-system,sans-serif;
        white-space:nowrap;
      ">${price} млн</div>
      <div style="
        width:0;height:0;
        border-left:7px solid transparent;
        border-right:7px solid transparent;
        border-top:9px solid ${border};
        margin-top:-1px;
      "></div>
    </div>
  `
}

function makeIcon(complex: ResidentialComplex, selected: boolean) {
  return L.divIcon({
    className: 'otau-leaflet-pin',
    html: pinHtml(complex, selected),
    iconSize: [88, 44],
    iconAnchor: [44, 44],
    popupAnchor: [0, -40],
  })
}

interface CatalogMapProps {
  complexes: ResidentialComplex[]
  selectedId: string | null
  onMarkerClick: (id: string) => void
}

export function CatalogMap({ complexes, selectedId, onMarkerClick }: CatalogMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())
  const onMarkerClickRef = useRef(onMarkerClick)
  onMarkerClickRef.current = onMarkerClick

  const syncMarkers = useCallback(() => {
    markersRef.current.forEach((marker, id) => {
      const complex = complexes.find((c) => c.id === id)
      if (!complex) return
      marker.setIcon(makeIcon(complex, selectedId === id))
    })
  }, [complexes, selectedId])

  useEffect(() => {
    const el = containerRef.current
    if (!el || mapRef.current) return

    const map = L.map(el, {
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true,
    })
    mapRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    const bounds = L.latLngBounds(
      complexes.map((c) => [c.coordinates.lat, c.coordinates.lng] as L.LatLngTuple),
    )
    map.fitBounds(bounds, { padding: [88, 88], maxZoom: 11, animate: false })

    complexes.forEach((complex) => {
      const marker = L.marker([complex.coordinates.lat, complex.coordinates.lng], {
        icon: makeIcon(complex, selectedId === complex.id),
      })
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e)
        onMarkerClickRef.current(complex.id)
      })
      marker.addTo(map)
      markersRef.current.set(complex.id, marker)
    })

    const t1 = window.setTimeout(() => map.invalidateSize(), 0)
    const t2 = window.setTimeout(() => map.invalidateSize(), 250)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      map.remove()
      mapRef.current = null
      markersRef.current.clear()
    }
    // complexes — stable list from mock-data; map must mount once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    syncMarkers()
  }, [syncMarkers])

  useEffect(() => {
    const map = mapRef.current
    const el = containerRef.current
    if (!map || !el) return
    const root = el.parentElement
    if (!root) return
    const ro = new ResizeObserver(() => {
      map.invalidateSize({ animate: false })
    })
    ro.observe(root)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="relative h-full min-h-[200px] w-full overflow-hidden rounded-2xl border border-otau-neutral-200/80 bg-otau-neutral-100 shadow-inner">
      <div ref={containerRef} className="catalog-map-leaflet absolute inset-0 z-0" />

      {/* Region label — Shymkent focus, includes nearby region for all pins */}
      <div className="pointer-events-none absolute left-3 top-3 z-[500] max-w-[70%] rounded-xl border border-white/60 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-md">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-otau-neutral-500">
          Казахстан
        </p>
        <p className="text-sm font-bold text-otau-neutral-900">Шымкент и область</p>
      </div>
    </div>
  )
}
