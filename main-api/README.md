# Description

This is the main API in our architecture, manage the authentication, CRON task, docker, etc...
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository

# Prerequisite

You need:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on your machine
- [Node](https://nodejs.org/fr/download) installed on your machine.
- [PostgreSQL](https://www.postgresql.org/download/) installed on your machine (You may have to create a `chappygo` database)
- [Docker](https://docs.docker.com/engine/install/) on your machine.
- [docker-compose](https://www.makeuseof.com/install-docker-compose-on-linux/).
- [Nps](https://github.com/sezna/nps#installation) installed on your machine.
- Once Node is installed you will need [Pnpm](https://pnpm.io/fr/installation)
  - (on Linux: run `npn i -g pnpm`)

# Installation

```bash
git clone git@gitlab.com:nianexa/main-api.git
cd main-api/
cp .env-example .env
pnpm install
```

Update your `.env` file (fill up the following values with your current setup)

# Run the App

You have **2** ways for launching the app:

## 1/ Full-Docker Mode

Full Docker Allow to launch all the services at once.

**1.1 - On the very first launch**
You will need to initialize the kafkanet network by using:

```sh
nps network
```

Then start the containers using:

```sh
nps all
```

And now you can launch the fixtures, it will populate the databases with some default data.
For example you will be able to connect with the user `dev@chappygo.com` and the pass `Chappygo100$` in the `web-app` (in development)

```sh
nps seed
```

**1.2 - Not the very first launch**
You can just run all in once using:

```bash
# Usual:
nps all
# Or if you need to rebuild the apps (after a `git pull` for example):
nps all.rebuild
```

## 2/ Semi-Docker Mode

If you prefer to be in developer mode, you can do like following:

```bash
nps db
# And only if you have no data in your database:
nps seed
```

Then you have to open **3** terminals:

**2.1 - Main API (`main-api`)**

Start the _Main-API_, pick one command:

```bash
# development
nps

# Or watch mode
nps start.dev

# Or debug mode
nps start.debug
```

If ou are in dev environment you can now visit the playground graphQL (a postman like service for graphQL):
-> <http://localhost:3010/graphql> (3010 is located in the `PORT` value inside the `.env` file)

**2.2 - Reader (`reader`)**

Then you can start the _Reader_, pick one command:

```bash
# development
nps reader

# Or watch mode
nps reader.dev

# Or debug mode
nps reader.debug
```

**2.3 - Writter (`writter`)**

Then you can start the _Writter_, pick one command:

```bash
# development
nps writter

# Or watch mode
nps writter.dev

# Or debug mode
nps writter.debug
```

## 3/ Output

Now you have:

- The Back-end gateway listening to the port `3050`
- The Redis cache listening to the port `6379`
- The MongoDB listening to the port `27017`
- The PostgresSQL listening to the port `5432`
- The Kafka listening to the brokers: `localhost:9094,localhost:9095,localhost:9096`

# Stop the app

```
# If you were in full docker mode (nps all)
nps all.stop
# or if you were in semi docker mode (nps db):
nps db.stop
```

# App cleanup

It is possible to cleanup the installation when the docker is not running:

```
# soft cleanup
nps all.clean
# Hard cleanup:
nps db.prune
```

# Logs

To log:

```bash
nps log
```

To log the apps only (main-api, reader, writter):

```sh
nps log.apps
```

To log the main-api only:

```sh
nps log.main
```

To log the reader only:

```sh
nps log.reader
```

To log the writter only:

```sh
nps log.writter
```

To log the kafka brokers only:

```sh
nps log.kafka
```

To log the zookeeper (kafka) only:

```sh
nps log.zookeeper
```

To log the postgres only:

```sh
nps log.postgres
```

To log the mongodb only:

```sh
nps log.mongodb
```

To log the redis only:

```sh
nps log.redis
```

# Production

In production mode (`NODE_ENV=production`), launch:

```bash
nps start.prod
```

# Test

```bash
# unit tests
nps test

# e2e tests
nps test.e2e

# test coverage
nps test.cov
```

# Life-cycle

Each time you pull the repo, do not forget to run the following commands:

```bash
pnpm install
```

More commands inside `./package-scripts.js` file.

---

# Annexes

### To Add resource or modules

The Entry point is located at `src/main.ts`, it launches the App and then call the main module manager located in `src/app.module.ts`

You can add a module by using:

```bash
nest g module config
```

Or a resource (this command also generate a module, but with several files, including `graphQL` and `TypeORM`files for managing a resource )

```bash
nest generate resource users
```

Each module contains a module file (ex: `users.module.ts`) that exposes the module to the App:

```ts
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
```

---

More information on the website [NestJS](https://docs.nestjs.com/)
