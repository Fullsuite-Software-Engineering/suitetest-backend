import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "QuestionBank",
    {
      question_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      question_text: { type: DataTypes.TEXT, allowNull: false },
      question_type: {
        type: DataTypes.ENUM("MC", "CB", "TF", "DESC"),
        allowNull: false,
      },
      points: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      explanation: { type: DataTypes.TEXT },
    },
    {
      tableName: "question_bank",
      timestamps: false,
    }
  );
