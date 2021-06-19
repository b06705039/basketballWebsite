const db = require(global.__MODULE_BASE__ + 'database');
const Logger = require(global.__MODULE_BASE__ + 'logger');
const exception = require(global.__MODULE_BASE__ + 'exception');
const tool = require(global.__MODULE_BASE__ + 'tool');
const config = require(global.__MODULE_BASE__ + 'config');


class Player {
    constructor(token) {
        this.token = token;
    }
    static async IsVaildPlayerID(player_id) {
        let check = await db.execute(`SELECT player_id FROM playerInfo WHERE team_id = ${player_id}`);
        return (check.length === 0) ? false : true;
    }
}

Player.prototype.create = async function (studentID, teamID, name, grade, number) {
    const TAG = '[PlayerCreate]';
    const logger = new Logger();
    if (this.token.adim !== 'team') {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    if (studentID.length === 0) {
        logger.error(TAG, `studentID can not be empty.`);
        throw exception.BadRequestError('BAD_REQUEST', 'studentID can not be empty.');
    } else if (teamID.length === 0) {
        logger.error(TAG, `teamID can not be empty.`);
        throw exception.BadRequestError('BAD_REQUEST', 'teamID can not be empty.');
    }

    const SQL = `INSERT INTO playerInfo (team_id, name) VALUE (${team_id}, "${name}");`
    try {
        await db.execute(SQL);
        return `INSERT INTO playerInfo VALUE (${player_id}, ${name}) success`;
    } catch (err) {
        logger.error(TAG, `Execute MySQL Failed.`);
        throw exception.BadRequestError('MySQL Server Error', '' + err);
    }
}


Player.prototype.delete = async function (player_id) {
    const TAG = '[PlayerDelete]';
    const logger = new Logger();

    if (config.AdimLevel[this.token.adim] < 2) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    if (!(await Team.IsVaildTeamID(team_id))) {
        logger.error(TAG, `Invalid team_id : ${player_id} does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Player ID (${player_id}) is invalid.');
    }

    const SQL = `DELETE FROM playerInfo WHERE player_id = ${player_id};`;
    console.log(SQL);
    try {
        await db.execute(SQL, {});
        return { info: `Delete player ${player_id} Success` };
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }

}

Player.prototype.getAllbyTeam = async function (team_id) {
    const TAG = `[TeamGetALL]`
    const logger = new Logger();
    if (config.AdimLevel[this.token.adim] < 1) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    const SQL =
        `SELECT 
            name,
            student_id,
            number,
            photo_url,
            grade,
            player_id
        FROM playerInfo WHERE team_id = ${team_id};`
    try {
        return (await db.execute(SQL, {}));
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }
}

Player.prototype.update = async function (player_id, student_id, number, photo_url, grade, name) {
    const TAG = "[TeamUpdate]";
    const logger = new Logger();
    if (this.token.adim !== 'team') {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    const SQL = `UPDATE playerInfo SET student_id=${db.escape(student_id)}, 
                 number=${db.escape(number)}, photo_url=${db.escape(photo_url)}, grade=${db.escape(grade)},
                 name=${db.escape(name)},
                 WHERE player_id=${player_id};`
    try {
        await db.execute(SQL, {});
        return { info: `Update player ${player_id} Success` };
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }
}

module.exports = Player;