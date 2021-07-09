import { useEffect, useRef } from 'react';

import styles from './Canvas.module.css';

const height = 256;
const width = 256;

let canvas;
let ctx;

export default function Canvas() {
  const canvasRef = useRef();

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={width}
        height={height}
      />
    </div>
  );
}
