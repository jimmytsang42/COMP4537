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

        if (!word || !/^[A-Za-z\s]+$/.test(word)) {
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
                try {
                    let responseData = JSON.parse(xhr.responseText);

                    if (xhr.status === 200) {
                        this.displayResult(`${word}: ${responseData.definition}`);
                    } else if (xhr.status === 400) {
                        this.displayResult(responseData.error);
                    } else if (xhr.status === 404) {
                        let resultMessage = USER_STRINGS.wordNotFound
                            .replace("%1", responseData.numberOfRequests)
                            .replace("%2", word);
                        this.displayResult(resultMessage);
                    } else {
                        // show the response text of other errors
                        this.displayResult(xhr.responseText);
                    }
                } catch (error) {
                    // error if the response is not valid JSON
                    this.displayResult(userStrings.errorParsingResponse);
                }
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
