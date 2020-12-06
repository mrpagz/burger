// Import MySQL connection.
const connection = require("./connection.js");

// Object for all our SQL statement functions.
class Orm {
  all (tableInput, cb) {
    const queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableInput], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
  create (tableInput, vals, cb) {
    const queryString = "INSERT INTO ?? SET ?";

    console.log(queryString);

    connection.query(queryString, [tableInput, vals], function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
  // An example of objColVals would be {name: panther, sleepy: true}
  update (tableInput, vals, colName, condition, cb) {
    const queryString = "UPDATE ?? SET ? WHERE ?? = ?"

    console.log(queryString);
    connection.query(queryString, [tableInput, vals, colName, condition], function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
  delete (tableInput, vals, cb) {
    const queryString = "DELETE FROM ?? WHERE id = ?";
    
    connection.query(queryString, [tableInput, vals], function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = new Orm(connection);