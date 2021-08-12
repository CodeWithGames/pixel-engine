import Maps from '../components/Maps.js';
import Game from '../components/Game.js';
import Docs from '../components/Docs.js';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { palettes } from '../data/palettes.js';

import styles from '../styles/Index.module.css';

const Code = dynamic(import('../components/Code.js'), { ssr: false });

// units
const tileSize = 8;
const mapSize = 16;
const tileCount = 64;
const mapCount = 16;

const defaultTiles = Array(tileCount).fill(Array(tileSize ** 2).fill(0));
const defaultMaps = Array(mapCount).fill(Array(mapSize ** 2).fill(0));

const defaultCode =
`// runs once on start
function start() {

}

// runs once a frame
function update(delta) {

}

// runs once a frame after update
function draw() {

}
`;

export default function Index() {
  const [colors, setColors] = useState(palettes[0].colors);
  const [tiles, setTiles] = useState(defaultTiles);
  const [maps, setMaps] = useState(defaultMaps);

  const [code, setCode] = useState(defaultCode);

  const [playing, setPlaying] = useState(false);

  return (
    <div className={styles.container}>
      <Code
        code={code} setCode={setCode}
        playing={playing}
      />
      <Maps
        colors={colors} setColors={setColors}
        tiles={tiles} setTiles={setTiles}
        maps={maps} setMaps={setMaps}
        tileSize={tileSize} tileCount={tileCount}
        mapSize={mapSize} mapCount={mapCount}
      />
      <div className={styles.sidebar}>
        <Game
          colors={colors}
          tiles={tiles}
          maps={maps}
          code={code}
          tileSize={tileSize}
          mapSize={mapSize}
          playing={playing} setPlaying={setPlaying}
        />
        <Docs />
      </div>
    </div>
  );
}
