import Game from '../components/Game.js';
import Maps from '../components/Maps.js';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import styles from '../styles/Index.module.css';

const Code = dynamic(import('../components/Code.js'), { ssr: false });

export default function Index() {
  const [code, setCode] = useState('');

  return (
    <div>
      <Code setCode={setCode} />
      <Maps />
      <Game code={code} />
    </div>
  );
}
