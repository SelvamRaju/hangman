var hangmanController = function ($scope) {

  var div = document.getElementById('hintdiv');
  document.getElementById('hintButton').addEventListener('click', this.showHint);

  $scope.missesAllowed = 6;

  /* var getRandomWord = function () {
    var index = Math.floor(Math.random() * words.length);
    return words[index];
  }; */

  var getCustomWord = function () {
    return Object.keys(dataSet[$('#category').val()][$('#level').val() - 1]).toString();
  }

  $scope.showHint = function () {
    div.classList.toggle('visible');

  }

  var makeLetters = function (word) {
    return _.map(word.split(''), function (character) {
      return {
        name: character,
        chosen: false
      };
    });
  };

  var revealSecret = function () {
    _.each($scope.secretWord, function (letter) {
      letter.chosen = true;
    });
  };

  var checkForEndOfGame = function () {
    $scope.win = _.reduce($scope.secretWord, function (acc, letter) {
      return acc && letter.chosen;
    }, true);

    if (!$scope.win && $scope.numMisses === $scope.missesAllowed) {
      $scope.lost = true;
      revealSecret();
    }
  }

  $scope.reset = function () {
    div.classList.remove('visible');
    _.each($scope.letters, function (letter) {
      letter.chosen = false;
    });
    $scope.secretWord = makeLetters(getCustomWord());
    $scope.numMisses = 0;
    $scope.win = false;
    $scope.lost = false;
    $scope.hint = Object.values(dataSet[$('#category').val()][$('#level').val() - 1]).toString();
  };

  $scope.reset();

  $scope.try = function (guess) {
    guess.chosen = true;
    var found = false;
    _.each($scope.secretWord,
      function (letter) {
        if (guess.name.toUpperCase() === letter.name.toUpperCase()) {
          letter.chosen = true;
          found = true;
        }
      });
    if (!found) {
      $scope.numMisses++;
    }
    checkForEndOfGame();
  };

  $scope.letters = makeLetters("abcdefghijklmnopqrstuvwxyz");

};

/* var words = [
  "seemita", "mamta", "sudhanshu", "aprajita", "dhanuja", "selvam"
]; */

var dataSet = {
  ramadan: [{
    "eidalfitr": "They call me so traditional"
  }, {
    "dumbiriyani": "The showstopper"
  }, {
    "kunafa": "Close it yum"
  }, {
    "alfurqan": "They ream from me, my other name"
  }, {
    "iftar": "I bring everyone together"
  }],
  movies: [{
    "udaan": "Jamshedpur, Father, Running"
  }, {
    "ajanachle": "Amphitheatre, Laila Majnu, Play, Dance"
  }, {
    "andazapnaapna": "Style of ones"
  }, {
    "phirherapheri": "Monkey business again"
  }, {
    "dhoom": "sputter"
  }],
  places: [{
    "derweze": "Road to Hell"
  }, {
    "pamukalle": "The City of Minerals"
  }, {
    "seychelles": "The Honeymoon Paradise"
  }, {
    "mumbai": "The City of Dreams"
  }, {
    "dubai": "Megacity that never stops growing"
  }],
  food: [{
    "biriyani": "Spicy"
  }, {
    "sprouts": "Healthy"
  }, {
    "buttermilk": "Appetizer"
  }, {
    "panipuri": "No one can eat just one"
  }, {
    "popcorn": "All age favourite"
  }],
  technology: [{
    "alexa": "You test my patience but still Im a cool girl. I sometimes evesdrop"
  }, {
    "netflix": "Im Amazon's frienemy.Im their valuable customer and strong competitor."
  }, {
    "cookies": "I may be your kiddo's favourite, Im good if used properly also Im a biggest culprit if misused"
  }, {
    "production": "Techies dont disturb me on Fridays, cos they know I can destroy their weekend plans"
  }, {
    "cellularphone": "You spend more time with me than your partner"
  }]
}