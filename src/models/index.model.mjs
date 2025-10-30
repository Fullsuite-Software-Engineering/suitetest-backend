import sequelize from "../configs/db.mjs";
import ApplicantModel from "./applicant.model.mjs";
import DepartmentModel from "./department.model.mjs";
import QuizModel from "./quiz.model.mjs";
import QuestionBankModel from "./questionBank.model.mjs";
import AnswerOptionModel from "./answerOption.model.mjs";
import ResultModel from "./result.model.mjs";
import BridgeModel from "./bridge.model.mjs";
import TestLinkModel from "./testLink.model.mjs";

// Init models
const Applicant = ApplicantModel(sequelize);
const Department = DepartmentModel(sequelize);
const Quiz = QuizModel(sequelize);
const QuestionBank = QuestionBankModel(sequelize);
const AnswerOption = AnswerOptionModel(sequelize);
const Result = ResultModel(sequelize);
const Bridge = BridgeModel(sequelize);
const TestLink = TestLinkModel(sequelize);

// Associations
Department.hasMany(Quiz, { foreignKey: "dept_id" });
Quiz.belongsTo(Department, { foreignKey: "dept_id" });

Quiz.hasMany(QuestionBank, { foreignKey: "quiz_id" });
QuestionBank.belongsTo(Quiz, { foreignKey: "quiz_id" });

QuestionBank.hasMany(AnswerOption, { foreignKey: "question_id" });
AnswerOption.belongsTo(QuestionBank, { foreignKey: "question_id" });

Applicant.hasMany(Result, { foreignKey: "applicant_id" });
Result.belongsTo(Applicant, { foreignKey: "applicant_id" });

Quiz.hasMany(Result, { foreignKey: "quiz_id" });
Result.belongsTo(Quiz, { foreignKey: "quiz_id" });

Applicant.hasMany(Bridge, { foreignKey: "applicant_id" });
Bridge.belongsTo(Applicant, { foreignKey: "applicant_id" });

Quiz.hasMany(Bridge, { foreignKey: "quiz_id" });
Bridge.belongsTo(Quiz, { foreignKey: "quiz_id" });

Result.hasOne(Bridge, { foreignKey: "result_id" });
Bridge.belongsTo(Result, { foreignKey: "result_id" });

Applicant.hasMany(TestLink, { foreignKey: "applicant_id" });
TestLink.belongsTo(Applicant, { foreignKey: "applicant_id" });

Quiz.hasMany(TestLink, { foreignKey: "quiz_id" });
TestLink.belongsTo(Quiz, { foreignKey: "quiz_id" });

// Export all models
export {
  sequelize,
  Applicant,
  Department,
  Quiz,
  QuestionBank,
  AnswerOption,
  Result,
  Bridge,
  TestLink,
};
