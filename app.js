const express = require('express');
const cors = require('cors');

const {
  serviceStatusRouter,
  accountRouter,
} = require('./routers');


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


app.use('/service-status', serviceStatusRouter);
app.use('/account', accountRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Requested resource was not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Something broke' });
});

module.exports = app;
