document.addEventListener('DOMContentLoaded', function() {
    const questions = [];
    const quizForm = document.getElementById('quizForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const resultsContainer = document.getElementById('resultsContainer');

    function renderQuestions() {
        questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;

            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options');

            question.options.forEach(option => {
                const optionElement = document.createElement('input');
                optionElement.type = 'radio';
                optionElement.name = `question${index}`;
                optionElement.value = option;
                optionElement.classList.add('option');
                const labelElement = document.createElement('label');
                labelElement.textContent = option;
                labelElement.appendChild(optionElement);
                optionsContainer.appendChild(labelElement);
            });

            questionElement.appendChild(optionsContainer);
            questionsContainer.appendChild(questionElement);
        });
    }

    function fetchQuestions() {
        fetch('/api/quiz/')
        .then(response => response.json())
        .then(data => {
            questions.push(...data); 
            renderQuestions();
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });
    }

    fetchQuestions();

    function handleSubmit(event) {
        event.preventDefault();
    
        const formData = new FormData(quizForm);
        const userAnswers = [];
    
        for (const [key, value] of formData.entries()) {
            userAnswers.push(value);
        }
    
        fetch('/api/quiz/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userAnswers)
        })
        .then(response => response.json())
        .then(data => {
            
            const queryString = `?score=${data.score}&feedback=${JSON.stringify(data.feedback)}`;
            window.location.href = 'result.html' + queryString;
        })
        .catch(error => {
            console.error('Error submitting answers:', error);
        });
    }
    
    
    function renderResults(data) {
        resultsContainer.innerHTML = ''; 

        const scoreElement = document.createElement('p');
        scoreElement.textContent = `Your Score: ${data.score}`;
        resultsContainer.appendChild(scoreElement);

        const feedbackList = document.createElement('ul');
        data.feedback.forEach(feedback => {
            const feedbackItem = document.createElement('li');
            feedbackItem.textContent = feedback.correct ? `Correct: ${feedback.question}` : `Incorrect: ${feedback.question} - Correct Answer: ${feedback.correctAnswer}`;
            feedbackList.appendChild(feedbackItem);
        });
        resultsContainer.appendChild(feedbackList);

        resultsContainer.style.display = 'block';
    }
    quizForm.addEventListener('submit', handleSubmit);

    
});
