import { User } from '../../entity/User';
import { Connection } from 'typeorm/connection/Connection';

export interface userQueryParams {
  id?: number;
  email?: string;
}

export async function userQuery(_: any, { id, email }: userQueryParams): Promise<User[]> {
  let params = <userQueryParams>{};
  if (id !== undefined) params = { ...params, id };
  if (email !== undefined) params = { ...params, email };
  return User.find(params);
}
