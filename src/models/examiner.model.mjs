import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Examiner",
    {
      examiner_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      dept_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "departments",
          key: "dept_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      first_name: { type: DataTypes.STRING(255), allowNull: false },
      last_name: { type: DataTypes.STRING(255), allowNull: false },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "examiners",
      timestamps: false,
    }
  );
