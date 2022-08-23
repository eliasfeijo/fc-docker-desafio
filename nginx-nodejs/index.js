const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const sql_drop_table = `DROP TABLE IF EXISTS people`;
connection.query(sql_drop_table);

const sql_create_table = `CREATE TABLE people ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) )`;
connection.query(sql_create_table);
connection.end();

app.get("/", (req, res) => {
  const connection = mysql.createConnection(config);
  const sql = `INSERT INTO people(name) values('Wesley')`;
  connection.query(sql);

  const sql_select = `SELECT name FROM people`;

  let names = "";
  connection.query(sql_select, (err, results) => {
    if (err) throw err;
    names = results.map((result) => `<h2>${result.name}</h2>`).join("<br>");
    res.send(`<h1>Full Cycle Rocks!</h1><br>${names}`);
  });
  connection.end();
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
