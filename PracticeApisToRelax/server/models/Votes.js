module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      liked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  
    Users.associate = (models) => {};
  
    return Users;
  };
  