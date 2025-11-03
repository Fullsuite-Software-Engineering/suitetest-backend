import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Quiz = sequelize.define(
    "Quiz",
    {
      quiz_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dept_id: { type: DataTypes.INTEGER, allowNull: false },
      quiz_name: { type: DataTypes.STRING(255), allowNull: false },
      time_limit: { type: DataTypes.INTEGER },
    },
    {
      tableName: "quizzes",
      timestamps: false,
    }
  );
  return Quiz;
};
