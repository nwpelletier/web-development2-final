module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: true,
      defaultValue: null
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isLocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    
    // Bypasses including createdAt updatedAt
    timestamps: false, 
  });

  Users.associate = (models) => {
    Users.hasMany(models.Votes, {
        foreignKey: 'UserId'
    })
    Users.hasMany(models.Moderators, {
      foreignKey: 'UserId'
    })
    Users.hasMany(models.Posts, {
      foreignKey: 'UserId'
 })

}
return Users;

  
};
