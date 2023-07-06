function processInputs() {
  var wordLength = document.getElementById("word-length").value;
  let greenLetters = document.getElementById("green-letters").value;
  let yellowLetters = document.getElementById("yellow-letters").value;
  let greyLetters = document.getElementById("grey-letters").value;
  if (validateInputs(wordLength, greenLetters, yellowLetters, greyLetters)) {
    callApiEndpoint(wordLength, greenLetters, yellowLetters, greyLetters)
  }
}

function callApiEndpoint(wordLength, greenLetters, yellowLetters, greyLetters) {
  var data = {
    numberOfLetters: wordLength,
    green: greenLetters.toLowerCase(),
    yellow: yellowLetters.toLowerCase(),
    grey: greyLetters.toLowerCase()
  };
  
  var queryString = new URLSearchParams(data).toString();
  var url = `http://api.dylanbryant.com:5000/api/solvewordle?${queryString}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var dataBox = document.getElementById("data-box");
      dataBox.innerHTML = "Possible Words: " + data.possibleWords + "<br><br>" + "Elimination Words: " + data.eliminationWords
    })
    .catch(error => {
      var dataBox = document.getElementById("data-box");
      dataBox.innerHTML = error
    });
}

function clearInputs() {
  document.getElementById("green-letters").value = "";
  document.getElementById("yellow-letters").value = "";
  document.getElementById("grey-letters").value = "";
  
  var dataBox = document.getElementById("data-box");
  dataBox.innerHTML = "";
}

function validateInputs(wordLength, greenLetters, yellowLetters, greyLetters) {
  // Currently the server only handles four word lengths
  possibleWordLengths = ["5", "6", "7", "8"]
  if (wordLength in possibleWordLengths) {
    document.getElementById("error-message").innerHTML = "Word Length not Supported";
    document.getElementById("error-message").style.display = "block";
    return false
  } else if (greenLetters && !checkLetterAndPosition(greenLetters)) {
    document.getElementById("error-message").innerHTML = "Invalid Green Letter input";
    document.getElementById("error-message").style.display = "block";
    return false
  } else if (yellowLetters && !checkLetterAndPosition(yellowLetters)) {
    document.getElementById("error-message").innerHTML = "Invalid Yellow Letter input";
    document.getElementById("error-message").style.display = "block";
    return false
  } else if (greyLetters && !checkLettersOnly(greyLetters)) {
    document.getElementById("error-message").innerHTML = "Invalid Grey Letter input";
    document.getElementById("error-message").style.display = "block";
    return false
  } else {
    document.getElementById("error-message").style.display = "none";
    document.getElementById("error-message").innerHTML = "";
    return true
  }
}

function checkLetterAndPosition(input) {
  let pattern = /^([A-Za-z][0-9])+$/
  return pattern.test(input)
}

function checkLettersOnly(input) {
  let pattern = /^([A-Za-z])+$/
  return pattern.test(input)
}

function openInformationModal() {
  var modal = document.getElementById("information-modal");
  modal.style.display = "block";
}

function closeInformationModal() {
  var modal = document.getElementById("information-modal");
  modal.style.display = "none";
}

function sortTextArea() {
  document.getElementById("notes").value = document.getElementById("notes").value.split('').sort().join('')
}

function clearTextArea() {
  document.getElementById("notes").value = "";
}