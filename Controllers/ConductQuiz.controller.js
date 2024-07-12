const mongoose = require('mongoose');
const ConductQuiz = require('../model/ConductQuiz.model');
const Quiz = require('../model/Test.modal');
const Question = require('../model/question.model');
const User = require('../model/User.model');


exports.startQuiz = async (req, res) => {
  try { 
    const quizId = req.params.quizId;
    const userId = req.user.id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      });
    }

    const conductQuiz = new ConductQuiz({
      quiz: quizId,
      user: userId,
    });

    await conductQuiz.save();

    res.status(200).json({
      success: true,
      message: 'Quiz started successfully',
      data: conductQuiz,
    });
  } catch (error) {
    console.error('Error in startQuiz:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  } 
};

exports.submitAnswer = async (req, res) => {
  try {
    const conductQuizId = req.params.conductQuizId;
    const questionId = req.params.questionId;
    const answer = req.body.answer;

    const conductQuiz = await ConductQuiz.findById(conductQuizId);
    if (!conductQuiz) {
      return res.status(404).json({
        success: false,
        message: 'Conduct quiz not found',
      });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    const existingAnswer = conductQuiz.answers.find((answerObj) => answerObj.question.toString() === questionId);
    if (existingAnswer) {
      existingAnswer.answer = answer;
    } else {
      const answerObject = {
        question: questionId,
        answer,
      };
      conductQuiz.answers.push(answerObject);
    }

    await conductQuiz.save();

    res.status(200).json({
      success: true,
      message: 'Answer submitted successfully',
    });
  } catch (error) {
    console.error('Error in submitAnswer:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
exports.endQuiz = async (req, res) => {
  try {
    const conductQuizId = req.params.conductQuizId;
    const conductQuiz = await ConductQuiz.findById(conductQuizId);
    if (!conductQuiz) {
      return res.status(404).json({
        success: false,
        message: 'Conduct quiz not found',
      });
    }

    const quiz = await Quiz.findById(conductQuiz.quiz);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      });
    }

    const user = await User.findById(conductQuiz.user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    let score = 0;
    for (const answer of conductQuiz.answers) {
      const question = await Question.findById(answer.question);
      if (question.answer === answer.answer) {
        score += question.marks;
      }
      else {
        score -= 1;
      }
    }

    conductQuiz.endTime = Date.now();
    conductQuiz.score = score;

    await conductQuiz.save();

    res.status(200).json({
      success: true,
      message: 'Quiz ended successfully',
      data: conductQuiz,
    });
  } catch (error) {
    console.error('Error in endQuiz:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.getConductQuiz = async (req, res) => {
  try {
    const conductQuizId = req.params.conductQuizId;

    const conductQuiz = await ConductQuiz.findById(conductQuizId)
      .populate('quiz')
      .populate('user')
      .exec();

    if (!conductQuiz) {
      return res.status(404).json({
        success: false,
        message: 'Conduct quiz not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Conduct quiz fetched successfully',
      data: conductQuiz,
    });
  } catch (error) {
    console.error('Error in getConductQuiz:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};