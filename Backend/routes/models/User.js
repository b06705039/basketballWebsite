const _ = require("underscore");
const jwt = require("jsonwebtoken");
const db = require(global.__MODULE_BASE__ + "database");
const Logger = require(global.__MODULE_BASE__ + "logger");
const exception = require(global.__MODULE_BASE__ + "exception");
const emailer = require(global.__MODULE_BASE__ + "emailer");
const tool = require(global.__MODULE_BASE__ + "tool");
const config = require(global.__MODULE_BASE__ + "config");

class User {
  constructor(token) {
    this.token = token;
  }
  static async getUserInfo(account) {
    const logger = new Logger();
    const TAG = "[GetUserInfo]";

    const SQL = `
            SELECT 
                user_id, 
                account,
                password,
                active,
                username,
                email,
                department,
                adim
            FROM userInfo
            WHERE account = ${db.escape(account)}
        `;

    const result = await db.execute(SQL, {});
    if (tool.isNull(result, result[0])) {
      logger.error(TAG, `Not found user with account ${account}`);
      throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
    }

    return result[0];
  }

  static generateToken(userObj) {
    // gen token
    const iat = Math.floor(Date.now() / 1000);
    const expTime = 5000 * 60 * 60; // 5 hours = 60 (seconds) * 60 * (min) = 3600 * 5
    const payload = {
      user_id: userObj.user_id,
      account: userObj.account,
      username: userObj.username,
      email: userObj.email,
      active: userObj.active,
      adim: userObj.adim,
      iat: iat,
      exp: iat + expTime,
    };

    // sign token
    const signedToken = jwt.sign(payload, config.SECRET_KEY);
    return signedToken;
  }
}

