const questionRepository = require("../repositories/questionRepository");
const SkinType = require("../models/SkinType");
const customerRepository = require("../repositories/customerRepository");

class QuestionService {
  async getQuestions() {
    try {
      return await questionRepository.getAllQuestions();
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw new Error("Something went wrong while fetching questions");
    }
  }

  async getAnswers(questionId) {
    try {
      return await questionRepository.getAnswersByQuestionId(questionId);
    } catch (error) {
      console.error("Error fetching answers:", error);
      throw new Error("Something went wrong while fetching answers");
    }
  }

  async submitQuiz(customerId, answers) {
    try {
      const skinTypeCounts = {
        Oily: 0,
        Dry: 0,
        Combination: 0,
        Normal: 0,
        Sensitive: 0,
      };
      const questionIds = answers.map((answer) => answer.questionId);
      const allAnswers = await questionRepository.getAnswersByQuestionIds(
        questionIds
      );
      const answerMap = new Map(allAnswers.map((a) => [a._id.toString(), a]));

      answers.forEach((answer) => {
        const selectedAnswer = answerMap.get(answer.answerId);
        if (selectedAnswer) {
          skinTypeCounts[selectedAnswer.skinType] += 1;
        }
      });

      const maxCount = Math.max(...Object.values(skinTypeCounts));
      const topSkinTypes = Object.keys(skinTypeCounts).filter(
        (type) => skinTypeCounts[type] === maxCount
      );

      const resultSkinType = topSkinTypes[0];
      const skinTypeDoc = await SkinType.findOne({ name: resultSkinType });
      if (!skinTypeDoc) {
        throw new Error("SkinType not found");
      }
      console.log("CustomerId", customerId);
      console.log("skinTypeDoc", skinTypeDoc._id);

      const userQuizResult = {
        customerId,
        answers,
        resultSkinType: skinTypeDoc._id,
      };

      await questionRepository.saveUserAnswers(userQuizResult);
      await customerRepository.updateById(customerId, {
        skinType: skinTypeDoc._id,
      });
      return skinTypeDoc.name;
    } catch (error) {
      console.error("Error submitting quiz:", error);
      throw new Error("Something went wrong while submitting the quiz");
    }
  }

  async getResults(userId) {
    try {
      return await questionRepository.getUserAnswers(userId);
    } catch (error) {
      console.error("Error fetching results:", error);
      throw new Error("Something went wrong while fetching results");
    }
  }

  async createQuiz(questions) {
    try {
      return await questionRepository.createQuiz(questions);
    } catch (error) {
      console.error("Error creating quiz:", error);
      throw new Error("Something went wrong while creating the quiz");
    }
  }

  async updateQuiz(questionId, question) {
    try {
      return await questionRepository.updateQuiz(questionId, question);
    } catch (error) {
      console.error("Error updating quiz:", error);
      throw new Error("Something went wrong while updating the quiz");
    }
  }

  async deleteQuiz(questionId) {
    try {
      return await questionRepository.deleteQuestion(questionId);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      throw new Error("Something went wrong while deleting the quiz");
    }
  }

  async createQuestion(question) {
    try {
      return await questionRepository.createQuestion(question);
    } catch (error) {
      console.error("Error creating question:", error);
      throw new Error("Something went wrong while creating the question");
    }
  }

  async updateQuestion(questionId, question) {
    try {
      return await questionRepository.updateQuestion(questionId, question);
    } catch (error) {
      console.error("Error updating question:", error);
      throw new Error("Something went wrong while updating the question");
    }
  }

  async deleteQuestion(questionId) {
    try {
      return await questionRepository.deleteQuestion(questionId);
    } catch (error) {
      console.error("Error deleting question:", error);
      throw new Error("Something went wrong while deleting the question");
    }
  }
}

module.exports = new QuestionService();
