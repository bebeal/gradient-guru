'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FactorioBoundingBox, MapshotManifest, MapshotSurfaceManifest } from '@/utils/mapshot';
import L from 'leaflet';
import { LayersControl, MapContainer, LayerGroup, Marker, Popup, Tooltip, useMapEvents, useMap, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export interface MapshotViewerProps {
  mapshot: string;
  manifest: MapshotManifest;
}

const MapshotViewer: React.FC<MapshotViewerProps> = ({ mapshot, manifest }) => {
  const [currentSurface, setCurrentSurface] = useState<MapshotSurfaceManifest>(manifest.surfaces[0]);

  const worldToLatLng = useCallback((x: number, y: number) => {
    const ratio = currentSurface.render_size / currentSurface.tile_size;
    return L.latLng(-y * ratio, x * ratio);
  }, [currentSurface]);

  const midPointToLatLng = (bbox: FactorioBoundingBox) => {
    return worldToLatLng(
      (bbox.left_top.x + bbox.right_bottom.x) / 2,
      (bbox.left_top.y + bbox.right_bottom.y) / 2
    );
  };

  const latLngToWorld = (lat: number, lng: number) => {
    const ratio = currentSurface.render_size / currentSurface.tile_size;
    return { x: lng / ratio, y: -lat / ratio };
  };

  const MapEventHandler = () => {
    const map = useMap();

    useMapEvents({
      moveend: () => {
        const center = map.getCenter();
        const zoom = map.getZoom();
        const world = latLngToWorld(center.lat, center.lng);
        const params = new URLSearchParams(window.location.search);
        params.set('x', world.x.toFixed(2));
        params.set('y', world.y.toFixed(2));
        params.set('z', zoom.toFixed(2));
        params.set('s', encodeURIComponent(currentSurface.surface_name));
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
      },
      baselayerchange: (e: L.LayersControlEvent) => {
        const newSurface = manifest.surfaces.find(s => s.surface_name === e.name);
        if (newSurface) {
          setCurrentSurface(newSurface);
          const params = new URLSearchParams(window.location.search);
          params.set('s', encodeURIComponent(newSurface.surface_name));
          window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        }
      },
    });

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const x = parseFloat(params.get('x') || '0');
      const y = parseFloat(params.get('y') || '0');
      const z = parseFloat(params.get('z') || '0');
      const s = params.get('s');

      const center = worldToLatLng(x, y);
      map.setView(center, z);

      if (s) {
        const surface = manifest.surfaces.find(surface => surface.surface_name === decodeURIComponent(s));
        if (surface) {
          setCurrentSurface(surface);
        }
      }
    }, []);

    return null;
  };
  const baseLayers = useMemo(() => (
    manifest.surfaces.map((surface) => (
      <LayersControl.BaseLayer
        key={surface.surface_name}
        name={surface.surface_name}
        checked={surface === currentSurface}
      >
        <TileLayer
          // calls server side api which fetches from s3
          url={`/api/mapshot-tile?mapshot=${mapshot}&prefix=${surface.file_prefix}&z={z}&x={x}&y={y}`}
          tileSize={surface.render_size}
          bounds={L.latLngBounds(
            worldToLatLng(surface.world_min.x, surface.world_min.y),
            worldToLatLng(surface.world_max.x, surface.world_max.y)
          )}
          noWrap={true}
          maxNativeZoom={surface.zoom_max}
          minNativeZoom={surface.zoom_min}
          minZoom={surface.zoom_min - 4}
          maxZoom={surface.zoom_max + 4}
        />
      </LayersControl.BaseLayer>
    ))
  ), [manifest.surfaces, currentSurface, mapshot, worldToLatLng]);

  return (
    <div className="flex-grow relative w-full h-full">
        <div className="absolute inset-0">
      <MapContainer
        center={[0, 0]}
        zoom={0}
        zoomSnap={0.5}
        zoomDelta={1.5}
        scrollWheelZoom={true}
        crs={L.CRS.Simple}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      >
        <MapEventHandler />
        <LayersControl position="topright">
          {baseLayers}
          {currentSurface.stations && (
            <LayersControl.Overlay name="Train stations">
              <LayerGroup>
                {currentSurface.stations.map((station, index) => (
                  <Marker
                    key={index}
                    position={midPointToLatLng(station.bounding_box)}
                    title={station.backer_name}
                  >
                    <Tooltip permanent>{station.backer_name}</Tooltip>
                  </Marker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
          )}
          {currentSurface.tags && (
           <LayersControl.Overlay name="Tags">
              <LayerGroup>
                {currentSurface.tags.map((tag, index) => (
                  <Marker
                    key={index}
                    position={worldToLatLng(tag.position.x, tag.position.y)}
                    title={`${tag.force_name}: ${tag.text}`}
                  >
                    <Tooltip permanent>{tag.text}</Tooltip>
                  </Marker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
          )}
          <LayersControl.Overlay name="Debug">
           <LayerGroup>
              <Marker position={[0, 0]} title="Start">
                <Popup>Starting point</Popup>
              </Marker>
              {currentSurface.players && (
                currentSurface.players.map((player, index) => (
                  <Marker
                    key={index}
                    position={worldToLatLng(player.position.x, player.position.y)}
                    title={player.name}
                  >
                    <Tooltip permanent>{player.name}</Tooltip>
                  </Marker>
                ))
              )}
              {currentSurface.player && (
                <Marker
                  position={worldToLatLng(currentSurface.player.x, currentSurface.player.y)}
                  title="Player"
                >
                  <Popup>Player</Popup>
                </Marker>
              )}
              {[
                [currentSurface.world_min.x, currentSurface.world_min.y],
                [currentSurface.world_min.x, currentSurface.world_max.y],
                [currentSurface.world_max.x, currentSurface.world_min.y],
                [currentSurface.world_max.x, currentSurface.world_max.y],
              ].map(([x, y], index) => (
                <Marker
                  key={`corner-${index}`}
                  position={worldToLatLng(x, y)}
                  title={`${x}, ${y}`}
                />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
      </div>
      </div>
  );
};

export default MapshotViewer;
