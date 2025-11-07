import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Department",
    {
      dept_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      dept_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "departments",
      timestamps: false,
    }
  );
