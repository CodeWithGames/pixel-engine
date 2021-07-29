import Game from '../components/Game.js';
import Maps from '../components/Maps.js';

import dynamic from 'next/dynamic';

import styles from '../styles/Index.module.css';

const Code = dynamic(import('../components/Code.js'), { ssr: false });

export default function Index() {
  return (
    <div>
      <Code />
      <Maps />
      <Game />
    </div>
  );
}
