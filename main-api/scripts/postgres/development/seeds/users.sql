CREATE TABLE
  IF NOT EXISTS public."users" (
    id serial PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    username VARCHAR(120) NOT NULL,
    password VARCHAR NOT NULL,
    "is-deleted" BOOLEAN,
    "created-at" TIMESTAMP NOT NULL,
    "updated-at" TIMESTAMP
  );

INSERT INTO
  public."users" (
    id,
    email,
    username,
    password,
    "is-deleted",
    "created-at",
    "updated-at"
  )
VALUES
  (
    1,
    'jl.robert@nianexa.com',
    'Jean',
    '$2a$10$JMgqQ7eOcT3PC.Lv7xdNZ.nFvTQbS8mmIbhWcbm/qYp/zQWh4kmWS',
    false,
    '2023-07-30 19:03:00.798',
    '2023-07-30 19:03:00.798'
  ),
  (
    2,
    'test@nianexa.com',
    'Admin',
    '$2a$10$5OoPW5y7QH5t/3xGO439IuxAT2bHgf905FrXDQi4H2LVMW40wXqB2',
    false,
    '2023-07-30 19:03:00.798',
    '2023-07-30 19:03:00.798'
  ),
  (
    3,
    'dev@chappygo.com',
    'dev',
    '$2a$10$r1olL2BqFIyS2EnjhitQ1O3lr7/p54aX/hm68wpNvUrq9eDmk.PCi',
    false,
    '2023-07-30 19:24:46.464',
    '2023-07-30 19:24:46.464'
  );
