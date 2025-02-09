const quizRepository = require("../repositories/quizRepository");
const SkinType = require("../models/SkinType");

class QuizService {
  async getQuestions() {
    return await quizRepository.getAllQuestions();
  }

  async getAnswers(questionId) {
    return await quizRepository.getAnswersByQuestionId(questionId);
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
    const allAnswers = await quizRepository.getAnswersByQuestionIds(
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

    return await quizRepository.saveUserAnswers(userQuizResult);
  }
}

module.exports = new QuizService();
