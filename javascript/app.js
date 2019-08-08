//Initial array of the peruvian dishes
var peruvianDishes = [
  'ceviche',
  'estofado',
  'aji de gallina',
  'huancaina',
  'pollo a la brasa',
  'seco de cordero',
  'causa',
  'jalea',
  'papa rellena',
  'sopa de mariscos',
  'asado de pollo',
  'anticuchos',
  'tacu tacu',
  'pachamanca',
  'rocoto relleno',
  'anticuchos',
  'carapulca',
  'arroz con pato',
  'ensalada de quinoa',
  'patasca',
  'lomo saltado'
];

$(document).ready(function() {
  renderButton();
  // Function for displaying food data
  function renderButton() {
    $('#allbuttons').empty();

    // Looping through the array of dishes
    for (var i = 0; i < peruvianDishes.length; i++) {
      var newButton = $('<button>');
      newButton.addClass('itembutton');
      newButton.addClass('btn btn-success');
      newButton.text(peruvianDishes[i]);
      newButton.attr('data-name', peruvianDishes[i]);
      $('#allbuttons').append(newButton);
    }
  }

  $('#addbutton').on('click', function(event) {
    event.preventDefault();
    var addedData = $('#userinput')
      .val()
      .trim();
    if (addedData != '') {
      peruvianDishes.push(addedData);
      renderButton();
      $('#userinput').val(' ');
    }
  });

  $(document).on('click', '.itembutton', displayDishesInfo);

  function displayDishesInfo() {
    var itemName = $(this).attr('data-name');
    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=food+' +
      itemName +
      '&limit=10&api_key=crbbS1AV4poHlXtTA5AeDyUMusBkWP65';
    $('#mainimages').empty();

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: 'GET'

      // After data comes back from the request
    }).then(function(response) {
      console.log(queryURL);
      console.log(response);

      // storing the data from the AJAX request in the results variable
      var results = response.data;

      //looping through each result item
      for (var i = 0; i < results.length; i++) {
        // Creating and storing an image tag
        var dataImage = $('<img>');

        dataImage.attr('src', results[i].images.fixed_height_still.url);
        //*dataImage.attr('data-still', results[i].images.fixed_height_still.url);
        //dataImage.attr('data-animate', results[i].images.fixed_height.url);
        //dataImage.addClass('gif');
        //dataImage.attr('data-state', 'still');

        var newItemdiv = $('<div class="newItem">');
        var gifRating = results[i].rating;
        var p = $('<p>').text('Rating: ' + gifRating);

        newItemdiv.append(p);
        newItemdiv.append(dataImage);

        $('#mainimages').prepend(newItemdiv);
      }
    });
  }

  // $('#mainimages').on('click', '.gif', function() {
  //   var state = $(this).attr('data-state');
  //   if (state === 'still') {
  //     $(this).attr('src', $(this).attr('data-animate'));
  //     $(this).attr('data-state', 'animate');
  //   } else if (state === 'animate') {
  //     $(this).attr('src', $(this).attr('data-still'));
  //     $(this).attr('data-state', 'still');
  //   }
  //});
});
