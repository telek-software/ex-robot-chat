#!/bin/bash
set -e

CURRENT_DIR="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
echo "[postgres-script] seeds: current dir $CURRENT_DIR"

# if .env file is present load it otherwise use env vars
ENV_FILE_PATH="${CURRENT_DIR}/../../.env"
if [ -f "$ENV_FILE_PATH" ]; then
    echo "[postgres-script] loading .env file..."
    source $ENV_FILE_PATH
fi

PG_FILES="users"

for r in $PG_FILES; do
    if [ -f "$CURRENT_DIR/$NODE_ENV/seeds/${r}.sql" ]; then
      echo "[postgres-script] seeding $r ..."
      PGPASSWORD=$POSTGRES_PASSWORD psql -v ON_ERROR_STOP=1 --quiet -U $POSTGRES_USER  -d $POSTGRES_DB -h $POSTGRES_HOST -f $CURRENT_DIR/$NODE_ENV/seeds/${r}.sql
    fi
done

echo "[postgres-script] Seeds are done."

