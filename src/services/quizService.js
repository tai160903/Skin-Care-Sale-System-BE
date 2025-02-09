const quizRepository = require("../repositories/quizRepository");

class QuizService {
  async getQuestions() {
    return await quizRepository.getAllQuestions();
  }

  async getAnswers(questionId) {
    console.log("Fetching answers for question id:", questionId);
    const answers = await quizRepository.getAnswersByQuestionId(questionId);
    console.log("Fetched answers:", answers);
    return answers;
  }

  async submitQuiz(userId, answers) {
    let skinTypeCount = {
      Oily: 0,
      Dry: 0,
      Combination: 0,
      Normal: 0,
    };

    // Fetch answer details to count skin types
    for (let answer of answers) {
      const answerData = await quizRepository.getAnswersByQuestionId(
        answer.questionId
      );
      const selectedAnswer = answerData.find(
        (a) => a._id.toString() === answer.answerId
      );
      if (selectedAnswer) {
        skinTypeCount[selectedAnswer.skinType] += 1;
      }
    }

    // Determine the most frequent skin type
    const resultSkinType = Object.keys(skinTypeCount).reduce((a, b) =>
      skinTypeCount[a] > skinTypeCount[b] ? a : b
    );

    // Save result
    const userQuizResult = {
      userId,
      answers,
      resultSkinType,
    };

    return await quizRepository.saveUserAnswers(userQuizResult);
  }
}

module.exports = new QuizService();
