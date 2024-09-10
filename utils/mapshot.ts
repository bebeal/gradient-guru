export interface FactorioColor {
  a: number,
  r: number,
  g: number,
  b: number,
}

export interface FactorioPosition {
  x: number,
  y: number,
}

export interface FactorioBoundingBox {
  left_top: FactorioPosition,
  right_bottom: FactorioPosition,
}

export interface FactorioIcon {
  name: string,
  type: string,
}

export interface FactorioPlayer {
  name: string,
  position: FactorioPosition,
  color: FactorioColor,
}

export interface FactorioStation {
  backer_name: string,
  bounding_box: FactorioBoundingBox,
}

export interface FactorioTag {
  force_name: string,
  force_index: string,
  icon: FactorioIcon,
  tag_number: number,
  position: FactorioPosition,
  text: string,
}

export interface MapshotMetadata {
  name: string;
  description: string;
  preview: string;
}

export interface MapshotManifest {
  active_mods?: string[],
  game_version?: string,
  // A unique ID generated for this render.
  unique_id: string,
  // The name of the save - not reliable, as it can be customized.
  // This is mostly the subdir that was used.
  savename: string,
  // game.tick
  tick: number,
  // game.ticks_played
  ticks_played: number,
  // Seed of the map.
  seed: number,
  // Factorio map exchange string
  map_exchange?: string,
  // A short ID of the map, derived from map_exchange.
  map_id: string,
  // Rendering info per surface.
  surfaces: MapshotSurfaceManifest[];
}

// Information about a single exported rendered surface.
export interface MapshotSurfaceManifest {
  // The name of the game surface that was rendered.
  surface_name: string,
  // The in-game index of that surface.
  surface_idx: number,

  // Prefix for where to find the tile file.
  file_prefix: string,

  // Size of a tile in in-game units for the least detailed layer.
  tile_size: number,
  // Size of a tile, in pixels.
  render_size: number,
  // Area rendered.
  world_min: FactorioPosition,
  world_max: FactorioPosition,
  // Minimal available zoom level index (least detailed)
  zoom_min: number,
  // Maximal available zoom level index (most detailed)
  zoom_max: number,

  // Current position of the player.
  player?: FactorioPosition,
  // List of players.
  players?: FactorioPlayer[],
  // List of train stations.
  stations?: FactorioStation[],
  // List of map tags.
  tags?: FactorioTag[]
}
