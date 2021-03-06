import PaletteIcon from '@material-ui/icons/Palette';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useEffect, useState } from 'react';
import { palettes } from '../data/palettes.js';

import styles from '../styles/Maps.module.css';

const gridColor = '#dddddd';

let tileCanvas, tileCtx;
let mapCanvas, mapCtx;
let selectCanvas, selectCtx;

// tile units
const tilePixels = 128;

// select units
const selectBorder = 4;
const gridPixels = 32;

// map units
const mapPixels = 256;

let sketchingTile = false;
let sketchingMap = false;

export default function Maps(props) {
  const {
    colors, setColors,
    tiles, setTiles,
    maps, setMaps,
    tileSize, tileCount,
    mapSize, mapCount
  } = props;

  const tileRows = 4;
  const tileCols = Math.floor(tileCount / tileRows);
  const selectWidth = tileCols * gridPixels;
  const selectHeight = tileRows * gridPixels;
  const selectFullWidth = selectBorder * 2 + selectWidth;
  const selectFullHeight = selectBorder * 2 + selectHeight;

  const tileGridPixels = Math.floor(tilePixels / tileSize);
  const mapGridPixels = Math.floor(mapPixels / mapSize);
  const pixelPixels = Math.floor(mapGridPixels / tileSize);
  const gridPixelPixels = Math.floor(gridPixels / tileSize);

  const [currColor, setCurrColor] = useState(0);
  const [currTile, setCurrTile] = useState(0);
  const [currMap, setCurrMap] = useState(0);

  const [tileGridded, setTileGridded] = useState(true);
  const [mapGridded, setMapGridded] = useState(true);

  const [palette, setPalette] = useState(0);

  const [tab, setTab] = useState(0);

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
    // update select canvas
    drawSelect();
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
    // return if out of bounds
    if (
      currX < 0 || currX >= tilePixels || currY < 0 || currY >= tilePixels
    ) return;
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
    newTile[tileIndex] = currColor;
    newTiles[currTile] = newTile;
    setTiles(newTiles);
  }

  // sketches map with given mouse event data
  function sketchMap(e) {
    // get x and y on canvas
    const currX = e.clientX - mapCanvas.offsetLeft + window.scrollX;
    const currY = e.clientY - mapCanvas.offsetTop + window.scrollY;
    // return if out of bounds
    if (
      currX < 0 || currX >= mapPixels || currY < 0 || currY >= mapPixels
    ) return;
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
    newMap[mapIndex] = currTile;
    newMaps[currMap] = newMap;
    setMaps(newMaps);
  }

  // draws select canvas
  function drawSelect() {
    // draw outline
    selectCtx.fillStyle = '#000';
    selectCtx.fillRect(0, 0, selectFullWidth, selectFullHeight);
    // for each tile
    for (let x = 0; x < tileCols; x++) {
      for (let y = 0; y < tileRows; y++) {
        // get tile
        const tileIndex = y * tileCols + x;
        const tile = tiles[tileIndex];
        // for each pixel
        for (let xp = 0; xp < tileSize; xp++) {
          for (let yp = 0; yp < tileSize; yp++) {
            // set fill color
            const colorIndex = yp * tileSize + xp;
            const color = colors[tile[colorIndex]];
            selectCtx.fillStyle = color;
            // set fill position and size
            const xPos = x * gridPixels + xp * gridPixelPixels;
            const yPos = y * gridPixels + yp * gridPixelPixels;
            // fill sprite
            selectCtx.fillRect(
              xPos + selectBorder, yPos + selectBorder,
              gridPixelPixels, gridPixelPixels
            );
          }
        }
      }
    }
    // get outline coordinates
    const xo = currTile % tileCols;
    const yo = Math.floor(currTile / tileCols);
    // draw outer outline
    selectCtx.fillStyle = '#fff';
    const outLeft = xo * gridPixels;
    const outRight = outLeft + gridPixels + selectBorder;
    const outTop = yo * gridPixels;
    const outBottom = outTop + gridPixels + selectBorder;
    const outLength = selectBorder * 2 + gridPixels;
    selectCtx.fillRect(outLeft, outTop, outLength, selectBorder);
    selectCtx.fillRect(outLeft, outTop, selectBorder, outLength);
    selectCtx.fillRect(outLeft, outBottom, outLength, selectBorder);
    selectCtx.fillRect(outRight, outTop, selectBorder, outLength);
    // draw inner outline
    selectCtx.fillStyle = '#000';
    const inLeft = outLeft + selectBorder;
    const inRight = outLeft + gridPixels;
    const inTop = outTop + selectBorder;
    const inBottom = outTop + gridPixels;
    const inLength = gridPixels;
    selectCtx.fillRect(inLeft, inTop, inLength, selectBorder);
    selectCtx.fillRect(inLeft, inTop, selectBorder, inLength);
    selectCtx.fillRect(inLeft, inBottom, inLength, selectBorder);
    selectCtx.fillRect(inRight, inTop, selectBorder, inLength);
  }

  // selects sprite with given mouse event data
  function select(e) {
    // get x and y on canvas
    const currX = e.clientX - selectCanvas.offsetLeft + window.scrollX - selectBorder;
    const currY = e.clientY - selectCanvas.offsetTop + window.scrollY - selectBorder;
    // get x and y in grid units
    const gridX = Math.max(
      0, Math.min(Math.floor(currX / gridPixels), tileCols - 1)
    );
    const gridY = Math.max(
      0, Math.min(Math.floor(currY / gridPixels), tileRows - 1)
    );
    // select tile
    const tileIndex = gridY * tileCols + gridX;
    if (tileIndex === currTile) return;
    setCurrTile(tileIndex);
  }

  // get canvas contexts on start
  useEffect(() => {
    tileCanvas = document.getElementById('canvas-tile');
    tileCtx = tileCanvas.getContext('2d');
    mapCanvas = document.getElementById('canvas-map');
    mapCtx = mapCanvas.getContext('2d');
    selectCanvas = document.getElementById('canvas-select');
    selectCtx = selectCanvas.getContext('2d');
  }, []);

  // draw tile when colors or tiles change
  useEffect(() => {
    drawTile();
  }, [colors, tiles, currTile, tileGridded]);

  // draw map when colors, tiles, or maps change
  useEffect(() => {
    drawMap();
  }, [colors, tiles, maps, currMap, mapGridded]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.coloroptions}>
          <PaletteIcon />
          <Select
            className={styles.paletteinput}
            id="palette-select"
            value={palette}
            onChange={e => {
              const val = e.target.value;
              setPalette(val);
              setColors(palettes[val].colors);
            }}
          >
            {
              palettes.map((pal, i) =>
                <MenuItem value={i} key={i}>{pal.name}</MenuItem>
              )
            }
          </Select>
          <input
            type="color"
            value={colors[currColor]}
            className={styles.colorinput}
            onChange={e => {
              const newColors = colors.slice();
              newColors[currColor] = e.target.value;
              setColors(newColors);
            }}
          />
        </div>
        <div className={`${styles.grid} ${styles.colorgrid}`}>
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
        <div>
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
            <input
              id="input-tilegridded"
              type="checkbox"
              checked={tileGridded}
              onChange={e => setTileGridded(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={`${styles.grid} ${styles.mapgrid}`}>
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
        <div className={styles.map}>
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
            <input
              id="input-mapgridded"
              type="checkbox"
              checked={mapGridded}
              onChange={e => setMapGridded(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <canvas
        id="canvas-select"
        width={selectFullWidth}
        height={selectFullHeight}
        className={styles.selectcanvas}
        onMouseDown={select}
      />
    </div>
  );
}
