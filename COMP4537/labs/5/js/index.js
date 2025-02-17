// script.js
class PatientDB {
    constructor(apiUrl, userStrings) {
        this.apiUrl = apiUrl;
        this.userStrings = userStrings;
        this.initialize();
    }

    initialize() {
        // Set user-facing text when the document is loaded
        document.addEventListener("DOMContentLoaded", () => {
            this.setUserFacingText();
            this.addEventListeners();
        });
    }

    setUserFacingText() {
        // Set text values for the page
        document.title = this.userStrings.pageTitle;
        document.getElementById("insertPatientsButton").innerText = this.userStrings.insertPatientsButton;
        document.getElementById("sqlQuery").placeholder = this.userStrings.sqlQueryPlaceholder;
        document.getElementById("runQueryButton").innerText = this.userStrings.runQueryButton;
        document.getElementById("lab5Header").innerText = this.userStrings.pageTitle
    }

    addEventListeners() {
        // Add event listeners for buttons
        document.getElementById("insertPatientsButton").addEventListener("click", () => this.insertPatients());
        document.getElementById("runQueryButton").addEventListener("click", () => this.sendQuery());
    }

    sendRequest(method, query) {
        // Prepare and send the request to server2
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
                    this.displayResponse(this.userStrings.responseError);
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
        // Insert predefined patients into the database
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
        // Get query input from user and determine method
        const query = document.getElementById("sqlQuery").value.trim();
    
        if (!query) {
            alert(this.userStrings.blankQueryError);
            return;
        }
    
        const upperQuery = query.toUpperCase();
    
        if (upperQuery.startsWith("SELECT")) {
            this.sendRequest("GET", query);
        } else if (upperQuery.startsWith("INSERT") || upperQuery.startsWith("DELETE") || upperQuery.startsWith("UPDATE") || upperQuery.startsWith("DROP")) {
            this.sendRequest("POST", query); // Sending as a POST request
        } else {
            alert(this.userStrings.queryError);
        }
    }
    

    displayResponse(message) {
        // Display server response
        document.getElementById("response").innerText = message;
    }
}

// Initialize the PatientDB class with appropriate API URL and user strings
const patientDB = new PatientDB("https://sarahliu.dev/COMP4537/labs/5/api/v1/sql", USER_STRINGS);
