const Sequelize = require("sequelize");

const connection = new Sequelize(
  "exoplanets",
  "root",
  "",
  {
  host: "localhost",
  dialect: "mysql"
});

connection.authenticate()
.then(()=>{
  console.log("Conexão estabelicida com MySQL");
}).catch(msgErro=>{
  console.log(msgErro);
});

module.exports={
  connection,
  Sequelize
};
