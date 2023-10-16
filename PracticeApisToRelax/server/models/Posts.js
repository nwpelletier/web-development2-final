module.exports = (sequelize, DataTypes) => {

const Posts = sequelize.define("Posts", {
 id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
},
SubcrudditId: {
    type: DataTypes.INTEGER,
    allowNull: false,
},
parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
},
postId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
},
title: {
    type: DataTypes.STRING(360),
    allowNull: true,
    defaultValue: null
}, 
postType: {
    type: DataTypes.ENUM("image", "text", "comment"),
    allowNull: false,
}, 
content : {
    type: DataTypes.TEXT,
    allowNull: false,
}, 
caption: {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null
},  
children_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
}, 
points : {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
},
layer: {
    type: DataTypes.INTEGER,
    allowNull: false,
},
isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
},
isStickied: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false

}
  });

  Posts.associate = (models) => {

    Posts.hasMany(models.Votes, {
      foreignKey: 'PostId'
    })
    Posts.belongsTo(models.Users);
    Posts.belongsTo(models.Subcruddits);
    

}

  return Posts;
};
 
