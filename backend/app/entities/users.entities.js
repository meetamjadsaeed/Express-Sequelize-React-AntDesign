const connection = require("../config/db.config");
const Sequelize = require("sequelize");

const users = connection.sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.BIGINT(20).UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    username: {
      type: Sequelize.STRING(191),
    },
    mobileNumber: {
      type: Sequelize.NUMBER(20),
    },
    email: {
      type: Sequelize.STRING(191),
      unique: true,
    },
    password: {
      type: Sequelize.STRING(191),
    },
    remember_token: {
      type: Sequelize.STRING(200),
    },
    wrong_password_attempts: {
      type: Sequelize.INTEGER(4),
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
    deleted_at: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
    freezeTableName: true,
    underscored: true,
  }
);



module.exports = {
  users,
};
