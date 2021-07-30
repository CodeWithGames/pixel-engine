# Pixel Engine

A minimalist online game engine.

## Drawing

`clear()`: clears canvas

`fill(color)`: draws rect of `color` color over full canvas

`rect(x, y, w, h, color)`: draws rect of `w` width, `h` height, and `color` color at `x`, `y`

## Game Loop

`start()`: runs once at the start of the game before `update` and `draw`

`update(delta)`: runs once a frame where `delta` is time in milliseconds since last call

`draw()`: runs once a frame after `update`

## Keyboard Input

`isKeyDown(key)`: returns whether given character `key` is pressed

`isKey(key)`: returns whether given character `key` was pressed in the last frame

## Example

```js
// define player
const player = { x: 0, y: 0, w: 16, h: 16 };
const speed = 0.1;

// runs once on start
function start() {
  fill('green');
}

// runs once a frame
function update(delta) {
  if (isKeyDown("W")) player.y -= speed * delta;
  if (isKeyDown("A")) player.x -= speed * delta;
  if (isKeyDown("S")) player.y += speed * delta;
  if (isKeyDown("D")) player.x += speed * delta;
}

// runs once a frame after update
function draw() {
  fill('green');
  rect(player.x, player.y, player.w, player.h, 'blue');
}
```
