import Maps from '../components/Maps.js';
import Game from '../components/Game.js';
import Docs from '../components/Docs.js';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import styles from '../styles/Index.module.css';

const Code = dynamic(import('../components/Code.js'), { ssr: false });

// units
const tileSize = 8;
const mapSize = 16;

export default function Index() {
  const [colors, setColors] = useState(undefined);
  const [tiles, setTiles] = useState(undefined);
  const [maps, setMaps] = useState(undefined);

  const [code, setCode] = useState(undefined);

  const [playing, setPlaying] = useState(false);

  return (
    <div className={styles.container}>
      <Code
        setCode={setCode}
        playing={playing}
      />
      <Maps
        setColors={setColors}
        setTiles={setTiles}
        setMaps={setMaps}
        tileSize={tileSize}
        mapSize={mapSize}
      />
      <div className={styles.sidebar}>
        <Game
          code={code}
          colors={colors}
          tiles={tiles}
          maps={maps}
          tileSize={tileSize}
          mapSize={mapSize}
          playing={playing} setPlaying={setPlaying}
        />
        <Docs />
      </div>
    </div>
  );
}
