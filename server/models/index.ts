import { Sequelize } from 'sequelize-typescript';
import path from 'path';

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || '',
  dialect: 'postgres',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  storage: ':memory:',
  models: [path.join(__dirname, 'models')],
});
