import express from 'express';
import { sequelize } from './models';
import { router } from './routes';

export default (port: number) => {
  const app = express();
  app.use(express.json());
  app.use(router);

  (async (sequelize) => {
    try {
      await sequelize.authenticate();
      console.log('DATABASE CONNECTED!. 👌'.blue);
    } catch (error) {
      console.error('DATABASE CONNECTION FAILED 👎:'.red, error);
    }
    sequelize.sync();
  })(sequelize);

  return app.listen(port, () => {
    console.log(`SERVER RUNNING ON http://localhost:${port} ✔`.yellow);
  });
};
