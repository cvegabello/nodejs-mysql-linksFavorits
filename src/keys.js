
if (process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}
module.exports = {

    database: {
        host: 'localhost',
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: 'db_links'
    }

};