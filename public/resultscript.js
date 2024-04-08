document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score');
    const feedback = JSON.parse(urlParams.get('feedback'));

    const scoreElement = document.getElementById('score');
    const feedbackList = document.getElementById('feedbackList');

    if (score && feedback) {
        scoreElement.textContent = score;

        feedback.forEach(item => {
            const feedbackItem = document.createElement('li');
            feedbackItem.classList.add('feedback-item');
            
            const feedbackText = document.createElement('p');
            feedbackText.textContent = item.correct ? `Correct: ${item.question}` : `Incorrect: ${item.question} - Correct Answer: ${item.correctAnswer}`;
            feedbackText.classList.add(item.correct ? 'correct' : 'incorrect');
            
            feedbackItem.appendChild(feedbackText);
            feedbackList.appendChild(feedbackItem);
        });
    } else {
        scoreElement.textContent = 'No quiz results found.';
    }
});
