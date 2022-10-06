// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

// Global Variables
let contacts = [];

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
}

function removeContact() {
  console.log('Remove Contact');
}

function displayByName() {
  console.log('Display by Name');
}

function displayByCountry() {
  console.log('Display by Country');
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