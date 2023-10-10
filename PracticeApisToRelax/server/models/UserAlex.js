


module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users",  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        googleId: {
            type: DataTypes.STRING(2000),
            allowNull: true

        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false

        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(360),
            allowNull: true,
            unique: true

        }



 
    })

    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            foreignKey: 'UserId'
        })
    }
    return Users;
}

