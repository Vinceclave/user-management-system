const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    try {
        // create db if it doesn't already exist
        const { host, port, user, password, database } = config.database;
        
        console.log('Connecting to MySQL server...');
        const connection = await mysql.createConnection({
            host,
            port,
            user,
            password,
            // Don't specify database here to allow creation if it doesn't exist
        });

        console.log('Creating database if it doesn\'t exist...');
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
        await connection.end();

        // connect to db
        console.log('Connecting to database with Sequelize...');
        const sequelize = new Sequelize(database, user, password, {
            host: host,
            port: port,
            dialect: 'mysql',
            logging: false, // disable logging
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });

        // test connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // init models and add them to the exported db object
        db.Account = require('../accounts/account.model')(sequelize);
        db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);

        // define relationships
        db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
        db.RefreshToken.belongsTo(db.Account);

        // sync all models with database
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('Please make sure MySQL server is running and the connection details are correct.');
        }
        process.exit(1);
    }
} 