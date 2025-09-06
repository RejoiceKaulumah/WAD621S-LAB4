// Validate email format
function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

document.getElementById("regForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const first = document.getElementById("first").value.trim();
    const last = document.getElementById("last").value.trim();
    const email = document.getElementById("email").value.trim();
    const prog = document.getElementById("prog").value.trim();
    const year = document.querySelector("input[name='year']:checked");
    const interests = document.getElementById("interests").value.trim();
    const photo = document.getElementById("photo").value.trim();

    let valid = true;

    // Basic validations
    if (!first) { document.getElementById("err-first").textContent = "First name required"; valid = false; }
    else { document.getElementById("err-first").textContent = ""; }

    if (!last) { document.getElementById("err-last").textContent = "Last name required"; valid = false; }
    else { document.getElementById("err-last").textContent = ""; }

    if (!validateEmail(email)) { document.getElementById("err-email").textContent = "Invalid email"; valid = false; }
    else { document.getElementById("err-email").textContent = ""; }

    if (!prog) { document.getElementById("err-prog").textContent = "Programme required"; valid = false; }
    else { document.getElementById("err-prog").textContent = ""; }

    if (!year) { document.getElementById("err-year").textContent = "Select a year"; valid = false; }
    else { document.getElementById("err-year").textContent = ""; }

    if (!valid) {
        document.getElementById("live").textContent = "Fix errors before submitting.";
        return;
    }

    const data = {
        first, last, email, prog, year: year.value,
        interests: interests.split(",").map(i => i.trim()).filter(Boolean),
        photo: photo || "https://placehold.co/128"
    };

    addEntry(data);
    document.getElementById("regForm").reset();
});

// Add profile card and table row
function addEntry(data) {
    // Card
    const card = document.createElement("div");
    card.className = "card-person";

    const cardInfo = document.createElement("div");
    cardInfo.className = "card-info";
    cardInfo.innerHTML = `
    <img src="${data.photo}" alt="">
    <div>
      <h3>${data.first} ${data.last}</h3>
      <p><span class="badge">${data.prog}</span> <span class="badge">Year ${data.year}</span></p>
      <p>${data.interests.map(i => `<span class="interest-tag">${i}</span>`).join(" ")}</p>
    </div>
  `;

    const removeBtnCard = document.createElement("button");
    removeBtnCard.textContent = "Remove";

    card.appendChild(cardInfo);
    card.appendChild(removeBtnCard);
    document.getElementById("cards").prepend(card);

    // Table
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${data.first} ${data.last}</td>
    <td>${data.prog}</td>
    <td>${data.year}</td>
    <td>${data.interests.map(i => `<span class="interest-tag">${i}</span>`).join(" ")}</td>
    <td><button class="remove">Remove</button></td>
  `;
    document.querySelector("#summary tbody").prepend(tr);

    // Remove functionality (card + table)
    const removeRowBtn = tr.querySelector(".remove");
    removeBtnCard.addEventListener("click", () => {
        tr.remove();
        card.remove();
    });
    removeRowBtn.addEventListener("click", () => {
        tr.remove();
        card.remove();
    });
}
