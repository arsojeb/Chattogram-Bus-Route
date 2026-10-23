# CTG Bus Route

A responsive React + Vite prototype for exploring Chattogram bus routes using:
- Leaflet + OpenStreetMap map view
- Simplified animated route diagrams
- Search by bus number, route type, or location
- Filters for large bus, mini bus, Ranger, and AC services
- Explicit warnings that route geometry is not verified

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Important data accuracy notes

The stop sequence data is based on the list supplied for this project. The coordinates in `src/main.jsx` are rough illustrative anchors. Connecting these points with a Leaflet polyline draws straight segments, **not the actual road path**. Do not publish those lines as verified bus routes.

To show real roads:
1. Verify each route with local knowledge, field checks, or reliable official sources.
2. Trace the route along roads using OpenStreetMap tools or a GIS editor.
3. Store the verified road geometry as GeoJSON (one LineString or MultiLineString per route).
4. Render that geometry with `Polyline` and keep stop names/coordinates as separate data.
5. Label routes with source and last-verified date.

OSRM or another routing engine can propose road-following paths between stops, but it may select roads a bus does not use. Treat generated paths as candidates until verified.

## OpenStreetMap

The map uses the standard OpenStreetMap tile service. Follow its tile usage policy for production traffic and show attribution. For high traffic, consider a provider with suitable service terms.

## Suggested next improvement

Move the route definitions into `src/data/routes.js` and create a verified GeoJSON file per route. The current prototype intentionally does not show fares, schedules, live bus locations, or travel-time estimates.
