$(document).on("click", "#startButton", function () {
    var timeRemaining = 300;
    $("#startButton").css("display", "none");
    var queryURL = "https://opentdb.com/api.php?amount=3&category=15&type=multiple";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let array = response.results
        let answerArrays = [];
        array.forEach(answer => {



            var i = 1;
            i++;
            var currentAnswerArray = [];

            currentAnswerArray.push(answer.correct_answer)
            answer.incorrect_answers.forEach(incorrect => {
                currentAnswerArray.push(incorrect);
            })
            answerArrays.push(currentAnswerArray);
            $("#mainContent").append(`<h5 class="questions">${answer.question}</h5>`)
            
            var j = 0;
            var k = 0;
            var random;
            var thisArray = answerArrays[j]
console.log(thisArray)
            while (k < thisArray.length) {
                random = Math.floor(Math.random() * thisArray.length);
                if (thisArray[random] != "selected") {
                    k++;
                    var newDiv = $("<div>");
                    newDiv.attr("id", "answer"+k);
                    while (k<=4) {
                        $("#mainContent").append(newDiv)
                
                    $("#mainContent.#answer"+ k).attr("value", thisArray[random])
                    $("#mainContent.#answer"+ k).text(thisArray[random]);
                    thisArray[random] = "selected";
                    }
                }
            }
            j++;

        })
        console.log(answerArrays);
        console.log(answerArrays[0]);
        console.log(answerArrays[1]);


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
        console.log(response.results)
    })

})