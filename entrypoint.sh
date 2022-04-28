#!/usr/bin/env sh
cd $APP_HOME

if [ "$NODE_ENV" != "production" ] && [ "$DEBUG" = '0' ]; then
  echo "Start development application server..."
  yarn dev
fi

if [ "$NODE_ENV" != "production" ] && [ "$DEBUG" = '1' ]; then
  echo "Start debug application server..."
  yarn debug
fi

exec "$@"
