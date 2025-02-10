class Search {
    constructor(apiUrl, userStrings) {
        this.apiUrl = apiUrl;
        this.userStrings = userStrings;
        this.initializeSearch();
    }

    initializeSearch() {
        document.addEventListener("DOMContentLoaded", () => {
            this.setUserFacingText();
            document.getElementById("searchForm").addEventListener("submit", (event) => this.handleSearch(event));
        });
    }

    setUserFacingText() {
        document.getElementById("searchTitle").innerText = this.userStrings.searchTitle;
        document.getElementById("searchWordLabel").innerText = this.userStrings.searchWordLabel;
        document.getElementById("searchButton").innerText = this.userStrings.searchButton;
    }

    handleSearch(event) {
        event.preventDefault();
        let word = document.getElementById("searchWord").value.trim();

        if (!word || !/^[A-Za-z ]+$/.test(word)) {
            this.displayResult(this.userStrings.invalidInput);
            return;
        }

        this.fetchData(word);
    }

    fetchData(word) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `${this.apiUrl}?word=${encodeURIComponent(word)}`, true);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this.displayResult(xhr.status === 200 && xhr.responseText ? xhr.responseText : this.userStrings.searchNotFound);
            }
        };

        xhr.send();
    }

    displayResult(message) {
        document.getElementById("searchResult").innerText = message;
    }
}

// Initialize the search class
const search = new Search("https://sarahliu.dev/COMP4537/labs/4/api/definitions", USER_STRINGS);


/* ChatGPT was used to:
- Provide outline of OOP structure
- Check for coding style and consistency
- Give suggestions for what methods to call
*/
