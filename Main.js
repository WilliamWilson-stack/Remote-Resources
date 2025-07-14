// --- 1. QUOTE OF THE DAY ---
document.addEventListener("DOMContentLoaded", () => {
  const quoteText = document.getElementById("quote-text");

  fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data => {
      quoteText.textContent = `"${data.content}" — ${data.author}`;
    })
    .catch(error => {
      quoteText.textContent = "Could not load quote. Please try again later.";
      console.error("Quote fetch error:", error);
    });
});

// --- 2. SELF-ASSESSMENT QUIZ ---
const quizForm = document.getElementById("quiz-form");
const quizResult = document.getElementById("quiz-result");

quizForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form reload

  const mood = quizForm.elements["mood"].value;

  // Simple mood check
  if (mood === "great") {
    quizResult.textContent = "Awesome! Keep up the good work. 😊";
  } else if (mood === "okay") {
    quizResult.textContent = "Hang in there. You're doing fine. 🌿";
  } else if (mood === "bad") {
    quizResult.textContent = "We're here to help. Please reach out if needed. ❤️";
  } else {
    quizResult.textContent = "Please select how you're feeling.";
  }
});

// --- 3. RESOURCE FINDER BY ZIP CODE ---
const searchButton = document.getElementById("search-button");
const zipcodeInput = document.getElementById("zipcode-input");
const supportResults = document.getElementById("support-results");

searchButton.addEventListener("click", () => {
  const zip = zipcodeInput.value.trim();

  // ZIP code validation
  if (!/^\d{5}$/.test(zip)) {
    supportResults.innerHTML = "<li>Please enter a valid 5-digit ZIP code.</li>";
    return;
  }

  supportResults.innerHTML = "<li>Loading resources...</li>";

  // Fetch from SAMHSA API
  fetch(`https://findtreatment.gov/api/locations?zip=${zip}`)
    .then(response => response.json())
    .then(data => {
      supportResults.innerHTML = "";

      if (data.length === 0) {
        supportResults.innerHTML = "<li>No resources found for this ZIP code.</li>";
        return;
      }

      data.slice(0, 5).forEach(place => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${place.name}</strong><br>
          ${place.address1}, ${place.city}, ${place.state} ${place.zip}<br>
          Phone: ${place.phone || "N/A"}
        `;
        supportResults.appendChild(li);
      });
    })
    .catch(error => {
      supportResults.innerHTML = "<li>Could not fetch resources. Please try again later.</li>";
      console.error("ZIP API error:", error);
    });
});

