import EditIcon from '@material-ui/icons/Edit';

import styles from '../styles/Maps.module.css';

import { useEffect, useState } from 'react';

const defaultColors = [
  '#ffffff', '#eeeeee', '#dddddd', '#cccccc',
  '#bbbbbb', '#aaaaaa', '#999999', '#888888',
  '#777777', '#666666', '#555555', '#444444',
  '#333333', '#222222', '#111111', '#000000'
];
const defaultTiles = Array(16).fill(Array(16).fill(0));
const defaultMaps = Array(16).fill(Array(16).fill(0));

let tileCanvas, tileCtx;
let mapCanvas, mapCtx;

const tileGrid = 32;
const tileGridSize = 4;
const tileSize = tileGrid * tileGridSize;

const mapGrid = 32;
const mapGridSize = 4;
const mapSize = mapGrid * mapGridSize;

const pixelGrid = Math.floor(mapGrid / tileGridSize);

export default function Maps() {
  const [colors, setColors] = useState(defaultColors);
  const [currColor, setCurrColor] = useState(0);
  const [tiles, setTiles] = useState(defaultTiles);
  const [currTile, setCurrTile] = useState(0);
  const [maps, setMaps] = useState(defaultMaps);
  const [currMap, setCurrMap] = useState(0);

  // draws current tile
  function drawTile() {
    // get current tile
    const tile = tiles[currTile];
    // for each pixel
    for (let y = 0; y < tileGridSize; y++) {
      for (let x = 0; x < tileGridSize; x++) {
        // draw color
        const colorIndex = y * tileGridSize + x;
        const color = colors[tile[colorIndex]];
        tileCtx.fillStyle = color;
        tileCtx.fillRect(x * tileGrid, y * tileGrid, tileGrid, tileGrid);
      }
    }
  }

  // draws current map
  function drawMap() {
    // get current map
    const map = maps[currMap];
    // for each tile
    for (let y = 0; y < mapGridSize; y++) {
      for (let x = 0; x < mapGridSize; x++) {
        // get tile
        const tileIndex = y * mapGridSize + x;
        const tile = tiles[map[tileIndex]];
        // for each pixel
        for (let yp = 0; yp < tileGridSize; yp++) {
          for (let xp = 0; xp < tileGridSize; xp++) {
            // draw color
            const colorIndex = yp * tileGridSize + xp;
            const color = colors[tile[colorIndex]];
            mapCtx.fillStyle = color;
            const xm = x * mapGrid + xp * pixelGrid;
            const ym = y * mapGrid + yp * pixelGrid;
            mapCtx.fillRect(xm, ym, pixelGrid, pixelGrid);
          }
        }
      }
    }
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
  }, [colors, tiles, currTile]);

  // draw map when colors, tiles, or maps change
  useEffect(() => {
    drawMap();
  }, [colors, tiles, maps, currMap]);

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
        className={styles.canvas}
        width={tileSize}
        height={tileSize}
        onMouseDown={e => {
          // get x and y on canvas
          const currX = e.clientX - tileCanvas.offsetLeft + window.scrollX;
          const currY = e.clientY - tileCanvas.offsetTop + window.scrollY;
          // get x and y in tile units
          const tileX = Math.floor(currX / tileGrid);
          const tileY = Math.floor(currY / tileGrid);
          // set tile at index
          const tileIndex = tileY * tileGridSize + tileX;
          const newTiles = tiles.slice();
          const newTile = newTiles[currTile].slice();
          newTile.splice(tileIndex, 1, currColor);
          newTiles.splice(currTile, 1, newTile);
          setTiles(newTiles);
        }}
      />
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
        className={styles.canvas}
        width={mapSize}
        height={mapSize}
        onMouseDown={e => {
          // get x and y on canvas
          const currX = e.clientX - mapCanvas.offsetLeft + window.scrollX;
          const currY = e.clientY - mapCanvas.offsetTop + window.scrollY;
          // get x and y in map units
          const tileX = Math.floor(currX / mapGrid);
          const tileY = Math.floor(currY / mapGrid);
          // set map at index
          const mapIndex = tileY * mapGridSize + tileX;
          const newMaps = maps.slice();
          const newMap = newMaps[currMap].slice();
          newMap.splice(mapIndex, 1, currTile);
          newMaps.splice(currMap, 1, newMap);
          setMaps(newMaps);
        }}
      />
    </div>
  );
}
