let data;
$.ajax({
  url: "https://usman-fake-api.herokuapp.com/api/recipes",
  type: "GET",
  async: false,
  success: function (response) {
    data = response;
  },
  error: function (error) {
    console.error("Error:", error);
  },
});

const table = document.querySelector(".table-js");
let total = "";
data.forEach((ele) => {
  total += `
    <tr>
          <td>${ele.title}</td>
          <td>${ele.body}</td>
          <td><button type="button" class="btn btn-outline-primary edit-js" id="${ele._id}"> Edit
          </button></td>
          <td><button type="button" class="btn btn-outline-primary delete-js" id="${ele._id}"> Delete
          </button></td>
        </tr>
    
    `;
});
table.innerHTML = total;

//POST API
const add = document.querySelector(".add-js");
add.addEventListener("click", () => {
  const title = document.querySelector(".title-js").value;
  const recipe = document.querySelector(".recipe-js").value;

  const myData = {
    title,
    body: recipe,
  };

  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/api/recipes",
    type: "POST",
    contentType: "application/json",
    async: false,
    data: JSON.stringify(myData),
    success: function (response) {
      console.log("Success:", response);
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
  location.reload();
});

//PUT API
$(".edit-js").on("click", function () {
  const ID = this.id;
  $("#recipeModal").modal("show");

  $(".sumbit-js").on("click", () => {
    title = $("#title").val();
    recipe = $("#recipe").val();
    const myData = {
      title,
      body: recipe,
    };

    $("#recipeModal").modal("hide");
    $.ajax({
      url: "https://usman-fake-api.herokuapp.com/api/recipes/" + ID,
      type: "PUT",
      async: false,
      contentType: "application/json",
      data: JSON.stringify(myData),
      success: function (response) {
        console.log("Updated Successfully:", response);
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
    location.reload();
  });
});

//DELETE API
$(".delete-js").on("click", function () {
  const ID = this.id;
  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/api/recipes/" + ID,
    type: "DELETE",
    async: false,
    success: function (response) {
      console.log("Success:", response);
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
  location.reload();
});