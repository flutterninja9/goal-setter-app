const asyncHanlder = require('express-async-handler')

const getGoals = asyncHanlder(
  async (req, res) => {
    res
    .status(200)
    .json({
      message: "Get Goals!",
    })
  }
)

const getGoalById = asyncHanlder(
  async (req, res) => {
    res
    .status(200)
    .json({
      message: `Get Goal: ${req.params.id}`,
    })
  }
)

const createGoal = asyncHanlder(
  async (req, res) => {
    console.log(req.body);
    if (!req.body.text) {
      res.status(400)
      throw new Error('Please add a text field')
    } 
  
    res
      .status(200)
      .json({
        message: `Create Goal`,
      })
  }
)

const updateGoal = asyncHanlder(
  async (req, res) => {
    res
    .status(200)
    .json({
      message: `Update Goal: ${req.params.id}`,
    })
  }
)

const deleteGoal =asyncHanlder(
  async (req, res) => {
    res
    .status(200)
    .json({
      message: `Delete Goal: ${req.params.id}`,
    })
  }
)

module.exports = { 
  getGoals, 
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
 }
