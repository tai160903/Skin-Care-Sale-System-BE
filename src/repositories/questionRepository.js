const Question = require("../models/question");
const Answer = require("../models/answer");
const UserAnswer = require("../models/userAnswer");
const { text } = require("body-parser");

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

  async updateQuestion(questionId, updateData) {
    const { question, answers } = updateData;

    await Question.findByIdAndUpdate(questionId, { question }, { new: true });

    for (const answer of answers) {
      const { _id, text, skinType } = answer;

      if (_id) {
        await Answer.findByIdAndUpdate(_id, { text, skinType }, { new: true });
      } else {
        await Answer.create({ text, skinType, question_id: questionId });
      }
    }

    return {
      message: "Question and answers updated successfully",
    };
  }

  async deleteQuestion(questionId) {
    return await Question.findByIdAndDelete(questionId);
  }
}

module.exports = new QuestionRepository();
