//IMPORTS
import './css/styles.css';
import { isValue, isNotPastOrPresent, isAnInteger } from './formValidation.js';
import { getAPIData, postAPIData } from './apiCalls.js';
import Traveler from './traveler.js';
import Dataset from './dataSet.js';

// global variables
let tripDataset;
let destinationDataset;
let currentTraveler;

// Query selectors:
const username = document.querySelector('#username');
const password = document.querySelector('#user-password');
const showHidePasswordButton = document.querySelector('.show-password-button');
const loginCredentials = Array.from(document.querySelectorAll('.credentials'));
const loginPage = document.querySelector('.login-page');
const startPlanningButton = document.querySelector('.user-login-button');
const loginErrorMsg = document.querySelector('.error-msg');
const tryAgainButton = document.querySelector('.try-again-button');
const mainPage = document.querySelector('main');
const userFirstName = document.querySelector('.user-first-name');
const dateAsOfToday = document.querySelector('.date-today');
const userTotalSpent = document.querySelector('.total-spent');
const userPastTrips = document.querySelector('.past-trips-container');
const userPendingTrips = document.querySelector('.pending-trips-container');
const userUpcomingTrips = document.querySelector('.upcoming-trips-container');
const requestForm = document.querySelector('.trip-request-form');
const tripDate = document.querySelector('#trip-date');
const tripLength = document.querySelector('#trip-length');
const partySize = document.querySelector('#party-size');
const tripRequestDestinations = document.querySelector('#request-destinations');
const tripRequestInputs = Array.from(document.querySelectorAll('.trip-request-input'));
const tripEstimateShow = document.querySelector('.trip-estimate-show');
const tripEstimate = document.querySelector('.trip-estimate');
const requestTripButton = document.querySelector('.request-trip-button');
const postResponseShow = document.querySelector('.post-response-show');
const postResponseMsg = document.querySelector('.post-response-msg');
const requestFormResetButton = document.querySelector('.reset-request-form-button');
const pageReload = document.querySelector('.page-reload');

// Event Listeners:
showHidePasswordButton.addEventListener('click', togglePassword);
startPlanningButton.addEventListener('click', attemptLogin);
tryAgainButton.addEventListener('click', resetLogin);
tripDate.addEventListener('input', handleDateErrors);
tripLength.addEventListener('input', handleNumberErrors);
partySize.addEventListener('input', handleNumberErrors);
requestForm.addEventListener('input', displayEstimate);
requestTripButton.addEventListener('click', requestTrip);
requestFormResetButton.addEventListener('click', resetTripRequest);
pageReload.addEventListener('click', () => location.reload());

// FUNCTIONS 

function togglePassword() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    if (this.innerText === 'Show') {
      this.innerText = 'Hide';
    }
    else {
      this.innerText = 'Show';
    }
}

function attemptLogin() {
  const parsedUserID = parseInt(username.value.slice(8));

  if (username.value.startsWith('traveler') && parsedUserID >= 1 && parsedUserID <= 50 && password.value === 'traveler') {
    Promise.all([getAPIData(`travelers/${parsedUserID}`), getAPIData('trips'), getAPIData('destinations')])
      .then(datasets => {
        setData(datasets);
      })
      .catch(error => {
        displayGETError(error);
      });
  } else {
    disableForm(loginCredentials);
    showHidePasswordButton.disabled = true;
    loginErrorMsg.classList.remove('hidden');
    startPlanningButton.classList.add('hidden');
  }
}


  function setData(datasets) {
    console.log('Received datasets:', datasets);
    currentTraveler = new Traveler(datasets[0]);
    tripDataset = new Dataset(datasets[1].trips);
    destinationDataset = new Dataset(datasets[2].destinations);
    currentTraveler.setTravelerTrips(tripDataset, 'userID');
    currentTraveler.setTravelerDestinations(destinationDataset);
    console.log('Current traveler:', currentTraveler);
    console.log('Trip dataset:', tripDataset);
    console.log('Destination dataset:', destinationDataset);
    displayData();
  }
  

  function displayData() {
    console.log('Displaying data...');
    displayMain();
    displayTravelerInfo();
    displayTravelerTrips();
    displaytripRequestDestinations();
  }
  

function displayMain() {
  loginPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
}

function displayTravelerInfo() {
  userFirstName.innerText = currentTraveler.findFirstName();
  dateAsOfToday.innerText = new Date().toLocaleDateString();
  userTotalSpent.innerText = currentTraveler.calcTotalSpent();
}

function displayTravelerTrips() {
  displayTripsByStatus('pastTrips', userPastTrips, 'past');
  displayTripsByStatus('pendingTrips', userPendingTrips, 'pending');
  displayTripsByStatus('upcomingTrips', userUpcomingTrips, 'upcoming');
}

function displayTripsByStatus(tripList, section, status) {
    section.innerHTML = '';
    if (currentTraveler[tripList].length > 0) {
      currentTraveler[tripList].forEach(trip => {
        const destination = currentTraveler.destinations.find(destination => trip.destinationID === destination.id);
        createTripCard(section, destination, trip);
      });
    } else {
      section.innerHTML += `
        <p>You don't have any ${status} trips, yet!</p>
      `;
    }
  }
  

