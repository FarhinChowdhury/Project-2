/* ORM FOLDER ========================================
We abstract our database and information-modelling code
into this section
====================================================== */

module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define('Post', {
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        stock: DataTypes.INTEGER,
        category: DataTypes.STRING
    });
    return Post;
};