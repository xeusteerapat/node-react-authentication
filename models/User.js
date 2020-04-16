module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );

  User.associate = models => {
    User.hasOne(models.Counter, { foreignKey: 'user_id' });
  };

  return User;
};
