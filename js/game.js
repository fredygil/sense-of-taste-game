import { GameView } from "./game.view.js";
import { questions } from "./dbQuestions.js";
import { GameState } from "./game.state.js";

class Game {
  gameView;
  gameState;

  start() {
    this.gameView = new GameView();
    this.gameState = new GameState();
    this.gameView.setState(this.gameState);
    this.gameView.createViews();
    this.gameView.displayCurrentSection();
    this.setEvents();
  }

  setEvents() {
    const events = {
      onSetCurrentSection: () => {
        this.changeCurrentSection();
      },
      onSetSelectedAnswer:()=>{
        this.validateAnswer();
      }
    };
    this.gameState.setEvents(events);
  }

  changeCurrentSection() {
    if (this.gameState.currentSection === "question") {
      const question = this.getQuestion();
      this.gameState.setQuestion(question);
    }
    this.gameView.displayCurrentSection();
  }

  validateAnswer() {
    const answers = this.gameState.question.answer;
    this.gameState.setIsCorrectAnswer(
      answers[this.gameState.selectedAnswer].correct
    );
    this.gameState.setCurrentSection('answer')
  }

  getQuestion() {
    const questionsArray = questions[this.gameState.questionLevel];
    const numberQuestion = Math.floor(Math.random() * questionsArray.length);
    //console.log(numberQuestion)
    return questionsArray[numberQuestion];
  }
}
const game = new Game();
game.start();
