const db = require(global.__MODULE_BASE__ + "database");
const Logger = require(global.__MODULE_BASE__ + "logger");
const exception = require(global.__MODULE_BASE__ + "exception");
const tool = require(global.__MODULE_BASE__ + "tool");
const config = require(global.__MODULE_BASE__ + "config");
const Team = require("./Team");
const Recorder = require("./Recorder");
class Match {
  constructor(token) {
    this.token = token;
  }

  static async IsVaildMatchID(id) {
    let check = await db.execute(
      `SELECT match_id FROM matchInfo WHERE match_id = ${id}`
    );
    return check.length === 0 ? false : true;
  }
}

Match.prototype.create = async function (home_id, away_id) {
  const TAG = "[MatchCreate]";
  const logger = new Logger();
  console.log(this.token);
  if (config.AdimLevel[this.token.adim] < 2) {
    logger.error(
      TAG,
      `Adiminister (${this.token.adim}) has no access to ${TAG}.`
    );
    return exception.PermissionError("Permission Deny", "have no access");
  }

  if (!(await Team.IsVaildTeamID(home_id))) {
    logger.error(TAG, `Invalid Home ID (${home_id}).`);
    throw exception.BadRequestError(
      "BAD_REQUEST",
      `Invalid Home ID (${home_id}).`
    );
  }

  if (!(await Team.IsVaildTeamID(away_id))) {
    logger.error(TAG, `Invalid Away ID (${away_id}).`);
    throw exception.BadRequestError(
      "BAD_REQUEST",
      `Invalid Away ID (${away_id}).`
    );
  }

  let match_id = (await db.execute("SELECT MAX(match_id) FROM matchInfo;"))[0][
    "MAX(match_id)"
  ];
  if (tool.isNull(match_id)) match_id = 1;
  else match_id += 1;

  const SQL = `INSERT INTO matchInfo (match_id, home, away) VALUE (${match_id}, ${home_id}, ${away_id});`;
  try {
    await db.execute(SQL);
    return `INSERT INTO matchInfo (${match_id}, ${home_id}, ${away_id}) success`;
  } catch (err) {
    logger.error(TAG, `Execute MySQL Failed.`);
    throw exception.BadRequestError("MySQL Server Error", "" + err);
  }
};

Match.prototype.delete = async function (match_id) {
  const TAG = "[MatchDelete]";
  const logger = new Logger();

  if (config.AdimLevel[this.token.adim] < 2) {
    logger.error(
      TAG,
      `Adiminister (${this.token.adim}) has no access to ${TAG}.`
    );
    return exception.PermissionError("Permission Deny", "have no access");
  }

  if (!(await Match.IsVaildMatchID(match_id))) {
    logger.error(TAG, `Invalid Match ID ${match_id}.`);
    throw exception.BadRequestError(
      "BAD_REQUEST",
      `Match ID (${match_id}) is invalid.`
    );
  }

  const SQL = `DELETE FROM matchInfo WHERE match_id = ${match_id};`;
  try {
    await db.execute(SQL, {});
    return { info: `Delete match ID ${match_id} Success` };
  } catch (err) {
    logger.error(TAG, `Execute MYSQL Failed.`);
    throw exception.BadRequestError("MYSQL Error", "" + err);
  }
};

Match.prototype.getInfoByID = async function (match_id) {
  const TAG = "[MatchGetInfoByID]";
  const logger = new Logger();

  if (config.AdimLevel[this.token.adim] < 1) {
    logger.error(
      TAG,
      `Adiminister (${this.token.adim}) has no access to ${TAG}.`
    );
    return exception.PermissionError("Permission Deny", "have no access");
  }

  if (!(await Match.IsVaildMatchID(match_id))) {
    logger.error(TAG, `Invalid Match ID ${match_id}.`);
    throw exception.BadRequestError(
      "BAD_REQUEST",
      `Match ID (${match_id}) is invalid.`
    );
  }

  const SQL = `SELECT 
            ${
              config.AdimLevel[this.token.adim] >= 2
                ? "matchInfo.match_id AS id,"
                : ""
            }
            Home.name AS home,
            Home.department As homeDepartment,
            ${
              config.AdimLevel[this.token.adim] >= 2
                ? "Home.status As homeStatus,"
                : ""
            }
            Away.name AS away,
            Away.department AS awayDepartment,
            ${
              config.AdimLevel[this.token.adim] >= 2
                ? "Away.status As awayStatus,"
                : ""
            }
            matchInfo.startDate AS startDate, 
            matchInfo.field AS field, 
            matchInfo.recorder AS recorder,
            matchInfo.winner AS winner
            FROM matchInfo
        LEFT JOIN teamInfo AS Home ON 
            Home.team_id = matchInfo.home
        LEFT JOIN teamInfo AS Away ON 
            Away.team_id = matchInfo.away
        WHERE matchInfo.match_id = ${match_id};`;

  try {
    return (await db.execute(SQL, {}))[0];
  } catch (err) {
    logger.error(TAG, `Execute MYSQL Failed.`);
    throw exception.BadRequestError("MYSQL Error", "" + err);
  }
};

