const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static init(connection) {
    super.init(
      {
        useremail: {
          type: Sequelize.TEXT,
          primaryKey: true,
        },
        name: Sequelize.TEXT,
        whatsappnumber: Sequelize.TEXT,
        password: Sequelize.TEXT,
        avatar: Sequelize.TEXT,
        latitude: Sequelize.DECIMAL,
        longitude: Sequelize.DECIMAL,
      },
      {
        sequelize: connection,
        modelName: 'user',
        freezeTableName: true,
        timestamps: false,
      }
    );
    return this;
  }
}

module.exports = User;
