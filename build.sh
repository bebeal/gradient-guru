#!/bin/bash

set -e
trap 'cleanup_and_exit' EXIT

cleanup_and_exit() {
  echo "Running cleanup..."
  [ -f _postcss.config.js ] && mv _postcss.config.js postcss.config.js
  [ -f _node_modules ] && mv _node_modules node_modules
  exit $1
}

main() {
  [ -f node_modules ] && mv node_modules _node_modules
  [ -f postcss.config.js ] && mv postcss.config.js _postcss.config.js

  if ! cd packages/tldraw; then
    echo "Error: Failed to change directory to packages/tldraw."
    return 1
  fi

  if ! yarn; then
    echo "Error: Yarn install failed in packages/tldraw."
    return 1
  fi

  if ! yarn build; then
    echo "Error: Yarn build failed in packages/tldraw."
    return 1
  fi

  cd ../..
  return 0
}

main || cleanup_and_exit $?
