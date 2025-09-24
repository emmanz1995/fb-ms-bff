import * as http from 'http';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const server = http.createServer(app);

const PORT: number = Number(process.env.PORT) ?? 8085;

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
