#!/bin/bash

# if .env file is present load it otherwise use env vars
CURRENT_DIR="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
ENV_FILE_PATH="${CURRENT_DIR}/../../.env"
KAFKA_HOST=kafka1
KAFKA_PORT=$KAFKA_INTERNAL_PORT

if [ -f "$ENV_FILE_PATH" ]; then
    echo "[kafka-script][$KAFKA_HOST] Loading .env file"
    source $ENV_FILE_PATH
fi




# retries=0
# max_retries=12
# echo "[$KAFKA_HOST][kafka-script] Waiting for Kafka to be ready..."
# until $(telnet $DOCKER_HOST_IP $KAFKA_1_PORT_EXTERNAL); do
#   sleep 5
#   echo "[$KAFKA_HOST][script] try to connect to $KAFKA_HOST $KAFKA_PORT"
#   retries=$((retries+1))
#   if [[ $retries -ge $max_retries ]]; then
#       echo "[$KAFKA_HOST][script] Kafka is not available after waiting for a while. Exiting."
#       exit 1
#   fi
# done

echo "[kafka-script] Start: Creating topics in host: ${KAFKA_HOST}:$KAFKA_INTERNAL_PORT ..."
while IFS='=' read -r key topic; do
  if [[ $key == KAFKA_TOPIC_* ]]; then
      docker exec kafka1 kafka-topics --create --topic $topic --partitions 1 --replication-factor 1 --bootstrap-server ${KAFKA_HOST}:$KAFKA_INTERNAL_PORT;
  fi
done < $ENV_FILE_PATH
echo "[kafka-script] End: All topics have been instanciated."


