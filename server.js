const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const port = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start server
db.once('open', () => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}!`);
    });
}
);

