import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Result",
    {
      result_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      examiner_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "examiners",
          key: "examiner_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      quiz_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "quizzes",
          key: "quiz_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      score: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM("COMPLETED", "ABANDONED"),
        allowNull: false,
      },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "results",
      timestamps: false,
    }
  );
