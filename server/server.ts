import express from 'express';
import { sequelize } from './models';

export default (port: number) => {
  const app = express();

  (async (sequelize) => {
    try {
      await sequelize.authenticate();
      console.log('DATABASE CONNECTED!. 👌'.blue);
    } catch (error) {
      console.error('DATABASE CONNECTION FAILED 👎:'.red, error);
    }
  })(sequelize);

  return app.listen(port, () => {
    console.log(`SERVER RUNNING ON http://localhost:${port} ✔`.yellow);
  });
};
