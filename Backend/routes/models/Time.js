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

Time.prototype.update = async function (id, timeString) {
    const TAG = '[TimeUpdate]';
    const logger = new Logger();
    if (config.AdimLevel[this.token.adim] !== 2) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return response.fail(resp, exception.PermissionError('Permission Deny', 'have no access'));
    }
    const tabel = this.token.adim + "Info";
    const timetable = this.token.adim + "Time";
    const Idform = this.token.adim + "_id";
    let SQL = '';
    let check = await db.execute(`SELECT ${Idform} FROM ${tabel} WHERE ${Idform} = ${id}`);
    if (check.length === 0) {
        SQL = `INSERT INTO ${timetable} (${Idform}, timeString) VALUE (${id}, ${timeString})`
    } else {
        SQL = `Update ${timetable} SET timeString="${timeString}" WHERE ${Idform}=${id};`
    }

    try {
        await db.execute(SQL);
        return `${timetable} (${Idform}:${id}) updates timeString success`;
    } catch (err) {
        logger.error(TAG, `Execute MySQL Failed.`);
        throw exception.BadRequestError('MySQL Server Error', '' + err);
    }

}

Time.prototype.delete = async function (id) {
    const TAG = '[TimeDelete]';
    if (config.AdimLevel[this.token.adim] !== 2) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return response.fail(resp, exception.PermissionError('Permission Deny', 'have no access'));
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
        return response.fail(resp, exception.PermissionError('Permission Deny', 'have no access'));
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