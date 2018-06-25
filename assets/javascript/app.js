$(document).on("click", "#startButton", function () {
    var timeRemaining = 300;
    $("#startButton").css("display", "none");
    $("#submitButton").css("visibility", "visible");
    var queryURL = "https://opentdb.com/api.php?amount=3&category=15&type=multiple";


// Incredible array shuffling snippet I found on stack overflow that replaced my previous disaster of a randomizer.
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
      
      var j = 0; //iterator for array of answer arrays that match the question

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let array = response.results
        let answerArrays = [];


        array.forEach(answer => {
            
            
            console.log("answer: ", answer)

            var currentAnswerArray = [];

            currentAnswerArray.push(answer.correct_answer)
            answer.incorrect_answers.forEach(incorrect => {
                currentAnswerArray.push(incorrect);
            })
            answerArrays.push(currentAnswerArray);
            $("#mainContent").append(`<h5 class="questions">${answer.question}</h5>`);
            $("#mainContent").append(`<div class="btn-group" id="${"question-" + j + "-answers"}" data-toggle="buttons"></div>`);

            
            var k = 0; //iterator used for the array of answers to the current question
            var z = 0; //iterator used for answer randomizing while loop.


            // var random;
            var thisArray = answerArrays[j]
            console.log(thisArray)
            
            while (k < thisArray.length) {

                var shuffledArray = shuffle(thisArray);

                // random = Math.floor(Math.random() * thisArray.length);
                // if (thisArray[random] != "selected") {
                    k++;
                    
                    while (z < 4) {
                        var labelDiv = $("<label>");
                        labelDiv.attr("class", "btn btn-primary");
                        labelDiv.addClass("col-md-3");
                        labelDiv.attr("for", "answer" + z)
                        labelDiv.attr("name", "for-answer-"+ z)
                        labelDiv.attr("id", "answer-"+z)
                        labelDiv.text(shuffledArray[z]);
                        var inputDiv = $("<input>");
                        inputDiv.attr("name", "options")
                        inputDiv.attr("type", "radio");
                        inputDiv.attr("id", "answer" + z);
                        
                        $(`#mainContent #question-${j}-answers`).append(labelDiv);
                        $(`#mainContent #answer-${z}`).append(inputDiv);
                        

                        $("#mainContent #answer" + z).attr("value", shuffledArray[z])
                        // $("#mainContent #answer" + z).text(thisArray[random]);
                        
                        
                        z++;
                        
                    }
                    
                    // thisArray[random] = "selected";
                // }
            }
            
            j++;

        })
        


        // array.forEach(result => {
        //     var j = 0;
        //     var k = 0;
        //     var random;
        //     var thisArray = answerArrays[j]

        //     while (k < thisArray.length) {
        //         random = Math.floor(Math.random() * thisArray.length);
        //         if (thisArray[random] != "selected") {
        //             $("#mainContent").append(`<h5 class="questions">${result.question}</h5>
        //             <form class="row">
        //             <input type="radio" class="col-md-3" id="answer1">${thisArray[random]}<input type="radio" class="col-md-3" id="answer2"><input type="radio" class="col-md-3" id="answer3"><input type="radio" class="col-md-3" id="answer4">
        //             </form>`)

        //             thisArray[random] = "selected";
        //             k++
        //         }
        //     }
        //     j++;

        // })
        
    })

})