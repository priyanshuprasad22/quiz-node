const express = require('express');
const router = express.Router();

const {getQuestions,submitQuestion} = require('../controllers/question');


router.route('/').get(getQuestions);
router.route('/submit').post(submitQuestion);

module.exports = router;