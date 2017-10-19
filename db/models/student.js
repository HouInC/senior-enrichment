const db =require('../index');
const Sequelize =require('sequelize')
const Campus = require('./campus');

const Student = db.define('student',{
    name : {
        type: Sequelize.STRING,
        allowNull : false,
        validation :{
            notEmpty : true
        }
    },
    email :{
        type : Sequelize.STRING,
        allowNull : false,
        validation : {
            isEmail : true,
        }
    }
},
    {
        defaultScope: { 
		    include: [Campus]
        }
})


module.exports = Student;