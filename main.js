// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

// Global Variables
let contacts = loadContacts();

// Display contacts when page loads
displayContacts();

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  } else if (selection === "search-email") {
    displayByEmail();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    outputStr += getContactHTMLStr(contacts[i], i);
  }
  outputEl.innerHTML = outputStr;
  loadContacts();
}

function addContact() {
  let name = {name: prompt("Enter Full Name:")};
  let phone = {phone: prompt("Enter Phone Number:")};
  let country = {country: prompt("Enter Country")};
  let email = {email: prompt("Enter Email:")};

  // Check if new email is in use already
  let newEmail = Object.values(email).toString();
  let testEmail = findByEmail(newEmail);
  if (testEmail === -1) {
    let newContact = Object.assign(name, email, phone, country);
    JSON.stringify(newContact);
    contacts.push(newContact);
    outputEl.innerHTML = `${newContact.name} has been added as a contact.`;
    saveContacts();
  } else {
    alert("Contact with that email already exists.");
  }
}

function removeContact() {
  let contactGone = prompt("Enter the email of the contact you want to remove.");
  for (let i = 0; i < contacts.length; i++) {
    if (contactGone === contacts[i].email) {
      contacts.splice(i, 1);
      saveContacts();
      displayContacts();
    }
  }
}

function displayByName() {
  let nameSearch = prompt("Search for name");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    let lowerContactName = contacts[i].name.toLowerCase();
    let lowerNameSearch = nameSearch.toLowerCase();
    if (lowerContactName.includes(lowerNameSearch)) {
      outputStr += getContactHTMLStr(contacts[i], i);
    }
  }
  outputEl.innerHTML = outputStr;
}

function displayByCountry() {
  let countrySearch = prompt("Search for country");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    let contactCountry = contacts[i].country;
    if (contactCountry.toLowerCase() === countrySearch.toLowerCase()) {
      outputStr += getContactHTMLStr(contacts[i], i);
    }
  }
  outputEl.innerHTML = outputStr;
}

function displayByEmail() {
  let emailSearch = prompt("Search by email");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    let contactEmail = contacts[i].email;
    if (contactEmail.includes(emailSearch)) {
      outputStr += getContactHTMLStr(contacts[i]);
    }
  }
  outputEl.innerHTML = outputStr;
}

// HELPER FUNCTIONS
// Get HTML for contact
function getContactHTMLStr(contact) {
  return `
    <div>
      ${contact.name} 
      <br>
      ${contact.email} 
      <br>
      ${contact.phone} (${contact.country})
    </div> 
    `;
}

// Save contact array to local storage
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Load contacts from local storage
function loadContacts() {
  let contactStr = localStorage.getItem("contacts");
  return JSON.parse(contactStr) ?? [];
}

// Search global contacts array for a contact with the provided email
function findByEmail(email) {
  for (let i = 0; i < contacts.length; i++) {
    let contactEmail = contacts[i].email;
    if (email === contactEmail) {
      return i;
    }
  }
  return -1;
}