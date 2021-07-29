import styles from '../styles/Maps.module.css';

import { useEffect, useState } from 'react';

let canvas, ctx;

export default function Maps() {
  useEffect(() => {
    canvas = document.getElementById('canvas-maps');
    ctx = canvas.getContext('2d');
  }, []);

  return (
    <div>
      <canvas
        id="canvas-maps"
        className={styles.canvas}
        width={256}
        height={256}
      />
    </div>
  );
}
