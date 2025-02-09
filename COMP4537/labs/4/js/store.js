document.addEventListener("DOMContentLoaded", function() {
    // Set user-facing text
    document.getElementById("title").innerText = USER_STRINGS.storeTitle;
    document.getElementById("wordLabel").innerText = USER_STRINGS.wordLabel;
    document.getElementById("definitionLabel").innerText = USER_STRINGS.definitionLabel;
    document.getElementById("submitButton").innerText = USER_STRINGS.submitButton;

    document.getElementById("storeForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let word = document.getElementById("word").value.trim();
        let definition = document.getElementById("definition").value.trim();
        
        if (!word || !definition || /\d/.test(word)) { // Basic validation
            document.getElementById("response").innerText = USER_STRINGS.invalidInput;
            return;
        }

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://yourDomainName2.wyz/api/definitions", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                document.getElementById("response").innerText = xhr.status === 200 ? USER_STRINGS.storeSuccess : xhr.responseText;
            }
        };

        let data = JSON.stringify({ word: word, definition: definition });
        xhr.send(data);
    });
});



/* ChatGPT was used to:
- Provide outline of OOP structure
- Check for coding style and consistency
- Give suggestions for what methods to call
*/
