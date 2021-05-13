const databaseInfo = {
    user: {
        connectionLimit: 10,
        queueLimit: 0,
        host: 'remotemysql.com',
        port: 3306,
        user: 't5yKOl57F6',
        password: 'W0WVfD5ZN4',
        database: 't5yKOl57F6',
        supportBigNumbers: true
    }
}
const config = {};
config.SECRET_KEY = 'S8*%X$N.AFwx';
config.TOKEN_EXPIRE_TIME = 18000;


//使用者帳號需少於50數字
config.ACCOUNT_FORMAT = '^.{1,50}$';
//密碼需含有一小寫一大寫以及一個數字
config.PWD_FORMAT = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})';
config.MAIL_FORMAT = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
//使用者名稱需少於50數字
config.USERNAME_FORMAT = '^.{1,50}$';

config.databases = databaseInfo;
config.AdimLevel = { administer: 2, recorder: 1, team: 1, public: 0 };


config.department = ['ME', "EE", "DFLL", "FIN", "CHE"];
config.teamStatus = ['已報名', '已繳費', '審核中', '未報名', '未繳費']

module.exports = config;