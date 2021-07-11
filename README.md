# Pixel Engine

A minimalist online game engine.

## Drawing

`color(c)`: sets canvas draw color to `c`

`rect(x, y, w, h)`: draws canvas rect of `w` width and `h` height at `x`, `y`

`fill()`: draws a full canvas rect

`clear()`: clears canvas

## Game Loop

`start()`: called once at the start of the game before `update` and `draw`

`update(delta)`: called 60 times a second where `delta` is time in milliseconds since last call

`draw()`: called 60 times a second right after `update`
