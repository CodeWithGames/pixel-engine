import EditIcon from '@material-ui/icons/Edit';

import styles from '../styles/Maps.module.css';

import { useEffect, useState } from 'react';

const gridColor = '#dddddd';

let tileCanvas, tileCtx;
let mapCanvas, mapCtx;

const tileCount = 16;
const mapCount = 16;

const tileGridPixels = 16;
const mapGridPixels = 32;

const defaultColors = [
  '#ffffff', '#aaaaaa', '#555555', '#000000',
  '#ff0000', '#00ff00', '#0000ff', '#ff9900',
  '#ffff00', '#ff00ff', '#00ffff', '#ff0099',
  '#990000', '#009900', '#000099', '#663333'
];

let sketchingTile = false;

export default function Maps(props) {
  const { tileSize, mapSize } = props;
  const tilePixels = tileGridPixels * tileSize;
  const mapPixels = mapGridPixels * mapSize;
  const pixelPixels = Math.floor(mapGridPixels / tileSize);

  const defaultTiles = Array(tileCount).fill(Array(tileSize ** 2).fill(0));
  const defaultMaps = Array(mapCount).fill(Array(mapSize ** 2).fill(0));

  const [colors, setColors] = useState(defaultColors);
  const [currColor, setCurrColor] = useState(0);
  const [tiles, setTiles] = useState(defaultTiles);
  const [currTile, setCurrTile] = useState(0);
  const [maps, setMaps] = useState(defaultMaps);
  const [currMap, setCurrMap] = useState(0);

  const [tileGridded, setTileGridded] = useState(true);
  const [mapGridded, setMapGridded] = useState(true);

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
        onChange={e => {
          const newColors = colors.slice();
          newColors.splice(currColor, 1, e.target.value);
          setColors(newColors);
        }}
      />
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
      <div>
        <label htmlFor="input-tilegridded">Grid</label>
        <input
          id="input-tilegridded"
          type="checkbox"
          checked={tileGridded}
          onChange={e => setTileGridded(e.target.checked)}
        />
      </div>
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
        onMouseDown={e => {
          // get x and y on canvas
          const currX = e.clientX - mapCanvas.offsetLeft + window.scrollX;
          const currY = e.clientY - mapCanvas.offsetTop + window.scrollY;
          // get x and y in map units
          const tileX = Math.floor(currX / mapGridPixels);
          const tileY = Math.floor(currY / mapGridPixels);
          // set map at index
          const mapIndex = tileY * mapSize + tileX;
          const newMaps = maps.slice();
          const newMap = newMaps[currMap].slice();
          newMap.splice(mapIndex, 1, currTile);
          newMaps.splice(currMap, 1, newMap);
          setMaps(newMaps);
        }}
      />
      <div>
        <label htmlFor="input-mapgridded">Grid</label>
        <input
          id="input-mapgridded"
          type="checkbox"
          checked={mapGridded}
          onChange={e => setMapGridded(e.target.checked)}
        />
      </div>
    </div>
  );
}
