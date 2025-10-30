import { DataTypes } from "sequelize";

export default (sequelize) => {
  const QuestionBank = sequelize.define(
    "QuestionBank",
    {
      question_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quiz_id: { type: DataTypes.INTEGER, allowNull: false },
      question_text: { type: DataTypes.TEXT, allowNull: false },
      question_type: { type: DataTypes.STRING(20), allowNull: false },
      points: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    },
    {
      tableName: "question_bank",
      timestamps: false,
    }
  );
  return QuestionBank;
};
