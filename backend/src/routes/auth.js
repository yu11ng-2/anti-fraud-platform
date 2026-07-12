const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Register validation
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required()
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // TODO: Hash password and save to database
    res.status(201).json({
      message: 'User registered successfully',
      user: { email: value.email, name: value.name }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: Verify credentials and generate JWT
    res.json({
      message: 'Login successful',
      token: 'jwt-token-here'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
