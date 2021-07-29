import GetAppIcon from '@material-ui/icons/GetApp';

import styles from './Canvas.module.css';

const height = 256;
const width = 256;

export default function Canvas(props) {
  const srcDoc =
`<html>
  <body>
    <canvas
      id="canvas"
      height=${height}
      width=${width}
    />
  </body>
  <script>
    // set up style
    document.body.style.background = '#fff';
    document.body.style.margin = 0;
    document.body.style.overflow = 'hidden';
    // set up canvas
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
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
    ${props.code}
    // start game loop
    if (typeof start === 'function') start();
    gameLoop();
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
