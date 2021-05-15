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
    if (this.token.adim !== 'team') {
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
            FROM teamInfo
            WHERE 1 = 1
            AND user_id = ${this.token.user_id}
        ;`;
        const result = await db.execute(SQL, {});
        return result[0]['COUNT(1)'] > 0 ? false : true;
    })()

    if (!isUniqueID) {
        logger.error(TAG, `You already have a team`);
        throw exception.BadRequestError('BAD_REQUEST', `You already have a team`);
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

    if (config.AdimLevel[this.token.adim] < 2) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

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

    if (config.AdimLevel[this.token.adim] < 2) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

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

    if (config.AdimLevel[this.token.adim] < 1) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    if (!(await Team.IsVaildTeamID(team_id))) {
        logger.error(TAG, `Invalid team_id : ${team_id} does not existed.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Team ID (${team_id}) is invalid.');
    }

    const SQL =
        `SELECT 
            ${(config.AdimLevel[this.token.adim] >= 2) ? "team_id, status," : ""}
            userInfo.username AS owner,
            userInfo.department AS ownerDepartment,
            userInfo.email AS email,
            name,
            teamInfo.department AS department
        FROM teamInfo
        LEFT JOIN userInfo ON 
            userInfo.user_id = teamInfo.user_id
        WHERE teamInfo.team_id = ${team_id};`;
    try {
        return (await db.execute(SQL, {}))[0];
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }
}

Team.prototype.getALL = async function () {

    if (config.AdimLevel[this.token.adim] < 1) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    const SQL =
        `SELECT 
            ${(config.AdimLevel[this.token.adim] >= 2) ? "team_id, status," : ""}
            userInfo.username AS owner,
            userInfo.department AS ownerDepartment,
            userInfo.email AS email,
            name,
            teamInfo.department AS department
        FROM teamInfo
        LEFT JOIN userInfo ON 
            userInfo.user_id = teamInfo.user_id;`;
    try {
        return (await db.execute(SQL, {}));
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }
}

Team.prototype.update = async function (team_id, name) {
    const TAG = "[TeamUpdate]";
    const logger = new Logger();
    if (this.token.adim !== 'team') {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }
    const RightUser = await (async () => {
        const SQL = `
            SELECT 
                user_id
            FROM teamInfo
            WHERE 1 = 1
            AND  team_id = ${team_id}
        ;`;
        const result = await db.execute(SQL, {});
        return result[0]['user_id'] !== this.token.user_id ? false : true;
    })();

    if (!RightUser) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    if (name.length === 0) {
        logger.error(TAG, `Name can not be empty.`);
        throw exception.BadRequestError('BAD_REQUEST', 'Name can not be empty.');
    }

    const isUniqueName = await (async () => {
        const SQL = `
            SELECT 
                COUNT(1)
            FROM teamInfo
            WHERE 1 = 1
            AND name = ${db.escape(name)}
            AND team_id != ${team_id}
        ;`;
        const result = await db.execute(SQL, {});
        return result[0]['COUNT(1)'] > 0 ? false : true;
    })();

    if (!isUniqueName) {
        logger.error(TAG, `Invalid Team Name (${name}): Name already existed.`);
        throw exception.BadRequestError('BAD_REQUEST', `Name (${name}) already existed.`);
    }

    const SQL = `UPDATE teamInfo SET name=${db.escape(name)} WHERE team_id=${team_id};`
    try {
        await db.execute(SQL, {});
        return { info: `Update team ${team_id} Success` };
    } catch (err) {
        logger.error(TAG, `Execute MYSQL Failed.`);
        throw exception.BadRequestError('MYSQL Error', '' + err);
    }
}

module.exports = Team;