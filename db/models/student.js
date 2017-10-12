const db =require('../index');
const Sequelize =require('sequelize')

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
})


module.exports = Student;