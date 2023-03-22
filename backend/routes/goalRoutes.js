const express = require('express')
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router()
const { 
  getGoals, 
  getGoalById, 
  createGoal, 
  updateGoal, 
  deleteGoal,
} = require('../controllers/goalController')

router
.route('/')
.get(protect, getGoals)
.post(protect, createGoal)

router
.route('/:id')
.get(protect, getGoalById)
.put(protect, updateGoal)
.delete(protect, deleteGoal)

module.exports = router
