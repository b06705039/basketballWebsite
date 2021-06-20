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

Player.prototype.create = async function (number, name, team_id, grade, student_id) {
    const TAG = '[PlayerCreate]';
    const logger = new Logger();
    if (this.token.adim !== 'team') {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    if (student_id.length === 0) {
        logger.error(TAG, `studentID can not be empty.`);
        throw exception.BadRequestError('BAD_REQUEST', 'studentID can not be empty.');
    } else if (team_id.length === 0) {
        logger.error(TAG, `teamID can not be empty.`);
        throw exception.BadRequestError('BAD_REQUEST', 'teamID can not be empty.');
    }

    let player_id = (await db.execute("SELECT MAX(player_id) FROM playerInfo;"))[0]['MAX(player_id)'];
    if (tool.isNull(player_id))
        player_id = 1;
    else
        player_id += 1;

    const SQL = `INSERT INTO playerInfo (player_id, team_id, name, number, student_id, grade) VALUE (${player_id}, ${team_id}, "${name}", ${number}, "${student_id}", ${grade});`
    try {
        await db.execute(SQL);
        return`INSERT INTO playerInfo (player_id, team_id, name, number, student_id, grade) VALUE (${player_id}, ${team_id}, "${name}", ${number}, "${student_id}", ${grade}) success`;
    } catch (err) {
        logger.error(TAG, `Execute MySQL Failed.`);
        throw exception.BadRequestError('MySQL Server Error', '' + err);
    }
}


Player.prototype.delete = async function (player_id) {
    const TAG = '[PlayerDelete]';
    const logger = new Logger();

    if (config.AdimLevel[this.token.adim] < 1) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
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

Player.prototype.update = async function ({player_id, student_id, number, grade, name}) {
    const TAG = "[TeamUpdate]";
    const logger = new Logger();
    if (this.token.adim !== 'team') {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    const SQL = `UPDATE playerInfo SET student_id=${db.escape(student_id)}, 
                 number=${db.escape(number)}, grade=${db.escape(grade)},
                 name=${db.escape(name)}
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