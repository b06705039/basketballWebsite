const _ = require('underscore');
const jwt = require('jsonwebtoken');
const db = require(global.__MODULE_BASE__ + 'database');
const Logger = require(global.__MODULE_BASE__ + 'logger');
const exception = require(global.__MODULE_BASE__ + 'exception');
const tool = require(global.__MODULE_BASE__ + 'tool');
const config = require(global.__MODULE_BASE__ + 'config');

class User {
    constructor(token) {
        this.token = token;
    }
    static async getUserInfo(account) {
        const logger = new Logger();
        const TAG = '[GetUserInfo]';

        const SQL = `
            SELECT 
                user_id, 
                account,
                password,
                active,
                username,
                email,
                adim
            FROM userInfo
            WHERE account = ${db.escape(account)}
        `;

        const result = await db.execute(SQL, {});
        if (tool.isNull(result, result[0])) {
            logger.error(TAG, `Not found user with account ${account}`);
            throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
        }

        return result[0];
    }
    static generateToken(userObj) {
        // gen token
        const iat = Math.floor(Date.now() / 1000);
        const expTime = 5 * 60 * 60; // 5 hours = 60 (seconds) * 60 * (min) = 3600 * 5
        const payload = {
            user_id: userObj.user_id,
            account: userObj.account,
            username: userObj.username,
            email: userObj.email,
            active: userObj.active,
            adim: userObj.adim,
            iat: iat,
            exp: iat + expTime
        };

        // sign token
        const signedToken = jwt.sign(
            payload,
            config.SECRET_KEY
        );
        return signedToken;
    }

}

User.prototype.create = async (account, username, password, passwordConfirmed, adim, email, deparment) => {
    const TAG = '[UserCreate]';
    const logger = new Logger();
    if (!tool.isValidAccount(account)) {
        logger.error(TAG, `Invalid account : ${account}`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
    } else if (!tool.isValidMail(email)) {
        logger.error(TAG, `Invalid email : ${email}`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
    } else if (!tool.isValidPwd(password) || password != passwordConfirmed) {
        logger.error(TAG, `Invalid pwd : ${password}, pwdConfirmed: ${passwordConfirmed}.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
    } else if (!tool.isValidUserName(username)) {
        logger.error(TAG, `Invalid username : ${username}`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
    }
    const [isUniqueAccount, isUniqueUserName, isUniqueEmail] = await Promise.all(
        [
            (async () => {
                const SQL = `
                    SELECT 
                        COUNT(1)
                    FROM userInfo
                    WHERE 1 = 1
                    AND account = ${db.escape(account)}
                `;
                const result = await db.execute(SQL, {});
                return result[0]['COUNT(1)'] > 0 ? false : true;
            })(),
            (async () => {
                const SQL = `
                    SELECT 
                        COUNT(1)
                    FROM userInfo
                    WHERE 1 = 1
                    AND username = ${db.escape(username)}
                `;
                const result = await db.execute(SQL, {});
                return result[0]['COUNT(1)'] > 0 ? false : true;
            })(),
            (async () => {
                const SQL = `
                    SELECT 
                        COUNT(1)
                    FROM userInfo
                    WHERE 1 = 1
                    AND email = ${db.escape(email)}
                `;
                const result = await db.execute(SQL, {});
                return result[0]['COUNT(1)'] > 0 ? false : true;
            })()
        ]
    )
    console.log([isUniqueAccount, isUniqueUserName, isUniqueEmail]);
    if (!isUniqueAccount) {
        logger.error(TAG, `Invalid account : ${account} already existed.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
    } else if (!isUniqueUserName) {
        logger.error(TAG, `Invalid username : ${username} already existed.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
    } else if (!isUniqueEmail) {
        logger.error(TAG, `Invalid email : ${email} already existed.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
    } else if (!(adim in config.adim)) {
        logger.error(TAG, `Invalid adimister : ${adim} does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
    } else if (!(deparment in config.department)) {
        logger.error(TAG, `Invalid department : ${deparment} does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
    }
    let user_id = await db.execute("SELECT MAX(user_id) FROM userInfo");
    user_id = user_id[0]['MAX(user_id)'] + 1;
    let SQL = `INSERT INTO userInfo (user_id, account, username, password, 
            adim, createtime, active, email, department)
            VALUE (${user_id}, "${account}", "${username}", "${password}", 
            "${adim}", NOW(), false, "${email}", "${deparment}");`
    db.execute(SQL, {});
}

User.prototype.active = async (user_id) => {
    let check = await db.execute(`SELECT user_id FROM userInfo WHERE user_id = ${user_id}`);
    if (check.length === 0) {
        logger.error(TAG, `Invalid user_id : ${user_id} does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
    }
    const SQL = `UPDATE userInfo SET active = true WHERE user_id=${user_id}`;
    await db.execute(SQL);
}

User.prototype.login = async function (account, password) {
    const TAG = '[UserLogin]';
    const logger = new Logger();
    if (tool.isNull(account, password)) {
        logger.error(TAG, `Account: ${account} and password: ${password} can't be empty.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
    }
    const userObj = await User.getUserInfo(account);
    if (_.isEmpty(userObj)) {
        logger.error(TAG, `User: ${account} isn't exist.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid account or password.');
    }
    if (password !== userObj.password) {
        logger.error(TAG, 'Password is not matched.');
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid account or password.');
    }


    const response = {
        user_id: userObj.id,
        account: userObj.account,
        email: userObj.email,
        username: userObj.username,
        active: userObj.active,
        adim: userObj.adim,
        token: User.generateToken(userObj)
    };
    logger.info(TAG, `User: ${account} login successfully.`);
    return response;
};

User.prototype.getUserbyId = async function (id) {
    const TAG = '[GETUSERBYID]'
    const logger = new Logger();
    console.log(this.token)
    if (!tool.isPositiveInteger(id)) {
        logger.error(TAG, `ID: ${id} is not an integer.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
    }
    let isVaildID = (async () => {
        const SQL = `
            SELECT 
                COUNT(1)
            FROM userInfo
            WHERE 1 = 1
            AND user_id = ${id}
        `;
        const result = await db.execute(SQL, {});
        return result[0]['COUNT(1)'] > 0 ? false : true;
    })()

    if (!isVaildID) {
        logger.error(TAG, `ID: ${id} doesn't exist.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Invalid parameter.');
    }
    const SQL = `SELECT * FROM userInfo WHERE user_id=${id}`;
    return await db.execute(SQL, {});
}

module.exports = User;