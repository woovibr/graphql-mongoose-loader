find ./src -name '*.js' -not -path '*/__tests__*' | while read filepath; do cp $filepath `echo $filepath | sed 's/\\/src\\//\\/lib\\//g'`.flow; done
