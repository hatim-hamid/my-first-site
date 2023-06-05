// Select the placeholder element
var footerPlaceholder = document.getElementById("footer-placeholder");

// Create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();

// Set the URL of the footer HTML file
var footerUrl = "/footer.html";

// Make a GET request to fetch the footer content
xhr.open("GET", footerUrl, true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // Replace the placeholder with the footer content
    footerPlaceholder.innerHTML = xhr.responseText;
  }
};
xhr.send();
