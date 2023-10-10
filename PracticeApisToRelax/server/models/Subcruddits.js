module.exports = (sequelize, DataTypes) => {
  const Subcruddits = sequelize.define("Subcruddits", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subcrudditName: {
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
      defaultValue: null
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  });

//   Subcruddits.associate = (models) => {

//     Subcruddits.hasMany(models.Moderators, {
//       foreignKey: 'SubcrudditId'
//     })
//     Subcruddits.hasMany(models.Posts, {
//       foreignKey: 'SubcrudditId'
//   })

// }

  return Subcruddits;
};
