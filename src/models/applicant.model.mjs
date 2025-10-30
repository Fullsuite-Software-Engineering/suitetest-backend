import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Applicant = sequelize.define(
    "Applicant",
    {
      applicant_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: { type: DataTypes.STRING(255), allowNull: false },
      last_name: { type: DataTypes.STRING(255), allowNull: false },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    },
    {
      tableName: "applicants",
      timestamps: false,
    }
  );
  return Applicant;
};
