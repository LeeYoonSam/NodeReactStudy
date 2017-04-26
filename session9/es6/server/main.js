import express from 'express';

const app = express();

let port = 3000;


app.get('/', (req, res) => {
    res.send('Es6 export Import');
});

import posts from './routes/posts';
app.use('/posts', posts);

const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});