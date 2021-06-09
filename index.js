const http = require('http');
const os = require('os');
const cluster = require('cluster');
const dotenv = require('dotenv');

const app = require('./app');
require('./db');


dotenv.config();

const {
  NODE_ENV = 'development',
  PORT = 4695,
} = process.env;

const cpusCount = os.cpus().length;

if (NODE_ENV == 'production') {
  if (cluster.isPrimary) {
    console.info(`Master process running with PID ${process.pid}`);
    for (let i = 0; i < cpusCount; i++) {
      cluster.fork();
    }

    cluster.on('online', (worker) => {
      console.info(`Worker process with PID ${worker.process.pid} started`);
    });

    cluster.on('exit', (worker, code, signal) => {
      console.info(`Worker process with PID ${worker.process.pid} exitted with code ${code}`);
      console.info(`Starting new worker process`);

      cluster.fork();
    });
  }
  else {
    const server = http.createServer(app);

    server.listen(PORT);
  }
}
else {
  const server = http.createServer(app);

  server.listen(PORT);

  console.info(`Server running on port ${PORT} with PID ${process.pid}`);
}
