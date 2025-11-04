import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Bridge",
    {
      bridge_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      examiner_id: { type: DataTypes.INTEGER },
      quiz_id: { type: DataTypes.INTEGER },
      result_id: { type: DataTypes.INTEGER },
    },
    {
      tableName: "bridges",
      timestamps: false,
    }
  );
