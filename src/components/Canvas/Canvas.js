import { useEffect, useRef } from 'react';

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
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
}
