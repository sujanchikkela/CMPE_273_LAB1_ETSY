const mysql  =  require('mysql')

//connection pool
const db = mysql.createPool({
    host:"etsy.c8lde8fzpxth.us-east-1.rds.amazonaws.com",
    user:"admin",
    password:"Sujan1997",
    database:"etsy",
    port:'3306'
})


//Single connectionn
// var db = mysql.createConnection({
//     host:"etsy.chdckafyrses.ap-south-1.rds.amazonaws.com",
//     user:"admin",
//     password:"akshay1998",
//     database:"etsy",
//     port:'3306'
// });

// db.connect(function(err) {
//     if (err) throw err;
// });


module.exports = db