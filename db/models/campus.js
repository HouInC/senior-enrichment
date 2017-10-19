const db =require('../index');
const Sequelize =require('sequelize');

const Campus = db.define('campus',{
    name : {
        type : Sequelize.STRING,
        allowNull : false,
        unique:true,
        validate : {
            notEmpty : true
        }
    },
    image : {
        type : Sequelize.STRING,
        defaultValue : "http://via.placeholder.com/350x350"
    }
})

module.exports = Campus;