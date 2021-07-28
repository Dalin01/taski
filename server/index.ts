require('dotenv').config();
import 'colors';
import start from './server';

if (process.env.PORT === undefined) start(5000);
else start(+process.env.PORT);
