const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0.kz99uqf.mongodb.net/');

module.exports = mongoose.connection;
