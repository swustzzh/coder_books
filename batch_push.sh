#!/usr/bin/env bash

for FILE in $(git status -s --untracked-files | awk '{print $2}'); do
  if [ "$FILE" != "batch_push.sh" ]; then
    echo $FILE
    echo
    git reset origin/main
    git add $FILE
    git commit -m "feat: $FILE"
    git push
    echo
  fi
done
