# Helllo

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Working script](#working-script)
- [Endpoints](#endpoints)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for Grading and testing purposes.

## Installation

This is node.js API. Installation is done using npm install command

```
npm install
```

## Working script

- Start server on production: `npm start`
- Start server on development: `npm run dev`
- Build tsc: `npm run build`
- Run jasmine text: `npm run jasmine`
- Run test and build: `npm test`
- Linting: `npm run lint`
- Format code using prettier: `npm run format`

## Links

- homepage: `http://localhost:3003`
- Resizing Image: `http://localhost:3003/images`
  - The resizing url needs the filename as parameter and the desired width and height as parameters, e.g.: `http://localhost:3003/images?filename=fjord&width=200&height=200`

## Notes

- Images are served from "images" folder and thumbnail store in "uploads" folder.
