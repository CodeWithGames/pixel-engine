import styles from '../styles/Game.module.css';

const canvasPixels = 256;

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
    const clear = () => _ctx.clearRect(0, 0, ${canvasPixels}, ${canvasPixels});
    const fill = color => {
      _ctx.fillStyle = color;
      _ctx.fillRect(0, 0, ${canvasPixels}, ${canvasPixels});
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

  return (
    <div>
      <iframe
        title="game"
        sandbox="allow-scripts"
        srcDoc={srcDoc}
        width={canvasPixels}
        height={canvasPixels}
        frameBorder="0"
      />
    </div>
  );
}
