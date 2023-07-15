const { connect, connection } = require('mongoose');

// Connect to database
connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialapi', {
    // Options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Log mongoose queries being executed
connection.on('connected', () => {
    console.log('Mongoose successfully connected!');
}
);

// Log any mongoose errors
connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
}
);

module.exports = connection;
