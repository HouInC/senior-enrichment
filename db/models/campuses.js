const db =require('../index');
const Sequelize =require('sequelize');

const Campuses = db.define('campuses',{
    name : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    image : {
        type : Sequelize.STRING
    }
})

module.exports = Campuses;