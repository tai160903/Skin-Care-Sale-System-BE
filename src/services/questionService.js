const questionRepository = require("../repositories/questionRepository");
const SkinType = require("../models/SkinType");
const customerRepository = require("../repositories/customerRepository");
const Answer = require("../models/answer");
const Question = require("../models/question");

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
          skinTypeCounts[selectedAnswer.skinType.name] += 1;
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

      const userQuizResult = {
        customerId,
        answers,
        resultSkinType: skinTypeDoc._id,
      };

      await questionRepository.saveUserAnswers(userQuizResult);
      await customerRepository.updateById(customerId, {
        skinType: skinTypeDoc._id,
      });
      return skinTypeDoc;
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

  async createQuiz(questionData) {
    const session = await Question.startSession();
    session.startTransaction();

    try {
      const newQuestion = await Question.create(
        {
          question: questionData.question,
        },
        { session }
      );

      const answers = questionData.answers.map((answer) => ({
        text: answer.text,
        skinType: answer.skinType,
        questionId: newQuestion._id,
      }));

      await Answer.insertMany(answers, { session });

      await session.commitTransaction();
      return { question: newQuestion, answers };
    } catch (error) {
      await session.abortTransaction();
      console.error("Error creating quiz:", error);
      throw new Error("Something went wrong while creating the quiz");
    } finally {
      session.endSession();
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

  async createQuestion(questionData) {
    try {
      const { question, answers } = questionData;

      if (!question || !Array.isArray(answers) || answers.length === 0) {
        throw new Error("Question and answers cannot be empty!");
      }

      const newQuestion = await questionRepository.createQuestion({ question });
      const questionId = newQuestion._id;

      const skinTypeSet = new Set(answers.map((answer) => answer.skinType));
      if (skinTypeSet.size !== answers.length) {
        throw new Error("Answers cannot have duplicate skin types!");
      }

      const answersWithQuestionId = answers.map((answer) => ({
        text: answer.text,
        skinType: answer.skinType,
        question_id: questionId,
      }));

      await Answer.insertMany(answersWithQuestionId);

      return { message: "Successfully created question!", questionId };
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
    console.log(questionId);

    try {
      const deletedQuestion = await questionRepository.deleteQuestion(
        questionId
      );
      if (!deletedQuestion) {
        throw new Error("Question not found");
      }

      await Answer.deleteMany({ question_id: questionId });

      return { message: "Question and answers deleted successfully" };
    } catch (error) {
      console.error("Error deleting question:", error);
      throw new Error("Something went wrong while deleting the question");
    }
  }
}

module.exports = new QuestionService();
