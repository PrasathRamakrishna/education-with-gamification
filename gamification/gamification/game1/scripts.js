// Objects and their combinations
const questions = [
    { object1: "Sun", object2: "Glasses", answer: "Sunglasses" },
    { object1: "Rain", object2: "Bow", answer: "Rainbow" },
    { object1: "Butter", object2: "Fly", answer: "Butterfly" },
    { object1: "Snow", object2: "Man", answer: "Snowman" },
    { object1: "Star", object2: "Fish", answer: "Starfish" }
];

let currentQuestion = 0;

// Initialize the game
function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('object-1').textContent = question.object1;
    document.getElementById('object-2').textContent = question.object2;
    document.getElementById('answer-input').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-button').style.display = 'none';
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestion].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        document.getElementById('feedback').textContent = 'Correct! 🎉';
        document.getElementById('next-button').style.display = 'inline-block';
    } else {
        document.getElementById('feedback').textContent = 'Try again!';
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('question-container').innerHTML = 'Congratulations! You completed the game! 🎉';
        document.getElementById('answer-input').style.display = 'none';
        document.getElementById('submit-button').style.display = 'none';
        document.getElementById('next-button').style.display = 'none';
    }
}

// Event listeners
document.getElementById('submit-button').addEventListener('click', checkAnswer);
document.getElementById('next-button').addEventListener('click', nextQuestion);

// Load the first question
loadQuestion();