User.prototype.create = async (
  account,
  username,
  password,
  passwordConfirmed,
  adim,
  email,
  deparment
) => {
  const TAG = "[UserCreate]";
  const logger = new Logger();
  if (!tool.isValidAccount(account)) {
    logger.error(TAG, `Invalid account : ${account}`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  } else if (!tool.isValidMail(email)) {
    logger.error(TAG, `Invalid email : ${email}`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  } else if (!tool.isValidPwd(password) || password != passwordConfirmed) {
    logger.error(
      TAG,
      `Invalid pwd : ${password}, pwdConfirmed: ${passwordConfirmed}.`
    );
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  } else if (!tool.isValidUserName(username)) {
    logger.error(TAG, `Invalid username : ${username}`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  } else if (!(adim in config.AdimLevel)) {
    logger.error(TAG, `Invalid adimister : ${adim} does not existed.`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  } else if (!(config.department.find((x) => x === deparment) !== undefined)) {
    logger.error(TAG, `Invalid department : ${deparment} does not existed.`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  }

  const [isUniqueAccount, isUniqueUserName, isUniqueEmail] = await Promise.all([
    (async () => {
      const SQL = `
                    SELECT 
                        COUNT(1)
                    FROM userInfo
                    WHERE 1 = 1
                    AND account = ${db.escape(account)}
                `;
      const result = await db.execute(SQL, {});
      return result[0]["COUNT(1)"] > 0 ? false : true;
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
      return result[0]["COUNT(1)"] > 0 ? false : true;
    })(),
    (async () => {
      const SQL = `
                    SELECT 
                        COUNT(1)
                    FROM userInfo
                    WHERE 1 = 1
                    AND email = ${db.escape(email)}
                    AND adim = ${db.escape(adim)}
                `;
      const result = await db.execute(SQL, {});
      return result[0]["COUNT(1)"] > 0 ? false : true;
    })(),
  ]);
  if (!isUniqueAccount) {
    logger.error(TAG, `Invalid account : ${account} already existed.`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  } else if (!isUniqueUserName) {
    logger.error(TAG, `Invalid username : ${username} already existed.`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  } else if (!isUniqueEmail) {
    logger.error(TAG, `Invalid email : ${email} already existed.`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  }

  let user_id = await db.execute("SELECT MAX(user_id) FROM userInfo");
  user_id = user_id[0]["MAX(user_id)"] + 1;
  let SQL = `INSERT INTO userInfo (user_id, account, username, password, 
            adim, createtime, active, email, department)
            VALUE (${user_id}, "${account}", "${username}", "${password}", 
            "${adim}", NOW(), false, "${email}", "${deparment}");`;
  try {
    await db.execute(SQL, {});
    await emailer.SendCreateEmail({ username, email });
    return {
      info: `Insert Data (${user_id}, ${account}, ${username}, ${email}, ${deparment}) to userInfo Success`,
    };
  } catch (err) {
    logger.error(TAG, `Execute MYSQL Failed.`);
    throw exception.BadRequestError("MYSQL Error", "" + err);
  }
};

User.prototype.active = async function (user_id) {
  const TAG = "[UserActive]";
  const logger = new Logger();
  if (config.AdimLevel[this.token.adim] < 2) {
    logger.error(
      TAG,
      `Adiminister (${this.token.adim}) has no access to ${TAG}.`
    );
    return exception.PermissionError("Permission Deny", "have no access");
  }
  let check = await db.execute(
    `SELECT user_id FROM userInfo WHERE user_id = ${user_id}`
  );
  if (check.length === 0) {
    logger.error(TAG, `Invalid user_id : ${user_id} does not existed.`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  }
  const SQL = `UPDATE userInfo SET active = true WHERE user_id=${user_id}`;
  try {
    await db.execute(SQL, {});
    return { info: `UPDATE user actived Success` };
  } catch (err) {
    logger.error(TAG, `Execute MYSQL Failed.`);
    throw exception.BadRequestError("MYSQL Error", "" + err);
  }
};

User.prototype.delete = async function (user_id) {
  const TAG = "[UserDelete]";
  const logger = new Logger();
  if (config.AdimLevel[this.token.adim] < 2) {
    logger.error(
      TAG,
      `Adiminister (${this.token.adim}) has no access to ${TAG}.`
    );
    return exception.PermissionError("Permission Deny", "have no access");
  }
  let check = await db.execute(
    `SELECT user_id FROM userInfo WHERE user_id = ${user_id}`
  );
  if (check.length === 0) {
    logger.error(TAG, `Invalid user_id : ${user_id} does not existed.`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  }
  const SQL = `DELETE FROM userInfo WHERE user_id=${user_id};`;
  try {
    await db.execute(SQL, {});
    return { info: `DELETE user (ID: ${user_id}) Success` };
  } catch (err) {
    logger.error(TAG, `Execute MYSQL Failed.`);
    throw exception.BadRequestError("MYSQL Error", "" + err);
  }
};

User.prototype.login = async function (account, password) {
  const TAG = "[UserLogin]";
  const logger = new Logger();
  if (tool.isNull(account, password)) {
    logger.error(
      TAG,
      `Account: ${account} and password: ${password} can't be empty.`
    );
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  }
  const userObj = await User.getUserInfo(account);
  if (_.isEmpty(userObj)) {
    logger.error(TAG, `User: ${account} isn't exist.`);
    throw exception.BadRequestError(
      "BAD_REQUEST",
      "Invalid account or password."
    );
  }
  if (password !== userObj.password) {
    logger.error(TAG, "Password is not matched.");
    throw exception.BadRequestError(
      "BAD_REQUEST",
      "Invalid account or password."
    );
  }

  const response = {
    user_id: userObj.user_id,
    account: userObj.account,
    email: userObj.email,
    username: userObj.username,
    active: userObj.active,
    adim: userObj.adim,
    token: User.generateToken(userObj),
  };
  if (userObj.adim === "team") {
    let SQL = `SELECT team_id, name, department FROM teamInfo WHERE user_id=${userObj.user_id};`;
    try {
      response.team = await db.execute(SQL, {});
    } catch (err) {
      logger.error(TAG, `Execute MySQL Failed.`);
      throw exception.BadRequestError("MySQL Server Error", "" + err);
    }
    if (response.team.length !== 0) {
      SQL = `SELECT 
                    Home.name AS homeName,
                    Home.department As homeDepartment,
                    Away.name AS awayName,
                    Away.department AS awayDepartment,
                    matchInfo.startDate AS startDate,
                    matchInfo.field AS field,
                    matchInfo.recorder AS recorder,
                    matchInfo.winner AS winner
                FROM matchInfo
                LEFT JOIN teamInfo AS Home ON
                    Home.team_id = matchInfo.home
                LEFT JOIN teamInfo AS Away ON
                    Away.team_id = matchInfo.away
                WHERE matchInfo.home=${response.team[0].team_id} OR matchInfo.away=${response.team[0].team_id};`;
      try {
        response.matches = await db.execute(SQL, {});
      } catch (err) {
        logger.error(TAG, `Execute MySQL Failed.`);
        throw exception.BadRequestError("MySQL Server Error", "" + err);
      }
    }
  }
  logger.info(TAG, `User: ${account} login successfully.`);
  return response;
};

User.prototype.getUserbyId = async function (id) {
  const TAG = "[GETUSERBYID]";
  const logger = new Logger();

  if (config.AdimLevel[this.token.adim] <= 1 && id !== this.token.user_id) {
    logger.error(
      TAG,
      `Adiminister (${this.token.adim}) has no access to ${TAG}.`
    );
    return exception.PermissionError("Permission Deny", "have no access");
  }

  if (!tool.isPositiveInteger(id)) {
    logger.error(TAG, `ID: ${id} is not an integer.`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
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
    return result[0]["COUNT(1)"] > 0 ? false : true;
  })();

  if (!isVaildID) {
    logger.error(TAG, `ID: ${id} doesn't exist.`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  }

  const target =
    config.AdimLevel[this.token.adim] === 2
      ? "user_id, account,  username, adim, createtime, active, email, department"
      : "username, account, adim, email, department";

  const SQL = `SELECT ${target} FROM userInfo WHERE user_id=${id}`;
  try {
    return await db.execute(SQL, {});
  } catch (err) {
    logger.error(TAG, `Execute MySQL Failed.`);
    throw exception.BadRequestError("MySQL Server Error", "" + err);
  }
};

User.prototype.getALL = async function () {
  const TAG = "[GetALLUser]";
  const logger = new Logger();

  const target =
    config.AdimLevel[this.token.adim] === 2
      ? "user_id, account,  username, adim, createtime, active, email, department"
      : "username, adim, email, department";

  const SQL = `SELECT ${target} FROM userInfo;`;

  try {
    return await db.execute(SQL, {});
  } catch (err) {
    logger.error(TAG, `Execute MYSQL Failed.`);
    throw exception.BadRequestError("MYSQL Error", "" + err);
  }
};

User.prototype.remindInfo = async function (email) {
  const TAG = "[SendReminder]";
  const logger = new Logger();
  if (!tool.isValidMail(email)) {
    logger.error(TAG, `Invalid email : ${email}`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  }

  const SQL = `
            SELECT 
                account
            FROM userInfo
            WHERE 1 = 1
            AND email = ${db.escape(email)}
        `;
  const result = await db.execute(SQL, {});

  if (result.length === 0) {
    logger.error(TAG, `Email not found.`);
    throw exception.BadRequestError("BAD_REQUEST", "Email not found");
  }
  const account = result[0]["account"];
  try {
    await emailer.SendRemindEmail(await User.getUserInfo(account));
    return `Send reminder to ${email} success.`;
  } catch (err) {
    logger.error(TAG, `Sent Reminder email Failed.`);
    throw exception.BadRequestError("Email Error", "" + err);
  }
};

User.prototype.getRegister = async function () {
  const TAG = "[GetRegisterData]";
  const logger = new Logger();
  let SQL = "SELECT account, username, email FROM userInfo";
  let output = {};
  try {
    output.user = await db.execute(SQL);
    SQL = "SELECT name FROM teamInfo";
    output.team = await db.execute(SQL);
    return output;
  } catch (err) {
    logger.error(TAG, `Get Register Failed.`);
    throw exception.BadRequestError("User Error", "" + err);
  }
};

User.prototype.update = async function (account, username, email, department) {
  const TAG = "[UpdateUser]";
  const logger = new Logger();
  if (!tool.isValidAccount(account)) {
    logger.error(TAG, `Invalid account : ${account}`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  } else if (!tool.isValidMail(email)) {
    logger.error(TAG, `Invalid email : ${email}`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  } else if (!tool.isValidUserName(username)) {
    logger.error(TAG, `Invalid username : ${username}`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  } else if (!tool.isVaildDepartment(department)) {
    logger.error(TAG, `Invalid department : ${department} does not existed.`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  }

  const [isUniqueAccount, isUniqueUserName, isUniqueEmail] = await Promise.all([
    (async () => {
      const SQL = `
                    SELECT 
                        COUNT(1)
                    FROM userInfo
                    WHERE 1 = 1
                    AND account = ${db.escape(account)}
                    AND user_id != ${this.token.user_id};
                `;
      const result = await db.execute(SQL, {});
      return result[0]["COUNT(1)"] > 0 ? false : true;
    })(),
    (async () => {
      const SQL = `
                    SELECT 
                        COUNT(1)
                    FROM userInfo
                    WHERE 1 = 1
                    AND username = ${db.escape(username)}
                    AND user_id != ${this.token.user_id};
                `;
      const result = await db.execute(SQL, {});
      return result[0]["COUNT(1)"] > 0 ? false : true;
    })(),
    (async () => {
      const SQL = `
                    SELECT 
                        COUNT(1)
                    FROM userInfo
                    WHERE 1 = 1
                    AND email = ${db.escape(email)}
                    AND user_id != ${this.token.user_id};
                `;
      const result = await db.execute(SQL, {});
      return result[0]["COUNT(1)"] > 0 ? false : true;
    })(),
  ]);
  if (!isUniqueAccount) {
    logger.error(TAG, `Invalid account : ${account} already existed.`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  } else if (!isUniqueUserName) {
    logger.error(TAG, `Invalid username : ${username} already existed.`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  } else if (!isUniqueEmail) {
    logger.error(TAG, `Invalid email : ${email} already existed.`);
    throw exception.BadRequestError("BAD_REQUEST", "Invalid parameter.");
  }

  const SQL = `Update userInfo SET 
            account=${db.escape(account)},
            username=${db.escape(username)},
            email=${db.escape(email)},
            department=${db.escape(department)}
        WHERE user_id = ${this.token.user_id};`;

  try {
    await db.execute(SQL, {});
    return `Update user(ID:${this.token.user_id})  success.`;
  } catch (err) {
    logger.error(TAG, `Sent Reminder email Failed.`);
    throw exception.BadRequestError("Email Error", "" + err);
  }
};

module.exports = User;
