const form = document.getElementById("form-item");
const formInput = document.getElementById("form-input");
const ulListItem = document.getElementById("ul-list-item");
const clearBtn = document.getElementById("clear-btn");
const filterInput = document.getElementById("filter-input");

// Functions
function addItem(e) {
  e.preventDefault();
  const newItem = formInput.value.trim();
  if (newItem === "") {
    alert("Please add an item");
  }
  // Create li and append to ul
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));
  ulListItem.appendChild(li);

  // Create button
  const button = document.createElement("button");
  button.className = "remove-item btn-link text-red";
  li.appendChild(button);
  // Create icon
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-square-xmark";
  button.appendChild(icon);
  // Reset input
  formInput.value = "";
  // Reset UI
  resetUI();
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
  resetUI();
}
function clearAllItems() {
  while (ulListItem.firstChild) {
    ulListItem.firstChild.remove(ulListItem.firstChild);
  }
  resetUI();
}

function filterItems(e) {
  const filterName = e.target.value.toLowerCase();
  const liItems = ulListItem.querySelectorAll("li");

  liItems.forEach(item => {
    const filterList = item.firstChild.textContent.toLowerCase();
    if (filterList.indexOf(filterName) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Reset UI
function resetUI() {
  const liItems = ulListItem.querySelectorAll("li");
  if (liItems.length === 0) {
    clearBtn.style.display = "none";
    filterInput.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filterInput.style.display = "block";
  }
}
resetUI();

// Event listener
form.addEventListener("submit", addItem);
ulListItem.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearAllItems);
filterInput.addEventListener("input", filterItems);
