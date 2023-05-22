function processInputs() {
  var wordLength = document.getElementById("word-length").value;
  let greenLetters = document.getElementById("green-letters").value;
  let yellowLetters = document.getElementById("yellow-letters").value;
  let greyLetters = document.getElementById("grey-letters").value;
  callApiEndpoint(wordLength, greenLetters, yellowLetters, greyLetters)
}

function callApiEndpoint(wordLength, greenLetters, yellowLetters, greyLetters) {
  var data = {
    numberOfLetters: wordLength,
    green: greenLetters,
    yellow: yellowLetters,
    grey: greyLetters
  };
  
  var queryString = new URLSearchParams(data).toString();
  var url = 'http://dylanbryant.com:5000/api/solvewordle?' + queryString;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // console.log("Response: ", data);
      var dataBox = document.getElementById("data-box");
      dataBox.innerHTML = "Possible Words: " + data.possibleWords + "<br>" + "Elimination Words: " + data.eliminationWords
    })
    .catch(error => {
      var dataBox = document.getElementById("data-box");
      dataBox.innerHTML = error
    });
}

function clearInputs() {
  document.getElementById("word-length").value = "";
  document.getElementById("green-letters").value = "";
  document.getElementById("yellow-letters").value = "";
  document.getElementById("grey-letters").value = "";
  
  var dataBox = document.getElementById("data-box");
  dataBox.innerHTML = "";
}