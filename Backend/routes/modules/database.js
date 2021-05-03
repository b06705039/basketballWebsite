const mysql = require('mysql2');
const Logger = require('./logger');
const exception = require('./exception');
const TAG = '[Database]';
let pool;

let createPool = () => {
    return new Promise((resolve, reject) => {
        const logger = new Logger();
        pool = mysql.createPool({
            connectionLimit : 10,
            queueLimit      : 0,
            host            : 'remotemysql.com',
            port            : 3306,
            user            : 't5yKOl57F6',
            password        : 'W0WVfD5ZN4',
            database        : 't5yKOl57F6',
            supportBigNumbers : true
        });
        pool.getConnection((err, connection) => {
            if(err){
                logger.error(TAG, 'Failed to create connection pool for mysql because ' + err);
                return reject(exception.ServerError(
                    'INTERNAL_SERVER_ERROR',
                    'Failed to create connection pool.'
                ));
            }
            if(connection){
                connection.release();
                logger.info(TAG, 'Pool has been created.');
                return resolve(pool);
            }
        });
    });
};

let getConnection = (connPool) => {
    const logger = new Logger();
    let _pool = connPool || pool;
    return new Promise((resolve, reject) => {
        _pool.getConnection((err, connection) => {
            if(err) {
                logger.error(TAG, 'Failed to get connection from pool because ' + err);
                return reject(exception.ServerError(
                    'INTERNAL_SERVER_ERROR',
                    'Failed to get connection from pool.'
                ));
            }
            return resolve(connection);
        });
    });
};

let execute = (sql, params) => {
    const logger = new Logger();
    return new Promise((resolve, reject) => {
        getConnection()
            .then((conn) => {
                conn.query(sql, params, (err, results) => {
                    conn.release();
                    if (err) {
                        logger.error(TAG, 'Failed to execute execute statement ' + sql + ' because ' + err);
                        return reject(exception.ServerError(
                            'INTERNAL_SERVER_ERROR',
                            'Failed to execute statement.'
                        ));
                    }
                    return resolve(results);
                });
            })
            .catch((err) => {
                logger.error(TAG, 'Failed to execute execute statement ' + sql + ' when connecting database because ' + err);
                return reject(exception.ServerError(
                    'INTERNAL_SERVER_ERROR',
                    'Failed to execute statement when connecting database.'
                ));
            });
    });
};
const escape = (parameter) => {
    return mysql.escape(parameter);
};

module.exports.createPool = createPool;
module.exports.execute = execute;
module.exports.escape = escape;
