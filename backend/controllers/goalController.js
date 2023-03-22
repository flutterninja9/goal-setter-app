const asyncHanlder = require('express-async-handler')
const Goal = require('../models/goalsModel')
const User = require('../models/userModel')

const getGoals = asyncHanlder(
  async (req, res) => {
    const goals = await Goal.find({ user : req.user.id })

    res
    .status(200)
    .json(goals)
  }
)

const getGoalById = asyncHanlder(
  async (req, res) => {
    const goal = await Goal.findOne({ user: req.user.id, id : req.params.id})
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
      user: req.user.id,
      text: req.body.text,
    })
  
    res
      .status(200)
      .json(goal)
  }
)

const updateGoal = asyncHanlder(
  async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
      res.status(400)
      throw new Error("Goald not found!")
    }

    const user = await User.findById(req.user.id)
    if(!user) {
      res.status(401)
      throw new Error('Not Authorized')
    }
    
    if(!goal.user || goal.user.toString() !== user.id) {
      res.status(500)
      throw new Error('Some error occured in updating goal')
    }

    const updatedGoal = await Goal
    .findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res
    .status(200)
    .json(updatedGoal)
  }
)

const deleteGoal =asyncHanlder(
  async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
      res.status(400)
      throw new Error("Goald not found!")
    }

    const user = await User.findById(req.user.id)
    if(!user) {
      res.status(401)
      throw new Error('Not Authorized')
    }
    
    if(!goal.user || goal.user.toString() !== user.id) {
      res.status(500)
      throw new Error('Some error occured in deleting goal')
    }

    await Goal.remove(goal)

    res
    .status(200)
    .json({message: 'Goal removed successfully!'})
  }
)

module.exports = { 
  getGoals, 
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
 }
