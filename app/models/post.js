/* ORM FOLDER ========================================
We abstract our database and information-modelling code
into this section
====================================================== */

module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define('Post', {
        name: DataTypes.STRING,
        desc: DataTypes.STRING,
        price: DataTypes.FLOAT,
        stock: DataTypes.INTEGER,
        category: DataTypes.STRING,
        image: DataTypes.STRING
    });
    return Post;
};