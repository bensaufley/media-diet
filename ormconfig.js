const PostgressConnectionStringParser = require('pg-connection-string');

let connectionOptions = {
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '',
  database: `media_diet_${process.env.NODE_ENV}`,
};

if (process.env.DATABASE_URL) {
  const {
    host,
    port,
    user: username,
    password,
    database,
  } = PostgressConnectionStringParser.parse(process.env.DATABASE_URL);

  connectionOptions = {
    ...connectionOptions,
    host,
    port,
    username,
    password,
    database,
  };
}

const ormConfig = {
  ...connectionOptions,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [
    'server/entity/**/*.ts',
  ],
  migrations: [
    'server/migration/**/*.ts',
  ],
  subscribers: [
    'server/subscriber/**/*.ts',
  ],
  cli: {
    entitiesDir: 'server/entity',
    migrationsDir: 'server/migration',
    subscribersDir: 'server/subscriber',
  },
};

module.exports = ormConfig;
