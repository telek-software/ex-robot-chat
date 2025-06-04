module.exports = {
  scripts: {
    sl: 'sleep 3 && echo 1',
    all: {
      default: 'nps all.start',
      build:
        'nps build && docker compose -f docker-compose.yml -f docker-compose.kafka.yml -f docker-compose.apps.yml build',
      start:
        'nps network; docker compose -f docker-compose.yml -f docker-compose.kafka.yml -f docker-compose.apps.yml up -d --remove-orphans',
      stop: 'docker compose -f docker-compose.yml -f docker-compose.kafka.yml -f docker-compose.apps.yml down',
      clean: 'nps all.stop; docker volume prune -f; docker image prune -f',
      rebuild:
        'nps all.stop; docker image rm -f main-api writter reader; nps build; nps all',
    },
    network: 'docker network create kafkanet',
    default: 'nps start',
    start: {
      default: 'nest start',
      dev: 'nest start --watch',
      debug: 'nest start --debug --watch',
    },
    reader: {
      default: 'nest start reader',
      dev: 'nest start reader --watch',
      debug: 'nest start reader --debug --watch',
    },
    writter: {
      default: 'nest start writter',
      dev: 'nest start writter --watch',
      debug: 'nest start writter --debug --watch',
    },
    build: 'nest build && nest build reader && nest build writter',
    format: 'prettier --write "src/**/*.ts" "test/**/*.ts"',
    lint: 'eslint "{src,apps,libs,test}/**/*.ts" --fix',
    test: {
      default: 'jest',
      watch: 'jest --watch',
      cov: 'jest --coverage',
      debug:
        'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand',
      e2E: 'jest --config ./test/jest-e2e.json',
    },
    db: {
      default:
        'cross-env docker compose -f docker-compose.yml -f docker-compose.kafka.yml up -d && sleep 3',
      stop: 'cross-env docker compose -f docker-compose.yml -f docker-compose.kafka.yml down',
      // DANGEROUSE COMMAND
      clear:
        'docker volume rm main-api_postgres main-api_redis main-api_mongodb main-api_kafka1_data \
      main-api_kafka2_data main-api_kafka3_data main-api_zookeeper1_data main-api_zookeeper2_data \
      main-api_zookeeper3_data',
      prune: 'nps db.stop; nps db.clear; docker volume prune -f;',
      launch: ' nps db && sleep 3 && nps seed',
      reset: 'nps db.prune && nps db.launch',
    },
    exec: {
      postgres: 'docker exec -ti postgres bash',
      kafka: 'docker exec -ti kafka1 bash',
      mongodb: 'docker exec -ti mongodb bash',
    },
    seed: {
      default: 'nps seed.postgres; nps seed.kafka',
      postgres: './scripts/postgres/seeds.sh',
      kafka: './scripts/kafka/seeds.sh',
    },
    log: {
      default: 'docker compose logs',
      mongodb: 'docker compose logs -t mongodb',
      postgres: 'docker compose logs -t postgres',
      apps: 'docker compose -f docker-compose.apps.yml logs -f -t main-api reader writter',
      reader: 'docker compose -f docker-compose.apps.yml logs -f -t reader',
      writter: 'docker compose -f docker-compose.apps.yml logs -f -t writter',
      main: 'docker compose -f docker-compose.apps.yml logs -f -t main-api',
      redis: 'cross-env docker compose logs -t redis',
      kafka:
        'docker compose -f docker-compose.kafka.yml logs -t kafka1 kafka2 kafka3',
      zookeeper: 'cross-env docker compose logs -t er1 zookeeper2 zookeeper3',
      watch: 'cross-env docker compose logs -f',
    },
  },
};
