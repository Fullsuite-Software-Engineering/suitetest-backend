import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Bridge = sequelize.define(
    "Bridge",
    {
      bridge_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      applicant_id: { type: DataTypes.INTEGER },
      quiz_id: { type: DataTypes.INTEGER },
      result_id: { type: DataTypes.INTEGER },
    },
    {
      tableName: "bridges",
      timestamps: false,
    }
  );
  return Bridge;
};
