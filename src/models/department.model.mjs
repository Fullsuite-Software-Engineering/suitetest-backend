import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Department = sequelize.define(
    "Department",
    {
      dept_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dept_name: { type: DataTypes.STRING(255), allowNull: false },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "departments",
      timestamps: false,
    }
  );
  return Department;
};
