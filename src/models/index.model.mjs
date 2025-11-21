import sequelize from "../configs/db.mjs";
import ExaminerModel from "./examiner.model.mjs";
import DepartmentModel from "./department.model.mjs";
import QuizModel from "./quiz.model.mjs";
import QuestionBankModel from "./question_bank.model.mjs";
import AnswerOptionModel from "./answer_option.model.mjs";
import ResultModel from "./result.model.mjs";
import BridgeModel from "./bridge.model.mjs";
import InvitationModel from "./invitation.model.mjs";
import AdminModel from "./admin.model.mjs";

// Initialize models
const Examiner = ExaminerModel(sequelize);
const Department = DepartmentModel(sequelize);
const Quiz = QuizModel(sequelize);
const QuestionBank = QuestionBankModel(sequelize);
const AnswerOption = AnswerOptionModel(sequelize);
const Result = ResultModel(sequelize);
const Bridge = BridgeModel(sequelize);
const Invitation = InvitationModel(sequelize);
const Admin = AdminModel(sequelize);

// Relationships

// Department ↔ Quiz
Department.hasMany(Quiz, { foreignKey: "dept_id" });
Quiz.belongsTo(Department, { foreignKey: "dept_id" });

// Department ↔ Examiner
Department.hasMany(Examiner, { foreignKey: "dept_id" });
Examiner.belongsTo(Department, { foreignKey: "dept_id" });

// Quiz ↔ QuestionBank
Quiz.hasMany(QuestionBank, { foreignKey: "quiz_id" });
QuestionBank.belongsTo(Quiz, { foreignKey: "quiz_id" });

// QuestionBank ↔ AnswerOption
QuestionBank.hasMany(AnswerOption, { foreignKey: "question_id" });
AnswerOption.belongsTo(QuestionBank, { foreignKey: "question_id" });

// Quiz ↔ Result
Quiz.hasMany(Result, { foreignKey: "quiz_id" });
Result.belongsTo(Quiz, { foreignKey: "quiz_id" });

// Examiner ↔ Result
Examiner.hasMany(Result, { foreignKey: "examiner_id" });
Result.belongsTo(Examiner, { foreignKey: "examiner_id" });

// Bridge relationships
Examiner.hasMany(Bridge, { foreignKey: "examiner_id" });
Quiz.hasMany(Bridge, { foreignKey: "quiz_id" });
Result.hasMany(Bridge, { foreignKey: "result_id" });

Bridge.belongsTo(Examiner, { foreignKey: "examiner_id" });
Bridge.belongsTo(Quiz, { foreignKey: "quiz_id" });
Bridge.belongsTo(Result, { foreignKey: "result_id" });

// Invitation relationships
Invitation.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  onDelete: "CASCADE",
});
Invitation.belongsTo(Department, {
  foreignKey: "dept_id",
  onDelete: "CASCADE",
});
Invitation.belongsTo(Examiner, {
  foreignKey: "examiner_id",
  onDelete: "SET NULL",
});

// Reverse relationships (optional but helpful for eager loading)
Quiz.hasMany(Invitation, { foreignKey: "quiz_id" });
Department.hasMany(Invitation, { foreignKey: "dept_id" });
Examiner.hasMany(Invitation, { foreignKey: "examiner_id" });

export {
  sequelize,
  Examiner,
  Department,
  Quiz,
  QuestionBank,
  AnswerOption,
  Result,
  Bridge,
  Invitation,
  Admin,
};
