const { Sequelize } = require('sequelize');

// Option 1: Passing a connection UR
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('fullstack', 'root', null, {
  host: 'localhost',
  dialect: 'mysql' 
});

let connectDb = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connectDb