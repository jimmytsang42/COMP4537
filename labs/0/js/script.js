// Constant variables for IDs, events, and other reusable values
const BUTTON_ID = "numButtons";
const FORM_ID = "optionsForm";
const CONTAINER_ID = "buttonContainer";
const SUBMIT = "submit";
const BUTTON = "button";
const CLICK = "click";
const ABSOLUTE = "aboslute";
const LETTERS = "0123456789ABCDEF";
const COLOR = "#";
const DOM_CONTENT_LOADED = "DOMContentLoaded";
const BLANK = "";

// Class to initialize the Game
class GameInitializer {
    // Set up the form and event listener
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.setupEventListener();
    }

    // Event listener listens for the submit event, gets the number of buttons, validates the input, and starts the Game
    setupEventListener() {
        this.form.addEventListener(SUBMIT, (event) => {
            event.preventDefault();

            const buttonCount = parseInt(document.getElementById(BUTTON_ID).value);

            if (isNaN(buttonCount) || buttonCount < 3 || buttonCount > 7) {
                alert(MESSAGES.invalidNumber);
                return;
            }

            const game = new Game(buttonCount);
            game.start();
        });
    }
}

// Class that creates a button with a value and an onClick function
class Button {
    constructor(value, onClick) {
        this.value = value;
        this.buttonElement = document.createElement(BUTTON);
        this.buttonElement.textContent = value;
        this.buttonElement.addEventListener(CLICK, onClick);
        this.buttonElement.style.backgroundColor = this.getRandomColor();
    }

    // Creates a random hex color for the button
    getRandomColor() {
        let letters = LETTERS;
        let color = COLOR;
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Sets the position of the button
    setPosition(x, y) {
        this.buttonElement.style.position = ABSOLUTE;
        this.buttonElement.style.left = `${x}px`;
        this.buttonElement.style.top = `${y}px`;
    }

    // Sets the text content of the button
    setText(text) {
        this.buttonElement.textContent = text;
    }

    // Returns the button element
    getButtonElement() {
        return this.buttonElement;
    }
}

// Class to manage buttons
class ButtonManager {
    constructor(divID) {
        this.divElement = document.getElementById(divID);
        this.buttons = [];
    }

    // Adds a button to the buttons array and append it to the div element
    addButton(button) {
        this.buttons.push(button);
        this.divElement.appendChild(button.buttonElement);
    }

    // Removes all buttons from the div element and clears the buttons array
    clear() {
        this.divElement.innerHTML = BLANK;
        this.buttons = [];
    }

    // Returns the buttons array
    getButtons() {
        return this.buttons;
    }

}

// Class to manage the game logic
class Game {
    constructor(buttonCount) {
        this.buttonCount = buttonCount;
        this.originalOrder = [];
        this.currentOrder = [];
        this.buttonManager = new ButtonManager(CONTAINER_ID);
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight - document.getElementById(FORM_ID).offsetHeight;
        this.buttonManager.clear();
        this.disableAllButtons();
        this.isGameActive = false;
    }

    // Starts the game by creating buttons, scrambling them, and enabling the buttons
    start() {
        this.createMultipleButtons();
        setTimeout(() => {
            this.clearButtonText();
            this.scrambleMultipleTimes();
        }, this.buttonCount * 1000);
    }

    // Creates buttons with values starting from 1, adds them to the button manager array, and sets the original order
    createMultipleButtons() {
        for (let i = 0; i < this.buttonCount; i++) {
            const button = new Button(i + 1, () => {
                if (this.isGameActive) this.checkOrder(i);
            });
            this.buttonManager.addButton(button);
            this.originalOrder.push(i + 1);
        }
        this.currentOrder = [...this.originalOrder];
        this.positionButtons();
    }

    // Clears the text content of all buttons
    clearButtonText() {
        this.buttonManager.getButtons().forEach((button) => {
            button.setText(BLANK);
        });
    }

    // Positions the buttons in the container, taking into account possible wrapping if needed
    positionButtons() {
        let x = 0;
        let y = document.getElementById(FORM_ID).offsetHeight + 20; 

        this.buttonManager.getButtons().forEach((button, index) => {
            if (index > 0 && (x + 160) > this.windowWidth) { 
                x = 0;
                y += 80;
            }
            button.setPosition(x, y);
            x += 160;
        });
    }

    // Scrambles the buttons by setting random positions within the window
    scrambleButtons() {
        const formHeight = document.getElementById(FORM_ID).offsetHeight;
        this.buttonManager.getButtons().forEach((button) => {
            const x = Math.random() * (this.windowWidth - 160);
            const y = formHeight + 20 + Math.random() * (this.windowHeight - formHeight - 100); 
            button.setPosition(x, y);
        });
    }

    // Scrambles the buttons multiple times with a delay between each scramble
    scrambleMultipleTimes() {
        this.disableAllButtons(); 
        let shuffleCount = this.buttonCount - 1; 
        this.scrambleButtons(); 

        let interval = setInterval(() => {

            this.scrambleButtons(); 
            shuffleCount--; 
            if (shuffleCount === 0) {
                clearInterval(interval);
                this.isGameActive = true; 
                this.enableAllButtons(); 
                return;
            }
        }, 2000); 
    }

    // Checks if the clicked button is in the correct order, updates the button text, and shows a message if the order is correct or incorrect
    checkOrder(clickedIndex) {
        const expected = this.currentOrder.shift();
        if (this.originalOrder[clickedIndex] === expected) {
            this.buttonManager.getButtons()[clickedIndex].setText(expected);

            if (this.currentOrder.length === 0) {
                setTimeout(() => {
                    alert(MESSAGES.correctOrder); 
                    this.endGame();
                }, 100); 
            }
        } else {
            alert(MESSAGES.wrongOrder);
            this.revealCorrectOrder();
            this.endGame();
        }
    }

    // Reveals the correct order of the buttons if the player makes a mistake
    revealCorrectOrder() {
        this.buttonManager.getButtons().forEach((button, index) => {
            button.setText(this.originalOrder[index]);
        });
    }

    // Ends the game by disabling all buttons
    endGame() {
        this.isGameActive = false;
        this.disableAllButtons(); 
    }

    // Disables all buttons, preventing further clicks
    disableAllButtons() {
        this.buttonManager.getButtons().forEach((button) => {
            button.buttonElement.disabled = true; 
        });
    }

    // Enables all buttons, allowing clicks
    enableAllButtons() {
        this.buttonManager.getButtons().forEach((button) => {
            button.buttonElement.disabled = false; 
        });
    }
}

// Initialize the game when the page loads
document.addEventListener(DOM_CONTENT_LOADED, () => {
    new GameInitializer(FORM_ID);
});

/* ChatGPT was used to:
- Provide outline of OOP structure
- Troubleshoot various issues such as the scrambling logic and button positioning
- Check for coding style and consistency
- Give suggestions for what methods to call
*/
