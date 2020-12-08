const connection = require("./connection.js");


// convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    
    
    for (var key in ob) {
      var value = ob[key];
      
      if (Object.hasOwnProperty.call(ob, key)) {
        
        if (typeof value === "string") {
          value = "'" + value + "'";
        }
        
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }


let orm = {
    all: function (tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function (table, vals, cb) {
        console.log("ORM hit!");
        let queryString = `INSERT INTO ${table} (burger_name) VALUES (?)`;

    

        console.log(queryString);

        connection.query(queryString, [vals], function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    update: function (table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table; 

        queryString += " SET ";
      
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if(err) {
                throw err;
            }

            cb(result);
        });
     },
    delete: function (table, condition, cb) { 
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if (err) {
              throw err;
            }
      
            cb(result);
          });
    }
};

module.exports = orm;