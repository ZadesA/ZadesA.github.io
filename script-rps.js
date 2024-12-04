let choices = ['rock', 'paper', 'scissors'];

function start(userChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
  
    let result = '';
    if (userChoice === computerChoice) {
      result = "It's a tie!";
    } else if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      result = `You win! ${userChoice} beats ${computerChoice}.`;

    } else {
      result = `You lose! ${computerChoice} beats ${userChoice}.`;
    }
  
    document.getElementById('result').textContent = result;
    setTimeout(() => {newGame();}, 2000);
}  

function newGame() {
    document.getElementById('result').textContent = '';
    choices = shuffleArray(['rock', 'paper', 'scissors']); // ensure new game
}
  