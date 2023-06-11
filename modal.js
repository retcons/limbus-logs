    // Get all the open dialog buttons and dialog elements
    const openDialogBtns = document.querySelectorAll('.open-dialog-btn');
    const dialogs = document.querySelectorAll('.dialog');

    // Open the corresponding dialog when an open button is clicked
    openDialogBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        dialogs[index].showModal();
      });
    });

    // Close the dialog when the close button is clicked
    const closeDialogBtns = document.querySelectorAll('.close-dialog-btn');
    closeDialogBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.closest('.dialog').close();
      });
    });