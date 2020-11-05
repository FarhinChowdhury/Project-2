require('dotenv').config();
module.exports =
{
    'development': {
        'username': process.env.DB_USER,
        'password': process.env.DB_PWD,
        'database': process.env.DB_NAME,
        'host': '127.0.0.1',
        'dialect': 'mysql',
    },
    'test': {
        'username': 'root',
        'password': null,
        'database': 'database_test',
        'host': '127.0.0.1',
        'dialect': 'mysql'
    },
    'production': {
        'username': process.env.username,
        'password': process.env.password,
        'database': process.env.database,
        'host': process.env.host,
        'dialect': 'mysql'
    },
}
