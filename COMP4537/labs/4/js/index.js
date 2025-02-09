// Make sure this runs after the DOM has loaded to ensure the elements exist
document.addEventListener("DOMContentLoaded", () => {
    document.title = LAB4_MESSAGES.title;
    document.getElementById("header1").textContent = LAB4_MESSAGES.title;
    document.getElementById("header2").textContent = LAB4_MESSAGES.author;
    document.getElementById("search-link").textContent = LAB4_MESSAGES.searchLinkText;
    document.getElementById("store-link").textContent = LAB4_MESSAGES.storeLinkText;
});

/* ChatGPT was used to:
- Provide outline of OOP structure
- Check for coding style and consistency
- Give suggestions for what methods to call
*/
