document.addEventListener("DOMContentLoaded", function() {
    // Set user-facing text
    document.getElementById("searchTitle").innerText = USER_STRINGS.searchTitle;
    document.getElementById("searchWordLabel").innerText = USER_STRINGS.searchWordLabel;
    document.getElementById("searchButton").innerText = USER_STRINGS.searchButton;

    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let word = document.getElementById("searchWord").value.trim();
        

        // Enhanced validation: Allows letters and spaces, but no numbers or special characters
        if (!word || !/^[A-Za-z ]+$/.test(word)) {
            document.getElementById("searchResult").innerText = USER_STRINGS.invalidInput;
            return;
        }

        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://sarahliu.dev/COMP4537/labs/4/api/definitions?word=" + encodeURIComponent(word), true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 && xhr.responseText) {
                    document.getElementById("searchResult").innerText = xhr.responseText;
                } else {
                    document.getElementById("searchResult").innerText = USER_STRINGS.searchNotFound;
                }
            }
        };

        xhr.send();
    });
});


/* ChatGPT was used to:
- Provide outline of OOP structure
- Check for coding style and consistency
- Give suggestions for what methods to call
*/
