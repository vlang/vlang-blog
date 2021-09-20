#!/bin/bash

set -m

hugo_id=$(ps aux | grep [h]ugo | awk '{print $2}')
sass_id=$(ps aux | grep [s]ass | awk '{print $2}')
tsc_id=$(ps aux | grep [t]sc | awk '{print $2}')

if [ -n "$hugo_id" ]; then
  echo "Killing 3 processes: $hugo_id, $sass_id, $tsc_id"
  kill $hugo_id
  kill $sass_id
  kill $tsc_id
else
  echo "No relevant processes are running."
fi