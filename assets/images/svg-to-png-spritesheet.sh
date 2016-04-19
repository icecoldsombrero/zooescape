#!/bin/bash

set -ue
set -o pipefail

animal="$1"

for file in ./${animal}*.svg
do
  echo "$file"
  echo "${file/svg/png}"
  convert "$file" "${file/svg/png}"
done

spritesheet="${animal}-spritesheet.png"

if [[ ! -e "$spritesheet" ]]; then
  convert +append $animal*.png "$spritesheet"
fi
