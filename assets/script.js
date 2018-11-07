var foodgroups = ["Mac and Cheese", "Steak", "Ice Cream", "Vegetables"];
$(document).ready(function () {
    function renderButtons() {
        $("#buttonsgohere").html("");
        for (i = 0; i < foodgroups.length; i++) {
            $("#buttonsgohere").append("<button class='btn btn-primary my-4 mx-2 clickme'>" + foodgroups[i] + "</button>");
        }
    }

    $(document.body).on("click", "#add-topic", function (event) {
        event.preventDefault();
        var food = $("#inlineFormInput").val();
        foodgroups.push(food);
        $("form").trigger("reset");

        renderButtons();
    });

    
renderButtons();

    $(document.body).on("click", ".clickme", function () {
        var foodbtn = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=FYfu7PsIVMTtnaEDO1GYbbG2999QFty3&q=" +
            foodbtn + "&limit=10&offset=0&lang=en"
        console.log(foodbtn);
        
        $('#gifsgohere').html("");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);



            var results = response.data;


              for (var i = 0; i < results.length; i++) {

                var foodDiv = $('<div>');

                var p = $('<p>').text('Rating: ' + results[i].rating);

                var foodImage = $('<img>');


                foodImage.attr('src', results[i].images.fixed_height_small_still.url);
                foodImage.attr("data-state", "still");
                foodImage.attr('data-still', results[i].images.fixed_height_small_still.url)
                foodImage.attr("data-animate", results[i].images.fixed_height_small.url );
                foodImage.attr("class", "gif");

                foodDiv.prepend(p);

                foodDiv.prepend(foodImage);


                $('#gifsgohere').prepend(foodDiv);

              }

            
              


        });
    });
    $(document.body).on("click", ".gif", function () {
        var state = $(this).attr("data-state")
        var animate = $(this).attr("data-animate")
        var still = $(this).attr("data-still")
        
        if (state === "still") {
            $(this).attr("data-state","animate");

            $(this).attr("src",animate);
            
        }
        if (state === "animate") {
            $(this).attr("data-state","still");
             $(this).attr("src",still)
        }
    });
});