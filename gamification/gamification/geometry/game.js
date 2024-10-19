let currentQuestion;
let correctAnswer;
let score = 0;
let level = 1;

// Generate a random algebraic question
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1-10
    const num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1-10

    // Create a basic equation: num1 * x = num2
    currentQuestion = `${num1} * x = ${num2}`;
    correctAnswer = num2 / num1;

    document.getElementById("question").innerText = `Solve for x: ${currentQuestion}`;
    document.getElementById("feedback").innerText = "";
}

// Check the student's answer
function submitAnswer() {
    const userAnswer = parseFloat(document.getElementById("answer").value);
    
    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("feedback").innerText = `Correct! Score: ${score}`;
        levelUp();
    } else {
        document.getElementById("feedback").innerText = `Incorrect! Try again.`;
    }

    document.getElementById("answer").value = "";
    generateQuestion();
}

// Increase difficulty by advancing levels
function levelUp() {
    if (score % 5 === 0) {
        level++;
        alert(`Congratulations! You've reached level ${level}`);
        increaseDifficulty();
    }
}

// Adjust the difficulty as levels progress
function increaseDifficulty() {
    // You can introduce more complex equations as the levels increase
    // E.g., move from multiplication to multi-step equations
}

// Start with the first question
generateQuestion();
