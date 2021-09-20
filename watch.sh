#!/bin/bash

# Make sure there are no processes running already
./kill.sh >/dev/null

# Start the Sass compiler in watch mode
npm run ssw &>/dev/null &

# Start the TypeScript compiler in watch mode
npm run tsw &>/dev/null &

# Start the Hugo server in watch mode
hugo serve -D &>/dev/null &

echo "Started 3 processes in the brackground. Use ./kill.sh to stop them."