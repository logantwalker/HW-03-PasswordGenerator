// Assignment Code
var generateBtn = document.querySelector("#generate");



// creating a helper function to handle collecting the password reqs. 
const infoGather = () => {
  // infoArr is going to be what we return from this function after gathering all the needed info
  let infoArr = [];

  // initiating a value for pwLen (password length) so that I can keep pestering (while loop) the user for a proper input and avoid errors later on
  let pwLen = 0;
  while (pwLen < 8 || pwLen > 128 || isNaN(pwLen)) {
    pwLen = parseInt(prompt('Please input required passworld length (between 8 & 128 characters'));

    if (pwLen < 8 || pwLen > 128 || isNaN(pwLen)) {
      alert('Password must be between 8 & 128 characters!')
    }
    else {
      infoArr.push(pwLen);
    }
  }

  //confirming characters to include in the password
  // the loop is to prevent all false confirms
  let bugStopper = 0;
  while (bugStopper === 0) {
    let falseCount = 0;
    let upper = confirm('upper case characters required?');
    infoArr.push(upper);
    let lower = confirm('lower case characters required?');
    infoArr.push(lower);
    let numeric = confirm('numeric characters required?');
    infoArr.push(numeric);
    let spChar = confirm('special characters required?');
    infoArr.push(spChar);

    for (let i = 1; i < infoArr.length; i++) {
      if (infoArr[i]) {
        bugStopper++;
      } else {
        falseCount++;
      }
    }
    if (falseCount === 4) {
      alert('You must select at least one character type!');
    }
  }

  return infoArr;

}

// initializing some values for our function to use when generating a password
const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerAlph = alph.toLowerCase();
const num = '0123456789';
const spChar = " !#$%&'()*+,-./:;<=>?@[]^_`{|}~" + '"';

const characters = [alph, lowerAlph, num, spChar];
//-----------------------------------------------------//

const generatePassword = () => {
  // initializing an empty password
  let password = '';
  //gathering info from our users
  let info = infoGather();

  // now its time to make sense of the data we got from the user
  // determining password length
  pwLen = info[0];

  /*
  this bit of code will return an array of length n (max being length charChoiceRaw) with the value of each element
  being the index of a "true" value in the charChoiceRaw array
  */
  let charChoiceRaw = info.slice(1, info.length);

  let charSelect = [];
  for (i = 0; i < charChoiceRaw.length; i++) {
    if (charChoiceRaw[i]) {
      charSelect[i] = i;
    }
  }
  //filtering out the empty array spaces here
  charSelect = charSelect.filter(function () { return true });

//generating password here
  while(password.length<pwLen){
    //randomly selecting character type and value:

    // this helps randomly select the index of the character type from the character array
    let typeSelector = Math.floor(Math.random()*charSelect.length);

    //this helps radomly select the index of the character within that charcater type chosen earlier
    let valSelector = Math.floor(Math.random()*(characters[charSelect[typeSelector]].length));

    //this is where the magic happens
    password = password + characters[charSelect[typeSelector]][valSelector];
  }

  return password;

}
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
