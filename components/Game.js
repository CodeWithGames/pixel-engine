import styles from '../styles/Game.module.css';

const width = 256;
const height = 256;

export default function Game(props) {
  const srcDoc =
`<html>
  <body onload="_start()">
    <canvas
      id="canvas-game"
      width=${width}
      height=${height}
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
    let _canvas, _ctx;
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
    // runs after body has loaded
    function _start() {
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
        width={width}
        height={height}
        frameBorder="0"
      />
    </div>
  );
}
