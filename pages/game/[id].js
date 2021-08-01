import Game from '../../components/Game.js';
import Maps from '../../components/Maps.js';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import styles from '../../styles/GamePage.module.css';

const Code = dynamic(import('../../components/Code.js'), { ssr: false });

const tileSize = 8;
const mapSize = 16;

export default function GamePage() {
  const [colors, setColors] = useState(undefined);
  const [tiles, setTiles] = useState(undefined);
  const [maps, setMaps] = useState(undefined);

  const [code, setCode] = useState(undefined);

  return (
    <div className={styles.container}>
      <Code setCode={setCode} />
      <Maps
        setColors={setColors}
        setTiles={setTiles}
        setMaps={setMaps}
        tileSize={tileSize}
        mapSize={mapSize}
      />
      <Game
        code={code}
        colors={colors}
        tiles={tiles}
        maps={maps}
        tileSize={tileSize}
        mapSize={mapSize}
      />
    </div>
  );
}
