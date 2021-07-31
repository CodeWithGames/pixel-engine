import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
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
  const { tileSize, mapSize } = props;
  const mapGridPixels = Math.floor(canvasPixels / mapSize);
  const tileGridPixels = Math.floor(mapGridPixels / tileSize);

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
    const rect = (x, y, w, h, color) => {
      _ctx.fillStyle = color;
      _ctx.fillRect(x, y, w, h);
    }
    // game loop
    let _lastTime = 0;
    const _gameLoop = time => {
      // calculate time delta
      const delta = time - _lastTime;
      _lastTime = time;
      // call update and draw
      if (typeof update === 'function') update(delta);
      if (typeof draw === 'function') draw();
      // continue loop
      requestAnimationFrame(_gameLoop);
    }
    // key listeners
    let _lastPressedKeys = {};
    const _pressedKeys = {};
    window.onkeydown = e => _pressedKeys[e.keyCode] = true;
    window.onkeyup = e => _pressedKeys[e.keyCode] = false;
    const isKeyDown = key => {
      // handle invalid key
      if (typeof key !== 'string' || key.length !== 1) {
        throw new Error(\`\${key} is an invalid key\`);
      }
      // handle key code
      const keyCode = key.toUpperCase().charCodeAt(0);
      return _pressedKeys[keyCode];
    }
    const isKey = key => {
      // handle invalid key
      if (typeof key !== 'string' || key.length !== 1) {
        throw new Error(\`\${key} is an invalid key\`);
      }
      // handle key code
      const keyCode = key.toUpperCase().charCodeAt(0);
      return _pressedKeys[keyCode] && !_lastPressedKeys[keyCode];
    }
    // map functions
    const _colors = ${JSON.stringify(props.colors)};
    const _tiles = ${JSON.stringify(props.tiles)};
    const _maps = ${JSON.stringify(props.maps)};
    const _mapSize = ${mapSize};
    const _tileSize = ${tileSize};
    const _mapGridPixels = ${mapGridPixels};
    const _tileGridPixels = ${tileGridPixels};
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
              let xm = x * _mapGridPixels + xp * _tileGridPixels;
              let ym = y * _mapGridPixels + yp * _tileGridPixels;
              // fill pixel
              _ctx.fillRect(xm, ym, _tileGridPixels, _tileGridPixels);
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
          const xm = x + xp * _tileGridPixels;
          const ym = y + yp * _tileGridPixels;
          _ctx.fillRect(xm, ym, _tileGridPixels, _tileGridPixels);
        }
      }
    }
    // runs after body has loaded
    const _start = () => {
      // get canvas and context
      _canvas = document.getElementById('canvas-game');
      _ctx = _canvas.getContext('2d');
      // run start function
      if (typeof start === 'function') start();
      // start game loop
      requestAnimationFrame(_gameLoop);
    }
    ${props.code}
  </script>
</html>
`;

  const [playing, setPlaying] = useState(false);
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
    <div>
      {
        playing ?
        <button onClick={stopPlaying}>
          <PauseIcon />
        </button> :
        <button onClick={startPlaying}>
          <PlayArrowIcon />
        </button>
      }
      <button onClick={downloadGame}>
        <GetAppIcon />
      </button>
      <iframe
        title="game"
        sandbox="allow-scripts"
        srcDoc={source}
        width={canvasPixels}
        height={canvasPixels}
        frameBorder="0"
      />
    </div>
  );
}
