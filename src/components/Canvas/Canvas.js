import GetAppIcon from '@material-ui/icons/GetApp';

import styles from './Canvas.module.css';

const height = 256;
const width = 256;

export default function Canvas(props) {
  const srcDoc =
`<html>
  <body onload="startGame()">
    <canvas
      id="canvas"
      height=${height}
      width=${width}
    />
  </body>
  <style>
    body {
      background: #fff;
      margin: 0;
      overflow: hidden;
    }
  </style>
  <script>
    // canvas functions
    let canvas, ctx;
    const color = c => ctx.fillStyle = c;
    const rect = (x, y, w, h) => ctx.fillRect(x, y, w, h);
    const fill = () => ctx.fillRect(0, 0, ${width}, ${height});
    const clear = () => ctx.clearRect(0, 0, ${width}, ${height});
    // set up game loop
    let lastTime = 0;
    const gameLoop = time => {
      const delta = time - lastTime;
      lastTime = time;
      if (typeof update === 'function') update(delta);
      if (typeof draw === 'function') draw();
      lastPressedKeys = { ...pressedKeys };
      requestAnimationFrame(gameLoop);
    }
    // set up key listeners
    let lastPressedKeys = {};
    const pressedKeys = {};
    window.onkeydown = e => pressedKeys[e.keyCode] = true;
    window.onkeyup = e => pressedKeys[e.keyCode] = false;
    const isKeyDown = key => {
      return pressedKeys[key.charCodeAt(0)];
    }
    const isKey = key => {
      return pressedKeys[key.charCodeAt(0)] &&
      !lastPressedKeys[key.charCodeAt(0)];
    }
    // runs after body has loaded
    function startGame() {
      // set up canvas
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      // start game loop
      if (typeof start === 'function') start();
      gameLoop();
    }
    ${props.code}
  </script>
</html>
`;

  // downloads game as an html file
  function downloadGame() {
    const link = document.createElement('a');
    link.download = 'game.html';
    link.href = `data:text/html;charset=utf-8,${encodeURIComponent(srcDoc)}`;
    link.click();
  }

  return (
    <div className={styles.container}>
      <iframe
        title="canvas"
        sandbox="allow-scripts"
        srcDoc={srcDoc}
        width={width}
        height={height}
        frameBorder="0"
      />
      <button onClick={downloadGame}>
        <GetAppIcon />
      </button>
    </div>
  );
}
