module.exports = (sequelize, DataTypes) => {
  const Counter = sequelize.define(
    'Counter',
    {
      currentCount: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false
    }
  );

  Counter.associate = models => {
    Counter.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Counter;
};
