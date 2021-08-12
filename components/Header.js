import Tooltip from '@material-ui/core/Tooltip';
import GitHubIcon from '@material-ui/icons/GitHub';
import PersonIcon from '@material-ui/icons/Person';
import PaletteIcon from '@material-ui/icons/Palette';
import Image from 'next/image';

import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <Image src="/logo.png" width="48" height="48" />
      <h1>Pixel Engine</h1>
      <span className={styles.flexfill} />
      <Tooltip title="GitHub" arrow>
        <a
          href="https://github.com/csaye/pixel-engine"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </a>
      </Tooltip>
      <Tooltip title="Creator" arrow>
        <a
          href="https://csaye.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PersonIcon />
        </a>
      </Tooltip>
      <Tooltip title="Palettes" arrow>
        <a
          href="https://lospec.com/palette-list"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PaletteIcon />
        </a>
      </Tooltip>
    </div>
  );
}
