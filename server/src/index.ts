import { PORT } from './util/config';
import { connectToDatabase } from './db/connect';
import app from './app';

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();