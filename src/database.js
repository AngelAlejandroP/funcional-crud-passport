const mysql=require('mysql');
const {database}=require('./keys');
const {promisify}=require('util');

const pool=mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(connection){
        connection.release;
        console.log('Server on line');
        return;
    }
});

pool.query=promisify(pool.query);

module.exports=pool;