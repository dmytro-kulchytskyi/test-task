import express from 'express';
import { config } from './config';

import { postsRouter } from './routers/postsRouter';
const app = express();
app.use(express.json())

const port = process.env.PORT;

app.use('post', postsRouter);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${config.PORT}`);
});