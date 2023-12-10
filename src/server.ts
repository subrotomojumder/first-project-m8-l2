/* eslint-disable no-unused-vars */
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { Server } from 'http';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Example app  listening on ports ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

// promise or asynchronous code rejection error handle by unhandledRejection
process.on("unhandledRejection", ()=> {
  console.log(`😈 unhandledRejection is detected , shutting down...... 😈`);
  if (server) {
    server.close(()=> {
      process.exit(1);
    })
  }
  process.exit(1)
})
// synchronous code error handle by uncaughtException
process.on("uncaughtException", ()=> {
  console.log(`😈 uncaughtException is detected , shutting down...... 😈`);
  process.exit(1)
})
