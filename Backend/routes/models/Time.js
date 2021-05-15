const db = require(global.__MODULE_BASE__ + 'database');
const Logger = require(global.__MODULE_BASE__ + 'logger');
const exception = require(global.__MODULE_BASE__ + 'exception');
const tool = require(global.__MODULE_BASE__ + 'tool');
const config = require(global.__MODULE_BASE__ + 'config');


class Time {
    constructor(token) {
        this.token = token;
    }
}

Time.prototype.update = async function (timeString) {
    const TAG = '[TimeUpdate]';
    const logger = new Logger();

    if (config.AdimLevel[this.token.adim] !== 1) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }
    const tabel = this.token.adim + "Info";
    const timetable = this.token.adim + "Time";
    const Idform = this.token.adim + "_id";

    let check = await db.execute(`SELECT ${Idform} FROM ${tabel} WHERE user_id = ${this.token.user_id}`);
    if (check.length === 0) {
        logger.error(TAG, `User ID:${this.token.user_id} has not team`);
        throw exception.BadRequestError('BAD_REQUEST', 'Name can not be empty.');
    }
    let SQL = `SELECT timeString FROM ${timetable} WHERE ${Idform} = ${check[0][Idform]}`;
    let checkTime = await db.execute(SQL);
    if (checkTime.length !== 0)
        SQL = `Update ${timetable} SET timeString="${timeString}" WHERE ${Idform}=${check[0][Idform]};`
    else
        SQL = `Insert into ${timetable} (${Idform}, timeString) VALUE (${check[0][Idform]}, "${timeString}");`
    try {
        await db.execute(SQL);
        return `${timetable} (${Idform}:${check[0][Idform]}) updates timeString success`;
    } catch (err) {
        logger.error(TAG, `Execute MySQL Failed.`);
        throw exception.BadRequestError('MySQL Server Error', '' + err);
    }

}

Time.prototype.getTime = async function () {
    const TAG = '[TimeUpdate]';
    const logger = new Logger();

    if (config.AdimLevel[this.token.adim] !== 1) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }
    const table = this.token.adim + "Info";
    const timetable = this.token.adim + "Time";
    const Idform = this.token.adim + "_id";

    let check = await db.execute(`SELECT ${Idform} FROM ${table} WHERE user_id = ${this.token.user_id}`);
    if (check.length === 0) {
        logger.error(TAG, `User ID:${this.token.user_id} has not team`);
        throw exception.BadRequestError('BAD_REQUEST', `User ID:${this.token.user_id} has no team.`);
    }
    let SQL =
        `SELECT 
            ${timetable}.timeString AS timeString 
        FROM userInfo
        LEFT JOIN ${table}
            ON  ${table}.user_id=userInfo.user_id
        LEFT JOIN ${timetable} 
            ON ${timetable}.${Idform}=${table}.${Idform}
        WHERE userInfo.user_id=${this.token.user_id}`;

    try {
        let result = await db.execute(SQL);
        let output = [];
        if (result.length !== 0 && result[0]['timeString'] !== null) {
            let timeItems = result[0]['timeString'].split(',');
            for (let i = 0; i < timeItems.length; i++) {
                if (!tool.isDate(timeItems[i]))
                    continue;
                const startDate = new Date(timeItems[i]);
                const endDate = new Date(timeItems[i]);
                endDate.setHours(startDate.getHours() + 1);
                output.push({ startDate, endDate });
            }
        };
        return output;
    } catch (err) {
        logger.error(TAG, `Execute MySQL Failed.`);
        throw exception.BadRequestError('MySQL Server Error', '' + err);
    }

}

Time.prototype.delete = async function (id) {
    const TAG = '[TimeDelete]';
    if (config.AdimLevel[this.token.adim] !== 1) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    const tabel = this.token.adim + "Info";
    const timetable = this.token.adim + "Time";
    const Idform = this.token.adim + "_id";
    let check = await db.execute(`SELECT ${Idform} FROM ${tabel} WHERE ${Idform} = ${id}`);
    if (check.length === 0) {
        logger.error(TAG, `Invalid ${Idform} ${id} does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', `Invalid ${Idform} ${id} does not existed.`);
    }

    const SQL = `DELETE FROM ${timetable} WHERE ${Idform} = ${id};`;
    try {
        await db.execute(SQL, {});
        return { info: `Delete TimeString (${Idform}: ${id}) Success` };
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }

}

Time.prototype.getALL = async function () {
    const TAG = '[TimeGetALLInfo]';
    const logger = new Logger();
    if (config.AdimLevel[this.token.adim] < 2) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }
    try {
        let output = {}
        let SQL =
            `SELECT 
                teamTime.timeString AS times,
                teamInfo.name AS name,
                teamInfo.department AS department
            FROM teamTime
            LEFT JOIN teamInfo ON
                teamTime.team_id = teamInfo.team_id;
                `
        output.teamTimes = await db.exception(SQL, {});
        SQL =
            `SELECT 
            recorderTime.timeString AS times,
            recorderInfo.name AS name,
            recorderInfo.department AS department
        FROM recorderTime
        LEFT JOIN recorderInfo ON
            recorderTime.recorder_id = recorderInfo.recorder_id;
            `
        output.recorderTimes = await db.exception(SQL, {});

        output.teamTimes.times = output.teamTimes.times.split(',').map(time => Date(time))
        output.recorderTimes.times = output.recorderTimes.times.split(',').map(time => Date(time))
        return output;
    } catch {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }
}


module.exports = Time;