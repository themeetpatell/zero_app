import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';

const getClient = () => {
  const url = process.env.TURSO_CONNECTION_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    return createClient({
      url: 'file:local.db',
    });
  }

  return createClient({
    url,
    authToken: authToken || undefined,
  });
};

const client = getClient();

export const db = drizzle(client, { schema });

export type Database = typeof db;