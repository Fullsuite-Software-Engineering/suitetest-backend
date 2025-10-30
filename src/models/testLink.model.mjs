import { DataTypes } from "sequelize";

export default (sequelize) => {
  const TestLink = sequelize.define(
    "TestLink",
    {
      link_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      applicant_id: { type: DataTypes.INTEGER, allowNull: false },
      quiz_id: { type: DataTypes.INTEGER, allowNull: false },
      unique_token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      ip_address: { type: DataTypes.STRING(50) },
      issued_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      expires_at: { type: DataTypes.DATE, allowNull: false },
      is_used: { type: DataTypes.BOOLEAN, defaultValue: false },
      used_at: { type: DataTypes.DATE },
      status: { type: DataTypes.STRING(20), defaultValue: "active" },
    },
    {
      tableName: "test_links",
      timestamps: false,
    }
  );
  return TestLink;
};
