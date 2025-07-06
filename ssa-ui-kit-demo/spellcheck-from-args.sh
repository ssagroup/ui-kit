#!/bin/bash

echo "$@" 
echo "$@" | tr ' ' '\n' | cspell --file-list stdin --show-suggestions --no-progress
