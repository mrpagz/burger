
$(function () {
  $.ajax("/burgers", {
    type: "GET"
  }).then(function (data) {
    var devouredElem = $("#devoured");
    var burgerElem = $("#notDevoured");

    var burgers = data.burgers;
    var len = burgers.length;

    for (var i = 0; i < len; i++) {
      let new_elem;

      if (burgers[i].devoured) {
        new_elem = "<li>" +
        burgers[i].id +
        ". " + burgers[i].burger_name +
        "<button class='delete-burger' data-id='" +
        burgers[i].id +
        "'>DELETE!</button></li>";
      } else {
        new_elem = "<li>" +
        burgers[i].id +
        ". " + burgers[i].burger_name +
        "<button class='change-devoured' data-id='" +
        burgers[i].id +
        "' data-newDevoured='" +
        !burgers[i].devoured +
        "'>";
        new_elem += "Devour";
      }

      new_elem += "</button>";

    
      if (burgers[i].devoured) {
        devouredElem.append(new_elem);
      } else {
        burgerElem.append(new_elem);
      }
    }
  });

  $(document).on("click", ".change-devoured", function (event) {
    var id = $(this).data("id");
    var newDevoured = $(this).data("newDevoured") === true;

    var newDevouredState = {
      devoured: newDevoured
    };

    // Send the request.
    $.ajax("/burgers/" + id, {
      type: "PUT",
      data: JSON.stringify(newDevouredState),
      dataType: 'json',
      contentType: 'application/json'
    }).then(function () {
      console.log("changed devoured to", newDevoured);
      // Reloads the page
      location.reload();
    });
  });



  $(".create-form").on("submit", function (event) {
    //preventDefault on a submit event.
    console.log("Button works");
    event.preventDefault();

    var newBurger = {
      burger_name: $("#burger")
        .val()
        .trim(),
      devoured: false
    };

    // Send the POST request.
    $.ajax("/burgers", {
      type: "POST",
      data: JSON.stringify(newBurger),
      dataType: 'json',
      contentType: 'application/json'
    }).then(function () {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });



  $(document).on("click", ".delete-burger", function (event) {
    var id = $(this).data("id");

    // DELETE request.
    $.ajax("/burgers/" + id, {
      type: "DELETE"
    }).then(function () {
      console.log("deleted burger", id);
      // Reload page for updated list
      location.reload();
    });
  });
});