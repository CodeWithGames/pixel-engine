import styles from '../styles/Maps.module.css';

import { useEffect, useState } from 'react';

const defaultColors = [
  '#ffffff', '#eeeeee', '#dddddd', '#cccccc',
  '#bbbbbb', '#aaaaaa', '#999999', '#888888',
  '#777777', '#666666', '#555555', '#444444',
  '#333333', '#222222', '#111111', '#000000'
]

export default function Maps() {
  const [colors, setColors] = useState(defaultColors);

  return (
    <div>
      <h1>Colors</h1>
      <div className={styles.colorgrid}>
        {
          colors.map((color, i) =>
            <div
              className={styles.colorinput}
              key={`${i}`}
              style={{ background: color }}
            >
              <input
                type="color"
                value={color}
                onChange={e => {
                  const newColors = colors.slice();
                  newColors.splice(i, 1, e.target.value);
                  setColors(newColors);
                }}
              />
            </div>
          )
        }
      </div>
    </div>
  );
}
