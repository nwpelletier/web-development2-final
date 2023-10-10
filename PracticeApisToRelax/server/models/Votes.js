module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      liked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    });
  
    Users.associate = (models) => {};
  
    return Users;
  };
  