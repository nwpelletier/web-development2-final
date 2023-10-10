module.exports = (sequelize, DataTypes) => {

  const Moderators = sequelize.define("Moderators", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },  
    SubcrudditId : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  });
  Moderators.associate = (models) => {
    Moderators.belongsTo(models.Users);
    Moderators.belongsTo(models.Subcruddits);
}

  return Moderators;
};
 