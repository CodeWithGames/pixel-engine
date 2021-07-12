# Pixel Engine

A minimalist online game engine.

## Drawing

`color(c)`: sets canvas draw color to `c`

`rect(x, y, w, h)`: draws canvas rect of `w` width and `h` height at `x`, `y`

`fill()`: draws a full canvas rect

`clear()`: clears canvas

Reserved variables: `canvas`, `ctx`

## Game Loop

`start()`: called once at the start of the game before `update` and `draw`

`update(delta)`: called 60 times a second where `delta` is time in milliseconds since last call

`draw()`: called 60 times a second right after `update`

Reserved variables: `time`, `lastTime`, `delta`

## Keyboard Input

`isKeyDown(key)`: returns whether given character `key` is pressed

`isKey(key)`: returns whether given character `key` was pressed in the last frame

Reserved variables: `pressedKeys`, `lastPressedKeys`

## Example

```js
const player = {
  x: 0,
  y: 0,
  w: 16,
  h: 16
};

const speed = 0.1;

function start() {
  color('blue');
}

function update(delta) {
  if (isKeyDown("W")) player.y -= speed * delta;
  if (isKeyDown("A")) player.x -= speed * delta;
  if (isKeyDown("S")) player.y += speed * delta;
  if (isKeyDown("D")) player.x += speed * delta;
}

function draw() {
  clear();
  rect(player.x, player.y, player.w, player.h);
}
```
