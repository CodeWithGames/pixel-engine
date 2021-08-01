import Link from 'next/link';

import styles from '../styles/Cartridge.module.css';

export default function Cartridge(props) {
  const { id, title } = props.game;

  return (
    <div>
      <Link href={`/game/${id}`}>
        <a>{title}</a>
      </Link>
    </div>
  );
}
