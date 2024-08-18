# Offline Map

This software allows you to render a map, add points and trajectories with notes, save them in the browser local storage or export them in csv.

![UI Preview](https://github.com/howerest/offline-map/raw/main/screenshot.png)

Map has 3 modes:

* `offline-mbtiles`: The default mode that uses the world .mbtiles map (offline)
* `offline-png`: an alternative offline map using atlas exported ing .png files locally in 'public' folder. (offline)
* `online`: The online version which uses the map by downloading the tiles as you need them (online)

### Current status
* [x] Be able to render the map offline or online
* [x] Be able to add single points to the map
* [x] Be able to add a trajectory with multiple points
* [x] Be able to save the points and trajectories in the local storage
* [x] Be able to reset the state of points and trajectories
* [ ] Be able to add a note to a single point
* [ ] Be able to select a point
* [ ] Be able to remove a point
* [ ] Be able to select a trajectory
* [ ] Be able to remove a trajectory
* [ ] Be able to select a point in a trajectory
* [x] Be able to set a name for a trajectory
* [x] Be able to set a name for a single point
* [x] Be able to export points and trajectories in json format
* [x] Be able to import points and trajectories in json format


## How to use it offline (offline-mbtiles)

### Full world map download
* Download your worldmap .mbtiles file from `https://data.maptiler.com/downloads/planet`

### Start map server (Docker)
* `docker run --rm -it -v $(pwd):/data -p 8080:8080 maptiler/tileserver-gl --file your-maptiler-osm-planet.mbtiles`

### Start the map UI
* `npm install`
* `npm run start`

### Alternative way to download world map (very slow) for `offline-png` option

* Download `https://sourceforge.net/projects/mobac/`
* Open a map, select a region. Select the zoom layers to be exported
* Add layer
* Click "Create atlas"
* Put your atlas in `public/atlas` folder