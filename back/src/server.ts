import express from "express";
import cors from 'cors';

import routerUsers from './routers/users';

export const server = express();
server.use(express.json());
server.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

server.use('/api/routers/users', routerUsers);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});