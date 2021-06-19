const db = require(global.__MODULE_BASE__ + "database");
const Logger = require(global.__MODULE_BASE__ + "logger");
const exception = require(global.__MODULE_BASE__ + "exception");
const tool = require(global.__MODULE_BASE__ + "tool");
const config = require(global.__MODULE_BASE__ + "config");


class Record {
    constructor(token) {
      this.token = token;
    }
}

Record.prototype.createTeamRecord = async function( match_id, team_id ){
    const TAG = "[TeamRecordCreate]"
    const logger = new Logger()

    const SQL = `INSERT INTO teamRecord ( match_id, team_id, time ) VALUE ( "${match_id}", "${team_id}",NOW());`;
    console.log("SQL: ", SQL)
    try{
        await db.execute(SQL);
        return `INSERT INTO TeamRecord success`;
    } catch (err) {
        logger.error(TAG, `Execute MySQL Failed.`)
        throw exception.BadRequestError("MySQL Server Error", ""+err)
    }
}



module.exports = Record;