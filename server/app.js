const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

app.get('/api/health', async (req, res) => { /* your health route */ });

module.exports = app;