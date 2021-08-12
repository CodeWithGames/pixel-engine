# Pixel Engine

A minimalist online game engine.

## Drawing

`clear()`: clears canvas

`fill(color)`: draws `color` rect over full canvas

`rect(x, y, width, height, color)`: draws `color` rect of `width`, `height` size at `x`, `y`

`objRect(obj)`: calls `rect` with `x`, `y`, `width`, `height`, and `color` destructured from `obj`

## Game Loop

`start()`: runs once at the start of the game before `update` and `draw`

`update(delta)`: runs once a frame where `delta` is time in milliseconds since last call

`draw()`: runs once a frame after `update`

## Input

`isKeyDown(key)`: returns whether given `key` is pressed

`isKey(key)`: returns whether given `key` was pressed in the last frame

## Maps

`loadMap(index)`: loads map `index` to canvas

`loadTile(index, x, y)`: loads tile `index` at `x`, `y`

## Example

```js
// define player
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
}
```
