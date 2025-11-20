import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Quiz",
    {
      quiz_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      dept_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "dept_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quiz_name: { type: DataTypes.STRING(255), allowNull: false },
      pdf_link: { type: DataTypes.STRING(255), allowNull: true },
      time_limit: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      tableName: "quizzes",
      timestamps: false,
    }
  );
