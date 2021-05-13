const db = require(global.__MODULE_BASE__ + 'database');
const Logger = require(global.__MODULE_BASE__ + 'logger');
const exception = require(global.__MODULE_BASE__ + 'exception');
const tool = require(global.__MODULE_BASE__ + 'tool');
const config = require(global.__MODULE_BASE__ + 'config');


class Team {
    constructor(token) {
        this.token = token;
    }

    static async IsVaildTeamID(id) {
        let check = await db.execute(`SELECT team_id FROM teamInfo WHERE team_id = ${id}`);
        return (check.length === 0) ? false : true;
    }
}

Team.prototype.create = async function (name, department) {
    const TAG = '[TeamCreate]';
    const logger = new Logger();

    if (name.length === 0) {
        logger.error(TAG, `Name can not be empty.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Name can not be empty.');
    } else if (department.length === 0) {
        logger.error(TAG, `Department can not be empty.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Department can not be empty.');
    }

    const isUniqueName = await (async () => {
        const SQL = `
            SELECT 
                COUNT(1)
            FROM teamInfo
            WHERE 1 = 1
            AND name = ${db.escape(name)}
        ;`;
        const result = await db.execute(SQL, {});
        return result[0]['COUNT(1)'] > 0 ? false : true;
    })()
    if (!isUniqueName) {
        logger.error(TAG, `Invalid Team Name (${name}): Name already existed.`);
        throw exception.BadRequestError('BAD_REQUEST', `Name (${name}) already existed.`);
    }

    if (config.department.find(x => (x === department)) === undefined) {
        logger.error(TAG, `Invalid Department (${department}): Department doesn't exist.`);
        throw exception.BadRequestError('BAD_REQUEST', ` Department (${department}) doesn't exist.`);
    }

    let team_id = (await db.execute("SELECT MAX(team_id) FROM teamInfo;"))[0]['MAX(team_id)'];
    if (tool.isNull(team_id))
        team_id = 1;
    else
        team_id += 1;
    const SQL = `INSERT INTO teamInfo (user_id, team_id, name, department) VALUE (${this.token.user_id}, ${team_id}, "${name}", "${department}");`
    try {
        await db.execute(SQL);
        return `INSERT INTO teamInfo VALUE (${this.token.user_id}, ${team_id}, ${name}, ${department}) success`;
    } catch (err) {
        logger.error(TAG, `Execute MySQL Failed.`);
        throw exception.BadRequestError('MySQL Server Error', '' + err);
    }

}

Team.prototype.status = async function (team_id, status) {
    const TAG = '[TeamStatus]';
    const logger = new Logger();
    if (!(await Team.IsVaildTeamID(team_id))) {
        logger.error(TAG, `Invalid team_id : ${team_id} does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', `Team ID (${team_id}) is invalid.`);
    }

    if (config.teamStatus.find(x => (x === status)) === undefined) {
        logger.error(TAG, `Invalid team status : Status (${status}) does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', ` Status (${status}) is invalid.`);
    }

    const SQL = `UPDATE teamInfo SET status = "${status}" WHERE team_id=${team_id};`;
    try {
        await db.execute(SQL, {});
        return { info: `UPDATE team status to ${status} Success` };
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }
}

Team.prototype.delete = async function (team_id) {
    const TAG = '[TeamDelete]';
    const logger = new Logger();

    if (!(await Team.IsVaildTeamID(team_id))) {
        logger.error(TAG, `Invalid team_id : ${team_id} does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Team ID (${team_id}) is invalid.');
    }

    const SQL = `DELETE FROM teamInfo WHERE team_id = ${team_id};`;
    console.log(SQL);
    try {
        await db.execute(SQL, {});
        return { info: `Delete team ${team_id} Success` };
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }

}

Team.prototype.getInfoByID = async function (team_id) {
    const TAG = '[TeamGetInfo]';
    const logger = new Logger();

    if (!(await Team.IsVaildTeamID(team_id))) {
        logger.error(TAG, `Invalid team_id : ${team_id} does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Team ID (${team_id}) is invalid.');
    }
    const SQL = `SELECT * FROM teamInfo WHERE team_id = ${team_id};`;

    try {
        return (await db.execute(SQL, {}))[0];
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }
}


module.exports = Team;