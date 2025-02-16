const Question = require("../models/question");
const Answer = require("../models/answer");
const UserAnswer = require("../models/userAnswer");

class QuestionRepository {
  async getAllQuestions() {
    return await Question.find();
  }

  async getAnswersByQuestionId(questionId) {
    return await Answer.find({ question_id: questionId });
  }

  async getAnswersByQuestionIds(questionIds) {
    return await Answer.find({ question_id: { $in: questionIds } });
  }

  async saveUserAnswers(userAnswers) {
    return await UserAnswer.create(userAnswers);
  }

  async createQuiz(question) {
    return await Question.create(question);
  }

  async updateQuestion(questionId, question) {
    return await Question.findByIdAndUpdate(questionId, question, {
      new: true,
    });
  }

  async deleteQuestion(questionId) {
    return await Question.findByIdAndUpdate(
      questionId,
      { $set: { isDeleted: true } },
      { new: true }
    );
  }
}

module.exports = new QuestionRepository();
