import dynamic from 'next/dynamic';

import styles from '../styles/Index.module.css';

const Code = dynamic(import('../components/Code.js'), { ssr: false });

export default function Index() {
  return (
    <div>
      <Code />
    </div>
  );
}
