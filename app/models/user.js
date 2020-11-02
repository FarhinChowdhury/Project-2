const bcrypt = require('bcryptjs')

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: {
            type:DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // validates password
    User.prototype.validPassword = function(password){
        return bcrypt.compareSync(password, this.password)
    }

    User.addHook('beforeCreate', function(user){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    })

    return User;
};

