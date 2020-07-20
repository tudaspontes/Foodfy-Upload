const db = require('../../config/db')
const Files = require('../controllers/files')


module.exports = {
    all() {
        return db.query(`SELECT * FROM files`)
    }
    
}