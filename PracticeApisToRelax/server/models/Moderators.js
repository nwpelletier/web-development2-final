module.exports = (sequelize, DataTypes) => {

  const Moderators = sequelize.define("Moderators", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },   
  });

  return Moderators;
};
 