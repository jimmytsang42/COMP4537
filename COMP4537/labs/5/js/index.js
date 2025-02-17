class PatientDB {
    constructor(apiUrl, userStrings) {
        this.apiUrl = apiUrl;
        this.userStrings = userStrings;
        this.initialize();
    }

    initialize() {
        // set user-facing text when the document is loaded
        document.addEventListener("DOMContentLoaded", () => {
            this.setUserFacingText();
            this.addEventListeners();
        });
    }

    setUserFacingText() {
        // set user-facing text values for the page
        document.title = this.userStrings.pageTitle;
        document.getElementById("insertPatientsButton").innerText = this.userStrings.insertPatientsButton;
        document.getElementById("sqlQuery").placeholder = this.userStrings.sqlQueryPlaceholder;
        document.getElementById("runQueryButton").innerText = this.userStrings.runQueryButton;
        document.getElementById("lab5Header").innerText = this.userStrings.pageTitle
    }

    addEventListeners() {
        // add event listeners for buttons
        document.getElementById("insertPatientsButton").addEventListener("click", () => this.insertPatients());
        document.getElementById("runQueryButton").addEventListener("click", () => this.sendQuery());
    }

    sendRequest(method, query) {
        // prepare and send the request to server2
        const xhr = new XMLHttpRequest();
        let url = this.apiUrl;

        if (method === "GET") {
            url += "/" + encodeURIComponent(query);
        }

        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.displayResponse(xhr.responseText);
                } else {
                    const errorMsg = USER_STRINGS.errorMessageTemplate
                        .replace("%1", xhr.status)
                        .replace("%2", xhr.statusText || USER_STRINGS.responseError);

                    this.displayResponse(errorMsg);
                }
            }
        };

        if (method === "POST") {
            xhr.send(JSON.stringify({ query }));
        } else {
            xhr.send();
        }
    }

    insertPatients() {
        // insert predefined patients into the database
        const sql = `
            INSERT INTO patients (name, dateOfBirth) VALUES
            ('Sara Brown', '1901-01-01'),
            ('John Smith', '1941-01-01'),
            ('Jack Ma', '1961-01-30'),
            ('Elon Musk', '1999-01-01');
        `;
        this.sendRequest("POST", sql);
    }

    sendQuery() {
        // get the query input from user and determine method (ie GET or POST)
        const query = document.getElementById("sqlQuery").value.trim();

        if (!query) {
            alert(this.userStrings.blankQueryError);
            return;
        }

        const upperQuery = query.toUpperCase();

        if (upperQuery.startsWith("SELECT")) {
            this.sendRequest("GET", query);
        } else if (upperQuery.startsWith("INSERT")) {
            this.sendRequest("POST", query);
        }
        else {
            alert(this.userStrings.queryError);
        }
    }

    displayResponse(message) {
        // display the server response
        document.getElementById("response").innerText = message;
    }
}

// initialize the PatientDB class with appropriate API URL and user strings
const patientDB = new PatientDB("https://sarahliu.dev/COMP4537/labs/5/api/v1/sql", USER_STRINGS);

/* ChatGPT was used to:
- Provide outline of OOP structure
- Check for coding style and consistency
- Give suggestions for what methods to call
- Help with error handling
*/
