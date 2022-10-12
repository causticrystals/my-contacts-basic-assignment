// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

// Global Variables
let contacts = loadContacts();

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
  let email = {email: prompt("Enter Email:")};
  let phone = {phone: prompt("Enter Phone Number:")};
  let country = {country: prompt("Enter Country")};
  let newContact = Object.assign(name, email, phone, country);
  JSON.stringify(newContact);
  contacts.push(newContact);
  outputEl.innerHTML = `${newContact.name} has been added as a contact.`;
  saveContacts();
}

function removeContact() {
  let index = +prompt("Enter index # of contact you want to remove");
  if (index >= 0 && index < contacts.length) {
    contacts.splice(index, 1);
    saveContacts();
    displayContacts();
  } else {
    alert("Invalid index #");
  }
}

function displayByName() {
  let nameSearch = prompt("Search for name (Case sensitive):");
  for (let i = 0; i < contacts.length; i++) {
    let contactName = contacts[i].name;
    if (contactName.includes(nameSearch)) {
      console.log("hi");
    }
  }
}

function displayByCountry() {
  let countrySearch = prompt("Search for country (Case sensitive):");
  for (let i = 0; i < contacts.length; i++) {
    let contactCountry = contacts[i].country;
    if (contactCountry.includes(countrySearch)) {
      console.log("hi");
    }
  }
}

// HELPER FUNCTIONS
// Get HTML for contact
function getContactHTMLStr(contact, i) {
  return `
    <div>
      ${i}: ${contact.name} 
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