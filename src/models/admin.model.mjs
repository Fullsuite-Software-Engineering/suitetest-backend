import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Admin",
    {
      admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: { type: DataTypes.STRING(255), allowNull: false, uniques: true },
      password: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      tableName: "admins",
      timestamps: false,
    }
  );
};
