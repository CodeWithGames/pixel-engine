import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';

import { useEffect, useState } from 'react';
import { palettes } from '../data/palettes.js';

import styles from '../styles/Maps.module.css';

const gridColor = '#dddddd';

let tileCanvas, tileCtx;
let mapCanvas, mapCtx;

const tileCount = 16;
const mapCount = 16;

const tilePixels = 128;
const mapPixels = 256;

let sketchingTile = false;
let sketchingMap = false;

export default function Maps(props) {
  const { tileSize, mapSize } = props;
  const tileGridPixels = Math.floor(tilePixels / tileSize);
  const mapGridPixels = Math.floor(mapPixels / mapSize);
  const pixelPixels = Math.floor(mapGridPixels / tileSize);

  const defaultTiles = Array(tileCount).fill(Array(tileSize ** 2).fill(0));
  const defaultMaps = Array(mapCount).fill(Array(mapSize ** 2).fill(0));

  const [colors, setColors] = useState(palettes[0].colors);
  const [currColor, setCurrColor] = useState(0);
  const [tiles, setTiles] = useState(defaultTiles);
  const [currTile, setCurrTile] = useState(0);
  const [maps, setMaps] = useState(defaultMaps);
  const [currMap, setCurrMap] = useState(0);

  const [tileGridded, setTileGridded] = useState(true);
  const [mapGridded, setMapGridded] = useState(true);

  const [palette, setPalette] = useState(0);

  // draws current tile
  function drawTile() {
    // clear canvas
    tileCtx.fillStyle = gridColor;
    tileCtx.fillRect(0, 0, tilePixels, tilePixels);
    // get current tile
    const tile = tiles[currTile];
    // for each pixel
    for (let y = 0; y < tileSize; y++) {
      for (let x = 0; x < tileSize; x++) {
        // set fill color
        const colorIndex = y * tileSize + x;
        const color = colors[tile[colorIndex]];
        tileCtx.fillStyle = color;
        // set fill position and size
        const xm = x * tileGridPixels;
        const ym = y * tileGridPixels;
        const xs = tileGridPixels;
        const ys = tileGridPixels;
        // if tile gridded, adjust fill
        if (tileGridded) {
          xm += 1;
          ym += 1;
          xs -= 2;
          ys -= 2;
        }
        // fill tile
        tileCtx.fillRect(xm, ym, xs, ys);
      }
    }
  }

  // draws current map
  function drawMap() {
    // clear canvas
    mapCtx.fillStyle = gridColor;
    mapCtx.fillRect(0, 0, mapPixels, mapPixels);
    // get current map
    const map = maps[currMap];
    // for each tile
    for (let y = 0; y < mapSize; y++) {
      for (let x = 0; x < mapSize; x++) {
        // get tile
        const tileIndex = y * mapSize + x;
        const tile = tiles[map[tileIndex]];
        // for each pixel
        for (let yp = 0; yp < tileSize; yp++) {
          for (let xp = 0; xp < tileSize; xp++) {
            // set fill color
            const colorIndex = yp * tileSize + xp;
            const color = colors[tile[colorIndex]];
            mapCtx.fillStyle = color;
            // get fill position and size
            let xm = x * mapGridPixels + xp * pixelPixels;
            let ym = y * mapGridPixels + yp * pixelPixels;
            let xs = pixelPixels;
            let ys = pixelPixels;
            // if map gridded, adjust fill
            if (mapGridded) {
              if (xp === 0) { xm += 1; xs -= 1; }
              if (yp === 0) { ym += 1; ys -= 1; }
              if (xp === tileSize - 1) xs -= 1;
              if (yp === tileSize - 1) ys -= 1;
            }
            // fill pixel
            mapCtx.fillRect(xm, ym, xs, ys);
          }
        }
      }
    }
  }

  // sketches tile with given mouse event data
  function sketchTile(e) {
    // get x and y on canvas
    const currX = e.clientX - tileCanvas.offsetLeft + window.scrollX;
    const currY = e.clientY - tileCanvas.offsetTop + window.scrollY;
    // get x and y in tile units
    const tileX = Math.floor(currX / tileGridPixels);
    const tileY = Math.floor(currY / tileGridPixels);
    // get tile
    const tileIndex = tileY * tileSize + tileX;
    const newTiles = tiles.slice();
    const newTile = newTiles[currTile].slice();
    // return if unchanged
    if (newTile[tileIndex] === currColor) return;
    // set tile
    newTile.splice(tileIndex, 1, currColor);
    newTiles.splice(currTile, 1, newTile);
    setTiles(newTiles);
  }

  // sketches map with given mouse event data
  function sketchMap(e) {
    // get x and y on canvas
    const currX = e.clientX - mapCanvas.offsetLeft + window.scrollX;
    const currY = e.clientY - mapCanvas.offsetTop + window.scrollY;
    // get x and y in map units
    const tileX = Math.floor(currX / mapGridPixels);
    const tileY = Math.floor(currY / mapGridPixels);
    // get map
    const mapIndex = tileY * mapSize + tileX;
    const newMaps = maps.slice();
    const newMap = newMaps[currMap].slice();
    // return if unchanged
    if (newMap[mapIndex] === currTile) return;
    // set map
    newMap.splice(mapIndex, 1, currTile);
    newMaps.splice(currMap, 1, newMap);
    setMaps(newMaps);
  }

  // get canvas contexts on start
  useEffect(() => {
    tileCanvas = document.getElementById('canvas-tile');
    tileCtx = tileCanvas.getContext('2d');
    mapCanvas = document.getElementById('canvas-map');
    mapCtx = mapCanvas.getContext('2d');
  }, []);

  // draw tile when colors or tiles change
  useEffect(() => {
    drawTile();
  }, [colors, tiles, currTile, tileGridded]);

  // draw map when colors, tiles, or maps change
  useEffect(() => {
    drawMap();
  }, [colors, tiles, maps, currMap, mapGridded]);

  // update props
  useEffect(() => props.setColors(colors), [colors]);
  useEffect(() => props.setTiles(tiles), [tiles]);
  useEffect(() => props.setMaps(maps), [maps]);

  return (
    <div className={styles.container}>
      <div>
        <h1>Colors</h1>
        <div className={styles.tilegrid}>
          {
            colors.map((color, i) =>
              <div
                onClick={() => setCurrColor(i)}
                className={
                  currColor === i ?
                  `${styles.tile} ${styles.selected}` :
                  styles.tile
                }
                key={`${i}`}
                style={{ background: color }}
              >
              </div>
            )
          }
        </div>
        <input
          type="color"
          value={colors[currColor]}
          className={styles.colorinput}
          onChange={e => {
            const newColors = colors.slice();
            newColors.splice(currColor, 1, e.target.value);
            setColors(newColors);
          }}
        />
        <select
          value={palette}
          onChange={e => {
            const val = e.target.value;
            setPalette(val);
            setColors(palettes[val].colors);
          }}
        >
          {
            palettes.map((pal, i) =>
              <option value={i} key={i}>{pal.name}</option>
            )
          }
        </select>
      </div>
      <div>
        <h1>Tiles</h1>
        <div className={styles.tilegrid}>
          {
            tiles.map((tile, i) =>
              <div
                onClick={() => setCurrTile(i)}
                className={
                  currTile === i ?
                  `${styles.tile} ${styles.selected}` :
                  styles.tile
                }
                key={`${i}`}
                style={{ background: colors[tiles[i][0]] }}
              >
              </div>
            )
          }
        </div>
        <canvas
          id="canvas-tile"
          className={
            tileGridded ? `${styles.canvas} ${styles.gridded}` : styles.canvas
          }
          width={tilePixels}
          height={tilePixels}
          onMouseDown={e => { sketchingTile = true; sketchTile(e); }}
          onMouseMove={e => { if (sketchingTile) sketchTile(e); }}
          onMouseUp={e => { sketchingTile = false; }}
          onMouseLeave={e => { sketchingTile = false; }}
        />
        <div className={styles.options}>
          <label htmlFor="input-tilegridded">Grid</label>
          <Checkbox
            id="input-tilegridded"
            color="default"
            checked={tileGridded}
            onChange={e => setTileGridded(e.target.checked)}
          />
        </div>
      </div>
      <div>
        <h1>Maps</h1>
        <div className={styles.tilegrid}>
          {
            maps.map((map, i) =>
              <div
                onClick={() => setCurrMap(i)}
                className={
                  currMap === i ?
                  `${styles.tile} ${styles.selected}` :
                  styles.tile
                }
                key={`${i}`}
                style={{ background: colors[tiles[maps[i][0]][0]] }}
              >
              </div>
            )
          }
        </div>
        <canvas
          id="canvas-map"
          className={
            mapGridded ? `${styles.canvas} ${styles.gridded}` : styles.canvas
          }
          width={mapPixels}
          height={mapPixels}
          onMouseDown={e => { sketchingMap = true; sketchMap(e); }}
          onMouseMove={e => { if (sketchingMap) sketchMap(e); }}
          onMouseUp={e => { sketchingMap = false; }}
          onMouseLeave={e => { sketchingMap = false; }}
        />
        <div className={styles.options}>
          <label htmlFor="input-mapgridded">Grid</label>
          <Checkbox
            id="input-mapgridded"
            color="default"
            checked={mapGridded}
            onChange={e => setMapGridded(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}
