import styles from '../styles/Game.module.css';

const width = 256;
const height = 256;

export default function Game() {
  const srcDoc =
`<html>
  <body></body>
  <style></style>
  <script></script>
</html>
`;

  return (
    <div>
      <iframe
        title="game"
        sandbox="allow-scripts"
        srcDoc={srcDoc}
        width={width}
        height={height}
        frameBorder="0"
      />
    </div>
  );
}
