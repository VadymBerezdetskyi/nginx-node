#!/bin/sh

if [ "$1" = "/bin/sh" ]; then
  shift
fi

set -x
exec /bin/ngrok start --config $HOME/ngrok.yml --all