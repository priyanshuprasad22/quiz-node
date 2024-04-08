const fs= require('fs');

let questions;

try {
    const data = fs.readFileSync('C:/Users/91790/Desktop/Quiz-node-js/question.json', 'utf-8');
    questions = JSON.parse(data);
} catch (err) {
    console.error('Error:', err);
}


const getQuestions = async(req,res)=>{
    // console.log(questions);
    return res.status(200).json(questions);
};

const submitQuestion = (req,res)=>{
    const userAnswers = req.body;
    let score=0;
    const feedback = [];

    questions.forEach((question,index)=>{
        if(userAnswers[index]===question.answer){
            score++;
            feedback.push({question: question.question, correct:true});
        }else{
            feedback.push({question: question.question, correct:false, correctAnswer: question.answer});
        }
    });

    res.status(200).json({score,feedback});
}

module.exports = {getQuestions,submitQuestion};

