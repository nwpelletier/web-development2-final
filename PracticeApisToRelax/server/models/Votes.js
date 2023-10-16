module.exports = (sequelize, DataTypes) => {
    const Votes = sequelize.define("Votes", {
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


    Votes.associate = (models) => {
      Votes.belongsTo(models.Users);
      Votes.belongsTo(models.Posts);
  }

  
    return Votes;
  };
  