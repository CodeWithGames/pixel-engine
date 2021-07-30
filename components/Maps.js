import EditIcon from '@material-ui/icons/Edit';

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
  const [currColor, setCurrColor] = useState(0);

  return (
    <div className={styles.container}>
      <h1>Colors</h1>
      <div className={styles.colorgrid}>
        {
          colors.map((color, i) =>
            <div
              onClick={() => setCurrColor(i)}
              className={
                currColor === i ?
                `${styles.colorinput} ${styles.selected}` :
                styles.colorinput
              }
              key={`${i}`}
              style={{ background: color }}
            >
            </div>
          )
        }
      </div>
      <input
        type="color"
        value={colors[currColor]}
        onChange={e => {
          const newColors = colors.slice();
          newColors.splice(currColor, 1, e.target.value);
          setColors(newColors);
        }}
      />
    </div>
  );
}
