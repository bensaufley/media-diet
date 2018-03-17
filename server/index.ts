import 'reflect-metadata';
import { createConnection } from 'typeorm';

import app from './app';
import ormconfig from '../ormconfig';
import { User } from './entity/User';

createConnection(ormconfig).then(async (connection) => {
  app.listen(80);
}).catch(console.error);

if (process.env.NODE_ENV === 'development' && (module as any).hot !== undefined) {
  (module as any).hot.accept();
}
