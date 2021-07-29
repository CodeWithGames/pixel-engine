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
    let canvas, ctx;
    // runs after body has loaded
    function _start() {
      // get canvas and context
      canvas = document.getElementById('canvas-game');
      ctx = canvas.getContext('2d');
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
