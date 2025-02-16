const questionRepository = require("../repositories/questionRepository");
const SkinType = require("../models/SkinType");

class QuestionService {
  async getQuestions() {
    return await questionRepository.getAllQuestions();
  }

  async getAnswers(questionId) {
    return await questionRepository.getAnswersByQuestionId(questionId);
  }

  async submitQuiz(userId, answers) {
    let skinTypeCount = {
      Oily: 0,
      Dry: 0,
      Combination: 0,
      Normal: 0,
    };

    // Fetch all answers at once (Optimize DB calls)
    const questionIds = answers.map((answer) => answer.questionId);
    const allAnswers = await questionRepository.getAnswersByQuestionIds(
      questionIds
    );

    // Count skin types
    for (let answer of answers) {
      const selectedAnswer = allAnswers.find(
        (a) => a._id.toString() === answer.answerId
      );
      if (selectedAnswer) {
        skinTypeCount[selectedAnswer.skinType] += 1;
      }
    }

    // Determine the most frequent skin type
    const resultSkinTypeName = Object.keys(skinTypeCount).reduce((a, b) =>
      skinTypeCount[a] > skinTypeCount[b] ? a : b
    );

    // Fetch SkinType _id from the database
    const skinTypeDoc = await SkinType.findOne({ name: resultSkinTypeName });
    if (!skinTypeDoc) {
      throw new Error("SkinType not found");
    }

    // Save result
    const userQuizResult = {
      userId,
      answers,
      resultSkinType: skinTypeDoc._id, // Store ObjectId, not string
    };

    return await questionRepository.saveUserAnswers(userQuizResult);
  }

  async getResults(userId) {
    return await questionRepository.getUserAnswers(userId);
  }

  async createQuiz(questions) {
    return await questionRepository.createQuiz(questions);
  }

  async updateQuiz(questionId, question) {
    return await questionRepository.updateQuiz(questionId, question);
  }

  async deleteQuiz(questionId) {
    return await questionRepository.deleteQuiz(questionId);
  }

  async createQuestion(question) {
    return await questionRepository.createQuestion(question);
  }

  async updateQuestion(questionId, question) {
    return await questionRepository.updateQuestion(questionId, question);
  }

  async deleteQuestion(questionId) {
    return await questionRepository.deleteQuestion(questionId);
  }
}

module.exports = new QuestionService();
