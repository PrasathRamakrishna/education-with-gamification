// Array of levels, each containing its own set of images and questions
const levels = [
    {
        levelNumber: 1,
        images: [
            {
                src: 'image/img1.jpg',
                questions: [
                    { question: "How many edibles are there?", answer: ["3", "three"] },
                    { question: "What color was the cup shown?", answer: ["blue"] }
                ]
            },
            {
                src: 'image/img2.jpg',
                questions: [
                    { question: "How many wheels in the skateboard?", answer: ["2", "two"] },
                    { question: "What is the date on the calendar?", answer: ["11", "eleven"] },
                    { question: "Does the image have any tree?", answer: ["no", "n"] }
                ]
            }
        ]
    },
    {
        levelNumber: 2,
        images: [
            {
                src: 'image/img3.jpg',
                questions: [
                    { question: "How many balls in the image?", answer: ["3", "three"] },
                    { question: "Which country flag do you see in the image?", answer: ["america", "us"] },
                    { question: "Is the timer visible in the image?", answer: ["yes", "y"] }
                ]
            },
            // Add more images for Level 2
        ]
    }
    // Add more levels as needed
];

let currentLevelIndex = 0;
let currentImageIndex = 0;
let currentQuestionIndex = 0;
let score = 0;

// Function to display the image for a set time
function showImage() {
    const imageContainer = document.getElementById('imageContainer');
    const questionContainer = document.getElementById('questionContainer');
    const displayImage = document.getElementById('displayImage');
    const currentLevel = levels[currentLevelIndex];

    // Display the current image
    displayImage.src = currentLevel.images[currentImageIndex].src;
    imageContainer.style.display = 'block';
    questionContainer.style.display = 'none';
    document.getElementById('nextImageButton').style.display = 'none';

    // Hide the image and show the question after a few seconds
    setTimeout(() => {
        imageContainer.style.display = 'none';
        questionContainer.style.display = 'block';
        loadQuestion();
    }, 5000); // Display the image for 5 seconds
}

// Function to load the current question
function loadQuestion() {
    const currentLevel = levels[currentLevelIndex];
    const currentData = currentLevel.images[currentImageIndex].questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentData.question;
    document.getElementById('feedback').textContent = '';
    document.getElementById('answerInput').value = '';
}

// Function to check the answer
function checkAnswer() {
    const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
    const currentLevel = levels[currentLevelIndex];
    const correctAnswers = currentLevel.images[currentImageIndex].questions[currentQuestionIndex].answer.map(answer => answer.toLowerCase());

    if (correctAnswers.includes(userAnswer)) {
        document.getElementById('feedback').textContent = "Correct! Well done.";
        score++;
        document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
        nextQuestion();
    } else {
        document.getElementById('feedback').textContent = "Incorrect answer! Try again.";
    }
}

// Function to move to the next question or image
function nextQuestion() {
    const currentLevel = levels[currentLevelIndex];
    currentQuestionIndex++;
    if (currentQuestionIndex < currentLevel.images[currentImageIndex].questions.length) {
        // Move to the next question within the same image
        loadQuestion();
    } else {
        // All questions for the current image are done, move to the next image
        currentImageIndex++;
        currentQuestionIndex = 0;
        if (currentImageIndex < currentLevel.images.length) {
            // Show the button to proceed to the next image
            document.getElementById('nextImageButton').style.display = 'block';
        } else {
            // Level is completed, show options to continue to the next level or exit
            levelCompleted();
        }
    }
}

// Function to display "Level Completed" message
function levelCompleted() {
    document.getElementById('feedback').textContent = `Level ${levels[currentLevelIndex].levelNumber} Completed! Your score is: ${score}`;
    document.getElementById('levelCompleteContainer').style.display = 'block';
    document.getElementById('nextLevelButton').style.display = currentLevelIndex + 1 < levels.length ? 'inline-block' : 'none'; // Show if there's another level
}

// Function to go to the next level
function nextLevel() {
    currentLevelIndex++;
    currentImageIndex = 0;
    currentQuestionIndex = 0;
    document.getElementById('levelCompleteContainer').style.display = 'none';
    showImage();
}

// Function to end the game completely
function endGame() {
    document.getElementById('feedback').textContent = `Game Over! Your final score is: ${score}`;
    document.getElementById('submitAnswer').disabled = true;
}

// Function to save progress to local storage
function saveProgress() {
    localStorage.setItem('currentLevelIndex', currentLevelIndex);
    localStorage.setItem('currentImageIndex', currentImageIndex);
    localStorage.setItem('score', score);
}

// Function to load progress from local storage
function loadProgress() {
    const savedLevelIndex = parseInt(localStorage.getItem('currentLevelIndex'), 10);
    const savedImageIndex = parseInt(localStorage.getItem('currentImageIndex'), 10);
    const savedScore = parseInt(localStorage.getItem('score'), 10);

    if (!isNaN(savedLevelIndex) && !isNaN(savedImageIndex) && !isNaN(savedScore)) {
        currentLevelIndex = savedLevelIndex;
        currentImageIndex = savedImageIndex;
        score = savedScore;
        document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
    }
}

// Load the next image when the next button is clicked
document.getElementById('nextImageButton').addEventListener('click', () => {
    document.getElementById('nextImageButton').style.display = 'none';
    showImage();
});

// Load the next level when the next level button is clicked
document.getElementById('nextLevelButton').addEventListener('click', nextLevel);

// Exit the game
document.getElementById('exitButton').addEventListener('click', endGame);

// Initial load
loadProgress();
showImage();

// Event listener for the submit button
document.getElementById('submitAnswer').addEventListener('click', checkAnswer);
