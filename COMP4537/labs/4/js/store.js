class Store {
    constructor(apiUrl, userStrings) {
        this.apiUrl = apiUrl;
        this.userStrings = userStrings;
        this.initializeStore();
    }

    initializeStore() {
        document.addEventListener("DOMContentLoaded", () => {
            this.setUserFacingText();
            document.getElementById("storeForm").addEventListener("submit", (event) => this.handleSubmit(event));
        });
    }

    setUserFacingText() {
        document.getElementById("title").innerText = this.userStrings.storeTitle;
        document.getElementById("wordLabel").innerText = this.userStrings.wordLabel;
        document.getElementById("definitionLabel").innerText = this.userStrings.definitionLabel;
        document.getElementById("submitButton").innerText = this.userStrings.submitButton;
    }

    handleSubmit(event) {
        event.preventDefault();
        let word = document.getElementById("word").value.trim();
        let definition = document.getElementById("definition").value.trim();

        if (!word || !/^[A-Za-z ]+$/.test(word) || !definition) {
            this.displayResponse(this.userStrings.invalidInput);
            return;
        }

        this.sendData({ word, definition });
    }

    sendData(data) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", this.apiUrl, true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.displayResponse(this.userStrings.storeSuccess);
                } else {
                    this.displayResponse(xhr.responseText);
                }
            }
        };
    
        xhr.send(JSON.stringify(data));
    }
    

    displayResponse(message) {
        document.getElementById("response").innerText = message;
    }
}

// Initialize the store class
const store = new Store("https://sarahliu.dev/COMP4537/labs/4/api/definitions", USER_STRINGS);


/* ChatGPT was used to:
- Provide outline of OOP structure
- Check for coding style and consistency
- Give suggestions for what methods to call
*/
