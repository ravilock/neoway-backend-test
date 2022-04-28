#!/usr/bin/env sh
cd $APP_HOME

echo "Start production application server..."
yarn build && yarn start
