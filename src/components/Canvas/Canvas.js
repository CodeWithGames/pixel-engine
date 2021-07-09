import styles from './Canvas.module.css';

const height = 256;
const width = 256;

export default function Canvas(props) {

  return (
    <div className={styles.container}>
      <iframe
        title="canvas"
        sandbox="allow-scripts"
        srcDoc={`
          <html>
            <body></body>
            <script>${props.code}</script>
          </html>
        `}
        width={width}
        height={height}
        frameBorder="0"
      />
    </div>
  );
}
