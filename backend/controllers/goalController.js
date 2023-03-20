const asyncHanlder = require('express-async-handler')
const Goal = require('../models/goalsModel')

const getGoals = asyncHanlder(
  async (req, res) => {
    const goals = await Goal.find()

    res
    .status(200)
    .json(goals)
  }
)

const getGoalById = asyncHanlder(
  async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
      res.status(404)
      throw new Error('Goal not found!')
    }

    res
    .status(200)
    .json(goal)
  }
)

const createGoal = asyncHanlder(
  async (req, res) => {
    if (!req.body.text) {
      res.status(400)
      throw new Error('Please add a text field')
    } 

    const goal = await Goal.create({
      text: req.body.text,
    })
  
    res
      .status(200)
      .json(goal)
  }
)

const updateGoal = asyncHanlder(
  async (req, res) => {
    const goal = await Goal
    .findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    )

    res
    .status(200)
    .json(goal)
  }
)

const deleteGoal =asyncHanlder(
  async (req, res) => {
    const goal = await Goal.findByIdAndDelete(req.params.id)
    res
    .status(200)
    .json(goal)
  }
)

module.exports = { 
  getGoals, 
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
 }
