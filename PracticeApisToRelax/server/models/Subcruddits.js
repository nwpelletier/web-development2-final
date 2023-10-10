module.exports = (sequelize, DataTypes) => {
  const Subcruddits = sequelize.define("Subcruddits", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    subType: {
      type: DataTypes.ENUM("public", "private"),
      allowNull: false,
    },
    wiki: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    banner: {
      type: DataTypes.STRING(124),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  Subcruddits.associate = (models) => {};

  return Subcruddits;
};
