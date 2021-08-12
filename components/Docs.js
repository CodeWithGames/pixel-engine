import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import styles from '../styles/Docs.module.css';

const example =
`// define player
const player = {
  x: 0,
  y: 0,
  width: 16,
  height: 16,
  color: 'blue'
};
const speed = 0.1;

// runs once on start
function start() {
  fill('green');
}

// runs once a frame
function update(delta) {
  if (isKeyDown('w')) player.y -= speed * delta;
  if (isKeyDown('a')) player.x -= speed * delta;
  if (isKeyDown('s')) player.y += speed * delta;
  if (isKeyDown('d')) player.x += speed * delta;
}

// runs once a frame after update
function draw() {
  fill('green');
  objRect(player);
}`;

export default function Docs() {
  return (
    <div className={styles.container}>
      <h1>Pixel Engine</h1>
      <p>A minimalist online game engine.</p>
      <h2>Drawing</h2>
      <p><code>clear()</code>: clears canvas</p>
      <p><code>fill(color)</code>: draws rect of color <code>color</code> over full canvas</p>
      <p><code>rect(x, y, w, h, color)</code>: draws rect of width <code>w</code>, height <code>h</code>, and color <code>color</code> at <code>x</code>, <code>y</code></p>
      <h2>Game Loop</h2>
      <p><code>start()</code>: runs once at the start of the game before <code>update</code> and <code>draw</code></p>
      <p><code>update(delta)</code>: runs once a frame where <code>delta</code> is time in milliseconds since last call</p>
      <p><code>draw()</code>: runs once a frame after <code>update</code></p>
      <h2>Keyboard Input</h2>
      <p><code>isKeyDown(key)</code>: returns whether given character <code>key</code> is pressed</p>
      <p><code>isKey(key)</code>: returns whether given character <code>key</code> was pressed in the last frame</p>
      <h2>Maps</h2>
      <p><code>loadMap(index)</code>: loads map of index <code>index</code> to canvas</p>
      <p><code>loadTile(x, y, index)</code>: loads tile of index <code>index</code> at <code>x</code>, <code>y</code></p>
      <h2>Example</h2>
      <div className={styles.editor}>
        <AceEditor
          readOnly={true}
          value={example}
          mode="javascript"
          theme="monokai"
          wrapEnabled={true}
          showPrintMargin={false}
          showGutter={false}
          focus={false}
          highlightActiveLine={false}
          width="auto"
          setOptions={{ useWorker: false }}
          tabSize={2}
          maxLines={28}
        />
      </div>
    </div>
  );
}
