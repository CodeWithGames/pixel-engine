import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import GetAppIcon from '@material-ui/icons/GetApp';

import { useState } from 'react';

import styles from '../styles/Game.module.css';

const canvasPixels = 256;

const emptySrc =
`<html>
  <body></body>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #fff;
    }
  </style>
</html>
`;

export default function Game(props) {
  const {
    colors, tiles, maps, code,
    tileSize, mapSize, playing, setPlaying
  } = props;
  const tilePixels = Math.floor(canvasPixels / mapSize);
  const pixelPixels = Math.floor(tilePixels / tileSize);

  const srcDoc =
`<html>
  <body onload="_start()">
    <canvas
      id="canvas-game"
      width=${canvasPixels}
      height=${canvasPixels}
    />
  </body>
  <style>
    body {
      margin: 0;
      overflow: hidden;
    }
    #canvas-game {
      background: #fff;
    }
  </style>
  <script>
    // canvas functions
    let _canvas, _ctx;
    const _canvasPixels = ${canvasPixels};
    const clear = () => _ctx.clearRect(0, 0, _canvasPixels, _canvasPixels);
    const fill = color => {
      _ctx.fillStyle = color;
      _ctx.fillRect(0, 0, _canvasPixels, _canvasPixels);
    }
    const rect = (x, y, width, height, color) => {
      _ctx.fillStyle = color;
      _ctx.fillRect(x, y, width, height);
    }
    const objRect = obj => {
      const { x, y, width, height, color } = obj;
      rect(x, y, width, height, color);
    }
    // key listeners
    let _lastPressedKeys = {};
    const _pressedKeys = {};
    window.onkeydown = e => _pressedKeys[e.keyCode] = true;
    window.onkeyup = e => _pressedKeys[e.keyCode] = false;
    const isKeyDown = key => {
      // handle invalid key
      if (typeof key !== 'string' || key.length !== 1) return undefined;
      // handle key code
      const keyCode = key.toUpperCase().charCodeAt(0);
      return _pressedKeys[keyCode];
    }
    const isKey = key => {
      // handle invalid key
      if (typeof key !== 'string' || key.length !== 1) return undefined;
      // handle key code
      const keyCode = key.toUpperCase().charCodeAt(0);
      return _pressedKeys[keyCode] && !_lastPressedKeys[keyCode];
    }
    // map functions
    const _colors = ${JSON.stringify(colors)};
    const _tiles = ${JSON.stringify(tiles)};
    const _maps = ${JSON.stringify(maps)};
    const _mapSize = ${mapSize};
    const _tileSize = ${tileSize};
    const _tilePixels = ${tilePixels};
    const _pixelPixels = ${pixelPixels};
    const loadMap = index => {
      // get map
      const map = _maps[index];
      // for each tile
      for (let y = 0; y < _mapSize; y++) {
        for (let x = 0; x < _mapSize; x++) {
          // get tile
          const tileIndex = y * _mapSize + x;
          const tile = _tiles[map[tileIndex]];
          // for each pixel
          for (let yp = 0; yp < _tileSize; yp++) {
            for (let xp = 0; xp < _tileSize; xp++) {
              // set fill color
              const colorIndex = yp * _tileSize + xp;
              const color = _colors[tile[colorIndex]];
              _ctx.fillStyle = color;
              // get fill position and size
              let xm = x * _tilePixels + xp * _pixelPixels;
              let ym = y * _tilePixels + yp * _pixelPixels;
              // fill pixel
              _ctx.fillRect(xm, ym, _pixelPixels, _pixelPixels);
            }
          }
        }
      }
    };
    const loadTile = (x, y, index) => {
      // get tile
      const tile = _tiles[index];
      // for each pixel
      for (let yp = 0; yp < _tileSize; yp++) {
        for (let xp = 0; xp < _tileSize; xp++) {
          // set fill color
          const colorIndex = yp * _tileSize + xp;
          const color = _colors[tile[colorIndex]];
          _ctx.fillStyle = color;
          // fill pixel
          const xm = x + xp * _pixelPixels;
          const ym = y + yp * _pixelPixels;
          _ctx.fillRect(xm, ym, _pixelPixels, _pixelPixels);
        }
      }
    }
    // runs after body has loaded
    const _start = () => {
      // game loop
      let lastTime = 0;
      const gameLoop = time => {
        // calculate time delta
        const delta = time - lastTime;
        lastTime = time;
        // call update and draw
        if (typeof update === 'function') update(delta);
        if (typeof draw === 'function') draw();
        // continue loop
        requestAnimationFrame(gameLoop);
      }
      // get canvas and context
      _canvas = document.getElementById('canvas-game');
      _ctx = _canvas.getContext('2d');
      // run start function
      if (typeof start === 'function') start();
      // start game loop
      requestAnimationFrame(gameLoop);
    }
    ${code}
  </script>
</html>
`;

  const [source, setSource] = useState(emptySrc);

  // sets source doc
  function startPlaying() {
    setSource(srcDoc);
    setPlaying(true);
  }

  // clears source doc
  function stopPlaying() {
    setSource(emptySrc);
    setPlaying(false);
  }

  // downloads game as an html file
  function downloadGame() {
    const link = document.createElement('a');
    link.download = 'game.html';
    link.href = `data:text/html;charset=utf-8,${encodeURIComponent(srcDoc)}`;
    link.click();
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.toolbar}>
          <Button
            variant="contained"
            onClick={playing ? stopPlaying : startPlaying}
          >
            {playing ? <StopIcon /> : <PlayArrowIcon />}
          </Button>
          <Button variant="contained" onClick={downloadGame}>
            <GetAppIcon />
          </Button>
        </div>
        <iframe
          title="game"
          className={styles.frame}
          sandbox="allow-scripts"
          srcDoc={source}
          width={canvasPixels}
          height={canvasPixels}
          frameBorder="0"
        />
      </div>
    </div>
  );
}