function createTripCard(section, destination, trip) {
  const date = [trip.date.split('/')[1], trip.date.split('/')[2], trip.date.split('/')[0]].join('/');
  let amount = 'days';
  if (trip.duration === 1) {
    amount = 'day';
  }
  section.innerHTML += `
  <article class="trip-card" tabindex="0">
    <p><span class="trip-card-date">${date}</span>: ${trip.duration} ${amount} in ${destination.destination}</p>
    <img src="${destination.image}" alt="${destination.alt}">
  </article>
  `
}

function displaytripRequestDestinations() {
    console.log('Displaying trip request destinations...');
    
    console.log('Destination dataset:', destinationDataset);
  
    destinationDataset.data
      .reduce((acc, destination) => {
        acc.push(destination.destination);
        return acc;
      }, [])
      .sort()
      .forEach(destination => {
        const option = document.createElement('option');
        option.value = destination;
        option.text = destination;
        tripRequestDestinations.appendChild(option);
      });
  }
  

function displayGETError(error) {
  loginPage.innerHTML = ``;
  loginPage.innerHTML += `
    <h1>Oops! Something went wrong. Please try again later!</h1>
  `;
}

function disableForm(formInputs) {
  formInputs.forEach(input => {
    input.disabled = true;
  })
}

function resetLogin() {
  loginErrorMsg.classList.add('hidden');
  startPlanningButton.classList.remove('hidden');
  loginCredentials.forEach(input => {
    input.disabled = false;
    input.value = '';
  })
  showHidePasswordButton.disabled = false;
  showHidePasswordButton.innerText = 'Show';
  password.setAttribute('type', 'password');
}

function handleDateErrors() {
  if (!isNotPastOrPresent(this.value)) {
    displayInputError(this, 'Please pick a date in the future!');
  }
  else {
    removeInputError(this);
  }
}

function displayInputError(input, message) {
  const formField = input.parentElement;
  formField.querySelector('.error-message').textContent = message;
  const relevantInputs = tripRequestInputs.filter(requestInput => requestInput !== input);
  disableForm(relevantInputs);
}

function removeInputError(input) {
  const formField = input.parentElement;
  formField.querySelector('.error-message').textContent = '';
  tripRequestInputs.forEach(input => {
    input.disabled = false;
  })
}

function handleNumberErrors() {
  if (!isAnInteger(this.value)) {
    displayInputError(this, 'Please pick a number greater than zero.');
  }
  else {
    removeInputError(this);
  }
}

function displayEstimate() {
  if (isNotPastOrPresent(tripDate.value) && isAnInteger(tripLength.value) && isAnInteger(partySize.value) && isValue(tripRequestDestinations.value)) {
    tripEstimate.innerText = calculateEstimatedTotal();
    tripEstimateShow.classList.remove('hidden');
  }
  else {
    tripEstimateShow.classList.add('hidden');
  }
}

function calculateEstimatedTotal() {
  const userSelection = tripRequestDestinations.options[tripRequestDestinations.selectedIndex].value;
  const userDestination = destinationDataset.findSelectedDestination(userSelection);
  const flightCosts = partySize.value * userDestination.estimatedFlightCostPerPerson;
  const lodgingCosts = tripLength.value * userDestination.estimatedLodgingCostPerDay;
  const total = flightCosts + lodgingCosts;
  const totalWithFee = total * 1.10;
  return (Math.round(totalWithFee * 100) / 100).toFixed(2);
}

function requestTrip() {
  const userSelection = tripRequestDestinations.options[tripRequestDestinations.selectedIndex].value;
  const userDestination = destinationDataset.findSelectedDestination(userSelection);

  const userInputData = {
    id: Date.now(),
    userID: currentTraveler.id,
    destinationID: userDestination.id,
    travelers: parseInt(partySize.value),
    date: tripDate.value.split('-').join('/'),
    duration: parseInt(tripLength.value),
    status: 'pending',
    suggestedActivities: []
  };

  postAPIData('trips', userInputData)
    .then(responseJSON => {
      displayPOSTSuccess();
      currentTraveler.addTrip(responseJSON.newTrip, 'pendingTrips');
      currentTraveler.destinations.push(userDestination);
      displayTripsByStatus('pendingTrips', pendingTripsSection, 'pending');
      disableForm(tripRequestInputs);
    })
    .catch(error => {
      displayPOSTError(error)
      disableForm(tripRequestInputs);
    });
}

function displayPOSTSuccess() {
    postResponseShow.classList.remove('hidden');
  tripEstimateShow.classList.add('hidden');
}

function displayPOSTError(error) {
    postResponseShow.classList.remove('hidden');
    requestFormResetButton.classList.add('hidden');
  tripEstimateShow.classList.add('hidden');
  if (error.message[0] === '5') {
    postResponseMsg.innerText = 'Oops! Something is wrong with the server. Please try submitting this form again later!';
  }
  else {
    postResponseMsg.innerText = `Something isn't right. Please try submitting this form again later!`;
  }
  pageReload.classList.remove('hidden');
}

function resetTripRequest() {
    postResponseShow.classList.add('hidden');
  tripRequestInputs.forEach(input => {
    input.disabled = false;
    input.value = '';
  })
}
