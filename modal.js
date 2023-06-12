// modals
const openDialogBtns = document.querySelectorAll(".open-dialog-btn");
const dialogs = document.querySelectorAll(".dialog");

openDialogBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    dialogs[index].showModal();
  });
});

const closeDialogBtns = document.querySelectorAll(".close-dialog-btn");
closeDialogBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".dialog").close();
  });
});

// isotope shit

var grid = document.querySelector(".gallery");

imagesLoaded(grid, function () {
  var gallery = document.querySelector(".gallery");
  var filterButtons = document.querySelectorAll("#filter-buttons button");
  var clearFilterButton = document.querySelector("#clear-filter");

  var iso = new Isotope(gallery, {
    itemSelector: ".gallery-item",
    masonry: {
      columnWidth: ".gallery-item",
      horizontalOrder: true,
    },
  });

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      var filterValue = button.getAttribute("data-filter");
      iso.arrange({ filter: filterValue });
    });
  });

  var allButton = document.querySelector(
    "#filter-buttons button[data-filter='*']"
  );
  allButton.classList.add("active");

  clearFilterButton.addEventListener("click", function () {
    iso.arrange({ filter: "*" });
  });
});
