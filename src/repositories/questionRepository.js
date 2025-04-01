const Question = require("../models/question");
const Answer = require("../models/answer");
const UserAnswer = require("../models/userAnswer");

class QuestionRepository {
  async getAllQuestions() {
    return await Question.find();
  }

  async getAnswersByQuestionId(questionId) {
    const answers = await Answer.find({ question_id: questionId }).populate(
      "skinType"
    );
    return answers;
  }

  async getAnswersByQuestionIds(questionIds) {
    return await Answer.find({ question_id: { $in: questionIds } }).populate(
      "skinType"
    );
  }

  async saveUserAnswers(userAnswers) {
    return await UserAnswer.create(userAnswers);
  }

  async createQuestion(question) {
    console.log(question);
    return await Question.create(question);
  }

  async updateQuestion(questionId, question) {
    return await Question.findByIdAndUpdate(questionId, question, {
      new: true,
    });
  }

  async deleteQuestion(questionId) {
    return await Question.findByIdAndDelete(questionId);
  }
}

module.exports = new QuestionRepository();
