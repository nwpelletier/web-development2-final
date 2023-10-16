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
    wiki: {
      type: DataTypes.STRING(10000),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  });

  Subcruddits.associate = (models) => {

    Subcruddits.hasMany(models.Moderators, {
      foreignKey: 'SubcrudditId'
    })
    Subcruddits.hasMany(models.Posts, {
      foreignKey: 'SubcrudditId'
  })

}

  return Subcruddits;
};
