import { DataTypes } from "sequelize";

export default (sequelize) => {
  const AnswerOption = sequelize.define(
    "AnswerOption",
    {
      answer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      question_id: { type: DataTypes.INTEGER, allowNull: false },
      option_text: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      tableName: "answer_options",
      timestamps: false,
    }
  );
  return AnswerOption;
};
