
if (process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}
module.exports = {

    database: {
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DB_NAME
    }

};