import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Result = sequelize.define(
    "Result",
    {
      result_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      applicant_id: { type: DataTypes.INTEGER, allowNull: false },
      quiz_id: { type: DataTypes.INTEGER, allowNull: false },
      score: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "results",
      timestamps: false,
    }
  );
  return Result;
};
