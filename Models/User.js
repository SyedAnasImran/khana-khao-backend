const connectDb = require("../connectDb");

let User = {
  //QUERIES
  insert_query: `Insert into users(email,password,first_name,last_name) values(:1,:2,:3,:4)`,
  find_query: `SELECT * FROM USERS where EMAIL=:1`,

  //FUNCTIONS
  signUp: function (res, data) {
    console.log(data);
    connectDb().then(async (con) => {
      let result = await con.execute(this.find_query, [data[0]]);
      result = result.rows;
      if (!result.length) {
        await con.execute(this.insert_query, data); // USER CREATED
        con.commit();
        res.send("User Created");
      } else {
        res.send("User Exists");
      }
    });
  },
  logIn: function (res, data) {
    connectDb().then(async (con) => {
      let result = await con.execute(this.find_query, [data[0]]); //data [ email, password ]
      result = result.rows;
      if (!result.length) {
        res.send("User Not Found");
      } else {
        let isMatched =
          data[1] === result[0].PASSWORD ? "LOGGED IN" : "Wrong Password";
        res.send(isMatched);
      }
    });
  },
};

module.exports = User;