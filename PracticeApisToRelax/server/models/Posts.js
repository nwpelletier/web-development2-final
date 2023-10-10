module.exports = (sequelize, DataTypes) => {

  const Posts = sequelize.define("Posts", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    postType: {
        //TODO: add types to enum
      type: DataTypes.ENUM('', '', ''),
      allowNull: false,
      },
      content: {
        type: DataTypes.STRING(15000),
        allowNull: false,
      },
      caption: {
        type: DataTypes.STRING(1024),
        allowNull: true,
      },
      mimeType: {
        type: DataTypes.STRING(124),
        allowNull: true,
      },
      childrenCount: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      layer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isLocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isStickied: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      status: {
      type: DataTypes.ENUM('pending', 'approved'),
      allowNull: false,
      },
  });

  Posts.associate = (models) => {
    
  };

  return Posts;
};
 