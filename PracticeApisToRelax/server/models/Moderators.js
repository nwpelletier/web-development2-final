module.exports = (sequelize, DataTypes) => {

  const Moderators = sequelize.define("Moderators", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },  
    SubcrudditId : {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  });

  return Moderators;
};
 