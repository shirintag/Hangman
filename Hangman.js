(function(){
    var wordContainer = document.getElementById("parola");
    var falseLettersContainer = document.getElementById("false_letter");
    var start = document.getElementById("button_start");
    var displayWrongLetters = [];
    var displayWord = [];
    var myWord;

    var getWord = function(){
        var word_length = Math.floor(Math.random() * 6) + 6;
        spiced.get("http://www.setgetgo.com/randomword/get.php?len=" + word_length, function(word){
            console.log(word);

            if (word){
                myWord = word;
                initialize();
            }
        });

    };

    //initialize the Game
    var initialize = function (){
        displayWord = [];
        for (var i=0; i < myWord.length; i++){
            displayWord.push("_");
        }
        displayWrongLetters =[];
        displayUnderscores();
        hang();
    };

    function displayUnderscores(){
        wordContainer.innerHTML= displayWord.join(" ");
        falseLettersContainer.innerHTML= displayWrongLetters.join(" ");
    }

    start.addEventListener("click", function(){
        console.log("start");
        getWord();
    });

    document.addEventListener("keydown", function(e){
        var falseLetter = true;
        for (var i=0; i<myWord.length; i++ ){
            //console.log(myWord[i]);
            //console.log(e.key);
            if (myWord[i] == e.key){
                displayWord[i]= e.key;
                falseLetter = false;
            }
        }
        if (falseLetter && displayWrongLetters.indexOf(e.key) == -1){
            // console.log(i);
            displayWrongLetters.push(e.key);
            var score = displayWrongLetters.length;
            drawMan(score);
            if (displayWrongLetters.length == 6){
                setTimeout(function(){
                    alert("You missed it, try one more time!");
                    getWord();
                },500);

            }
        }

        if (displayWord.join('') === myWord){
            setTimeout(function(){
                displayUnderscores();
                alert('You won!');
                getWord();
            },500);
        }
        displayUnderscores();
    });


    //Hang
    function hang (){
        var canvas = document.getElementById('canv');
        var poorMan = canvas.getContext('2d');
        poorMan.strokeStyle = '#fff';
        poorMan.lineWidth = 3;
        poorMan.clearRect(0, 0, canvas.width, canvas.height);
        poorMan.beginPath();
        poorMan.moveTo(300, 50);
        poorMan.lineTo(300, 800);
        poorMan.stroke();
        poorMan.moveTo(300, 800);
        poorMan.lineTo(50, 800);
        poorMan.stroke();
        poorMan.moveTo(300, 800);
        poorMan.lineTo(650, 800);
        poorMan.stroke();
        poorMan.moveTo(300, 50);
        poorMan.lineTo(650, 50);
        poorMan.stroke();
        poorMan.moveTo(650, 50);
        poorMan.lineTo(650, 120);
        poorMan.stroke();
    }


    //canvas function wrong letters
    function drawMan(score){
        console.log(score);
        var poorMan = document.getElementById('canv').getContext('2d');

        switch(score){

        case 1:
            poorMan.beginPath();
            poorMan.arc(650, 200, 80, 0, 2*Math.PI);
            poorMan.stroke();
            break;

        case 2:
            poorMan.moveTo(650, 280);
            poorMan.lineTo(650, 500);
            poorMan.stroke();
            break;

        case 3:
            poorMan.moveTo(650, 400);
            poorMan.lineTo(500, 300);
            poorMan.stroke();
            break;

        case 4:
            poorMan.moveTo(650, 400);
            poorMan.lineTo(800, 300);
            poorMan.stroke();
            break;

        case 5:
            poorMan.moveTo(650, 500);
            poorMan.lineTo(750, 750);
            poorMan.stroke();
            break;

        case 6:
            poorMan.moveTo(650, 500);
            poorMan.lineTo(550, 750);
            poorMan.rect(400,750,400,50);
            poorMan.stroke();
            break;
        }
    }
}());
