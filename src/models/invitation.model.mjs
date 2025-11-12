import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Invitation",
    {
      invitation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      quiz_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "quizzes",
          key: "quiz_id",
        },
        onDelete: "CASCADE",
      },
      dept_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "dept_id",
        },
        onDelete: "CASCADE",
      },
      examiner_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "examiners",
          key: "examiner_id",
        },
        onDelete: "SET NULL",
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Expiration date of the invitation link",
      },
    },
    {
      tableName: "invitations",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
