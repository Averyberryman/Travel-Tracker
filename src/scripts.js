// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

import './css/styles.css';
import './images/turing-logo.png'

// Query selectors:






const username = document.querySelector('#username');
const password = document.querySelector('#password');
const showHidePasswordButton = document.querySelector('.show-password-button');
const loginCredentials = Array.from(document.querySelectorAll('.credentials'));
const loginPage = document.querySelector('.login-page');
const startPlanningButton = document.querySelector('.user-login-button');
const loginErrorMsg = document.querySelector('.error-msg');
const tryAgainButton = document.querySelector('.try-again-button');
const mainPage = document.querySelector('main');
const userFirstName = document.querySelector('.traveler-name');
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


