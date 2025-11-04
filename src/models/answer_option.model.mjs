import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "AnswerOption",
    {
      answer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      question_id: { type: DataTypes.INTEGER, allowNull: false },
      option_text: { type: DataTypes.TEXT, allowNull: false },
      is_correct: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "answer_options",
      timestamps: false,
    }
  );
