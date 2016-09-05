#!/usr/bin/env bash

DEV_OPTS=""
DEV_OPTS="-Xdebug -agentlib:jdwp=transport=dt_socket,address=8080,server=y,suspend=y"
BUILD_JAR='weedwizard-server/target/weedwizard-server-1.0-SNAPSHOT.jar'
CONFIG_PATH='config/weedwizard-server/config.yaml'

ARGS=$(getopt -o dp:: -l debug,port:: -n 'deploy.sh' -- "$@")
eval set -- "$ARGS"

while true; do
  case "$1"
    in
      -d|--debug)
            DEV_OPTS="-Xdebug -agentlib:jdwp=transport=dt_socket,address=8080,server=y,suspend=y"
            shift;;
       -p|--port)
            case "$2" in
                "") DEPLOY_PORT=8080; shift;;
                *) DEPLOY_PORT= $2; shift;;
            esac ;;
      --)
          shift; break;;
  esac
done

echo $DEV_OPTS
echo "deploying jar locally..."
java  $DEV_OPTS -jar $BUILD_JAR server $CONFIG_PATH
