const db = require(global.__MODULE_BASE__ + 'database');
const Logger = require(global.__MODULE_BASE__ + 'logger');
const exception = require(global.__MODULE_BASE__ + 'exception');
const tool = require(global.__MODULE_BASE__ + 'tool');
const config = require(global.__MODULE_BASE__ + 'config');


class Recorder {
    constructor(token) {
        this.token = token;
    }

    static async IsVaildRecorderID(id) {
        let check = await db.execute(`SELECT recorder_id FROM recorderInfo WHERE recorder_id = ${id}`);
        return (check.length === 0) ? false : true;
    }
}

Recorder.prototype.create = async function (name, department) {
    const TAG = '[RecorderCreate]';
    const logger = new Logger();
    if (this.token.adim !== 'recorder') {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    if (name.length === 0) {
        logger.error(TAG, `Name can not be empty.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Name can not be empty.');
    } else if (department.length === 0) {
        logger.error(TAG, `Department can not be empty.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Department can not be empty.');
    }

    const isUniqueID = await (async () => {
        const SQL = `
            SELECT 
                COUNT(1)
            FROM recorderInfo
            WHERE 1 = 1
            AND user_id = ${this.token.user_id}
        ;`;
        const result = await db.execute(SQL, {});
        return result[0]['COUNT(1)'] > 0 ? false : true;
    })()

    if (!isUniqueID) {
        logger.error(TAG, `You already have a recorder`);
        throw exception.BadRequestError('BAD_REQUEST', `You already have a recorder`);
    }

    const isUniqueName = await (async () => {
        const SQL = `
            SELECT 
                COUNT(1)
            FROM recorderInfo
            WHERE 1 = 1
            AND name = ${db.escape(name)}
        ;`;
        const result = await db.execute(SQL, {});
        return result[0]['COUNT(1)'] > 0 ? false : true;
    })()
    if (!isUniqueName) {
        logger.error(TAG, `Invalid recorder Name (${name}): Name already existed.`);
        throw exception.BadRequestError('BAD_REQUEST', `Name (${name}) already existed.`);
    }

    if (config.department.find(x => (x === department)) === undefined) {
        logger.error(TAG, `Invalid Department (${department}): Department doesn't exist.`);
        throw exception.BadRequestError('BAD_REQUEST', ` Department (${department}) doesn't exist.`);
    }

    let recorder_id = (await db.execute("SELECT MAX(recorder_id) FROM recorderInfo;"))[0]['MAX(recorder_id)'];
    if (tool.isNull(recorder_id))
        recorder_id = 1;
    else
        recorder_id += 1;
    const SQL = `INSERT INTO recorderInfo (user_id, recorder_id, name, department) VALUE (${this.token.user_id}, ${recorder_id}, "${name}", "${department}");`
    try {
        await db.execute(SQL);
        return `INSERT INTO recorderInfo VALUE (${this.token.user_id}, ${recorder_id}, ${name}, ${department}) success`;
    } catch (err) {
        logger.error(TAG, `Execute MySQL Failed.`);
        throw exception.BadRequestError('MySQL Server Error', '' + err);
    }

}

Recorder.prototype.status = async function (recorder_id, status) {
    const TAG = '[RecorderStatus]';
    const logger = new Logger();

    if (config.AdimLevel[this.token.adim] < 2) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    if (!(await Recorder.IsVaildRecorderID(recorder_id))) {
        logger.error(TAG, `Invalid recorder_id : ${recorder_id} does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', `recorder ID (${recorder_id}) is invalid.`);
    }

    if (config.recorderStatus.find(x => (x === status)) === undefined) {
        logger.error(TAG, `Invalid recorder status : Status (${status}) does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', ` Status (${status}) is invalid.`);
    }

    const SQL = `UPDATE recorderInfo SET status = "${status}" WHERE recorder_id=${recorder_id};`;
    try {
        await db.execute(SQL, {});
        return { info: `UPDATE recorder status to ${status} Success` };
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }
}

Recorder.prototype.delete = async function (recorder_id) {
    const TAG = '[RecorderDelete]';
    const logger = new Logger();

    if (config.AdimLevel[this.token.adim] < 2) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    if (!(await recorder.IsVaildrecorderID(recorder_id))) {
        logger.error(TAG, `Invalid recorder_id : ${recorder_id} does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', 'recorder ID (${recorder_id}) is invalid.');
    }

    const SQL = `DELETE FROM recorderInfo WHERE recorder_id = ${recorder_id};`;
    console.log(SQL);
    try {
        await db.execute(SQL, {});
        return { info: `Delete recorder ${recorder_id} Success` };
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }

}

Recorder.prototype.getInfoByID = async function (recorder_id) {
    const TAG = '[RecorderGetInfo]';
    const logger = new Logger();

    if (config.AdimLevel[this.token.adim] < 1) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    if (!(await recorder.IsVaildrecorderID(recorder_id))) {
        logger.error(TAG, `Invalid recorder_id : ${recorder_id} does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', 'recorder ID (${recorder_id}) is invalid.');
    }

    const SQL =
        `SELECT 
            ${(config.AdimLevel[this.token.adim] >= 2) ? "recorder_id, status," : ""}
            userInfo.username AS owner,
            userInfo.department AS ownerDepartment,
            userInfo.email AS email,
            name,
            recorderInfo.department AS department
        FROM recorderInfo
        LEFT JOIN userInfo ON 
            userInfo.user_id = recorderInfo.user_id
        WHERE recorderInfo.recorder_id = ${recorder_id};`;
    try {
        return (await db.execute(SQL, {}))[0];
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }
}

Recorder.prototype.getALL = async function () {
    const TAG = `[RecorderGetALL]`
    const logger = new Logger();
    if (config.AdimLevel[this.token.adim] < 1) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    const SQL =
        `SELECT 
            ${(config.AdimLevel[this.token.adim] >= 2) ? "recorder_id, status," : ""}
            userInfo.username AS owner,
            userInfo.department AS ownerDepartment,
            userInfo.email AS email,
            name,
            recorderInfo.department AS department
        FROM recorderInfo
        LEFT JOIN userInfo ON 
            userInfo.user_id = recorderInfo.user_id;`;
    try {
        return (await db.execute(SQL, {}));
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }
}

Recorder.prototype.update = async function (name, department) {
    const TAG = "[RecorderUpdate]";
    const logger = new Logger();
    if (this.token.adim !== 'recorder') {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }
    const recorder_id = await (async () => {
        const SQL = `
            SELECT 
                recorder_id
            FROM recorderInfo
            WHERE 1 = 1
            AND user_id = ${this.token.user_id}
        ;`;
        const result = await db.execute(SQL, {});
        return (result.length > 0) ? result[0]['recorder_id'] : undefined;
    })();

    if (recorder_id === undefined) {
        logger.error(TAG, `User (${this.token.user_id}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'Have no access');
    }

    if (name.length === 0) {
        logger.error(TAG, `Name can not be empty.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Name can not be empty.');
    } else if (!tool.isVaildDepartment(department)) {
        logger.error(TAG, `Department(${department}) is not valid.`);
        throw exception.BadRequestError('BAD_REQUEST', `Department(${department}) is not valid.`);
    }

    const isUniqueNameAndDeparment = await (async () => {
        const SQL = `
            SELECT 
                COUNT(1)
            FROM recorderInfo
            WHERE 1 = 1
            AND (name = ${db.escape(name)} OR department=${db.escape(department)})
            AND recorder_id != ${team_id}
        ;`;
        const result = await db.execute(SQL, {});
        return result[0]['COUNT(1)'] > 0 ? false : true;
    })();

    if (!isUniqueNameAndDeparment) {
        logger.error(TAG, `Invalid Team Name (${name}): Name already existed.`);
        throw exception.BadRequestError('BAD_REQUEST', `Name (${name}) already existed.`);
    }

    const SQL = `UPDATE recorderInfo SET name=${db.escape(name)}, department=${db.escape(department)} WHERE recorder_id=${recorder_id};`
    try {
        await db.execute(SQL, {});
        return { info: `Update team ${team_id} Success` };
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }
}

Recorder.prototype.getInChargeByID = async function (recorder_id) {
    console.log("into models,")
    const TAG = '[RecorderGetInCharge]';
    const logger = new Logger();

    if (config.AdimLevel[this.token.adim] < 1) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    // if (!(await recorder.IsVaildrecorderID(recorder_id))) {
    //     logger.error(TAG, `Invalid recorder_id : ${recorder_id} does not existed.`);
    //     throw exception.BadRequestError('BAD_REQUEST', 'recorder ID (${recorder_id}) is invalid.');
    // }

    let SQL =
        `SELECT * FROM matchInfo 
        LEFT JOIN (SELECT team_id AS home, name AS homeName FROM teamInfo) AS team ON matchInfo.home=team.home
        LEFT JOIN (SELECT team_id AS away, name AS awayName FROM teamInfo) AS team2 ON matchInfo.away=team2.away
        WHERE recorder=${recorder_id}`;
    try {
        let result = await db.execute(SQL, {})
        return result
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }
}



module.exports = Recorder;