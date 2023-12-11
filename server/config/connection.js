const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || DB_URI);

module.exports = mongoose.connection;
