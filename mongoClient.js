const MongoClient = require('mongodb').MongoClient
const URL = 'mongodb://localhost/eventsDB'

let _db

module.exports = {
    connect : () =>{
        if(_db){
            return Promise.resolve(_db)
        }else{
            return MongoClient.connect(URL).then((db) => {
                _db = db
                return db
            }).catch( e => {
                throw new Error(e)
            })
        }
    }
}