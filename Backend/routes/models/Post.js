const db = require(global.__MODULE_BASE__ + "database");
const Logger = require(global.__MODULE_BASE__ + "logger");
const exception = require(global.__MODULE_BASE__ + "exception");
const tool = require(global.__MODULE_BASE__ + "tool");
const config = require(global.__MODULE_BASE__ + "config");


class Post {
    constructor(token) {
      this.token = token;
    }
  
    static async IsVaildTeamID(id) {
      if(id===null)return true
      
      const SQL = `SELECT team_id FROM post WHERE team_id = ${id}`
      console.log("check team id: ", id, SQL)
      let check = await db.execute( SQL );
      return check.length === 0 ? false : true;
    }
}

Post.prototype.create = async function( type, title_category, title_content, content ){
    const TAG = "[PostCreate]"
    const logger = new Logger()

    if (config.AdimLevel[this.token.adim] < 2) {
        logger.error(TAG, `Adiminister (${this.token.adim}) has no access to ${TAG}.`);
        return exception.PermissionError('Permission Deny', 'have no access');
    }

    const SQL = `INSERT INTO post ( createtime, type, title_category, title_content, content) VALUE (NOW(), "${type}", "${title_category}", "${title_content}", "${content}");`;
    try{
        await db.execute(SQL);
        return `INSERT INTO post success`;
    } catch (err) {
        logger.error(TAG, `Execute MySQL Failed.`)
        throw exception.BadRequestError("MySQL Server Error", ""+err)
    }
}

Post.prototype.getType = async function( type ){
    const TAG = "[PostGetType]"
    const logger = new Logger()

    const SQL = `SELECT * FROM post WHERE type='${type}';`
    try{
        const result = await db.execute(SQL, {})
        return result
    } catch(err) {
        logger.error(TAG, `Execute MySQL Failed.`);
        throw exception.BadRequestError("MySQL Server Error", "" + err)
    }
}


module.exports = Post