Match.prototype.getALL = async function () {
  const TAG = "[MatchGetALLInfo]";
  const logger = new Logger();

  if (config.AdimLevel[this.token.adim] < 1) {
    logger.error(
      TAG,
      `Adiminister (${this.token.adim}) has no access to ${TAG}.`
    );
    return exception.PermissionError("Permission Deny", "have no access");
  }

  const SQL = `SELECT 
            ${
              config.AdimLevel[this.token.adim] >= 2
                ? "matchInfo.match_id AS id,"
                : ""
            }
            Home.name AS home,
            Home.department As homeDepartment,
            ${
              config.AdimLevel[this.token.adim] >= 2
                ? "Home.status As homeStatus,"
                : ""
            }
            Away.name AS away,
            Away.department As awayDepartment,
            ${
              config.AdimLevel[this.token.adim] >= 2
                ? "Away.status As awayStatus,"
                : ""
            }
            matchInfo.startDate AS startDate, 
            matchInfo.field AS field,
            matchInfo.recorder AS recorder_id,
            recorderInfo.name AS recorder,
            matchInfo.winner AS winner
            FROM matchInfo
        LEFT JOIN teamInfo AS Home ON 
            Home.team_id = matchInfo.home
        LEFT JOIN teamInfo AS Away ON 
            Away.team_id = matchInfo.away
        LEFT JOIN recorderInfo ON 
            recorderInfo.recorder_id = matchInfo.recorder;`;

  try {
    let results = await db.execute(SQL, {});
    results.forEach((match) => {
      if (!tool.isNull(match.startDate)) {
        match.arranged = true;
      } else {
        match.arranged = false;
      }
    });
    return results;
  } catch (err) {
    logger.error(TAG, `Execute MYSQL Failed.`);
    throw exception.BadRequestError("MYSQL Error", "" + err);
  }
};

Match.prototype.update = async function (
  match_id,
  startDate,
  field,
  recorder_id
) {
  const TAG = "[MatchUpdate]";
  const logger = new Logger();

  if (config.AdimLevel[this.token.adim] < 2) {
    logger.error(
      TAG,
      `Adiminister (${this.token.adim}) has no access to ${TAG}.`
    );
    return exception.PermissionError("Permission Deny", "have no access");
  }

  if (!(await Match.IsVaildMatchID(match_id))) {
    logger.error(TAG, `Invalid Match ID ${match_id}.`);
    throw exception.BadRequestError(
      "BAD_REQUEST",
      `Match ID (${match_id}) is invalid.`
    );
  }

  if (field !== 0 && field !== 1) {
    field = null;
  } else if (!Recorder.IsVaildRecorderID(recorder_id) && recorder_id !== null) {
    recorder_id = null;
  }

  const SQL = `UPDATE matchInfo SET 
            startDate = ${startDate ? `"${startDate}"` : "NULL"},
            field =${field},
            recorder=${recorder_id}
        WHERE match_id = ${match_id};`;
  try {
    await db.execute(SQL, {});
    return `Update (startDate = "${
      startDate || "NULL"
    }" field = ${field} recorder= ${recorder_id || "NULL"}) success.`;
  } catch (err) {
    logger.error(TAG, `Execute MYSQL Failed.`);
    throw exception.BadRequestError("MYSQL Error", "" + err);
  }
};

module.exports = Match;
