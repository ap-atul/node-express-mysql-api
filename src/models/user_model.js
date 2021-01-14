const query = require('../db/db_connection');
const { placeholder } = require('../utils/common');

class UserModel {
    // table for the db
    tableName = 'user';

    find = async(params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length){
            return await query(sql);
        }

        const {columnSet, values} = placeholder(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }
}