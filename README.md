# Jaywing Front End Starter Kit

Atomic is the front end starter kit for Jaywing (Newbury).

Bringing together a growing a set of common re-usable components aimed at standardising our front end approach and speed
up development time.

The technical architecture is based on [Blendid](https://github.com/vigetlabs/blendid) by
[Viget](https://www.viget.com). Blendid is a delicious blend of tasks and build tools poured into
[Gulp](http://gulpjs.com/) to form a full-featured modern asset pipeline. It can be used as-is as a static site builder,
or can be configured and integrated into your own development environment and site or app structure.

## Installation

Requires at least version 6 of Node. We reccomend using [nvm](https://github.com/creationix/nvm) to install and manage
your Node versions.

```bash
git clone https://github.com/jaywing/atomic.git MyApp
cd MyApp
yarn add blendid
yarn run blendid
```

## Commands

```bash
yarn run blendid
```

This runs the development task, which starts compiling, watching, and live updating all our files as we change them.
Browsersync will start a server on port 3000, or do whatever you've configured it to do. You'll be able to see live
changes in all connected browsers.

```bash
yarn run blendid build
```

Compiles files for production to your destination directory. JS files are built with webpack 3 with standard production
optimizations (uglfiy, etc.). CSS is run through CSSNano. If rev is set to true in your task-config.js file, filenames
will be hashed (file.css -> file-a8908d9io20.css) so your server may cache them indefinitely. A rev-manifest.json file
is output to the root of your dest directory (public by default), and maps original filenames to hashed ones.

---

View the [Atomic documentation](http://atomic.preview8.jaywing.com/docs/).
