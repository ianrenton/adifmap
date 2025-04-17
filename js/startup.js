/////////////////////////////
//         STARTUP         //
/////////////////////////////

// Set up map
setUpMap();

// Restore previous values and clear the ADIF file selector.
$("#fileSelect").val("");
// Add a hort delay before we load the rest of the UI control settings into the model,
// to remove some issues with the ExtraMarkers library having an asynchronous load.
setTimeout(function () {
    loadLocalStorage();
}, 1000);

// Add the timed thread to process the queue.
setInterval(function () { processQSOFromQueue(); }, 1000);

// Add the timed thread to update the status indicator.
setInterval(function () { updateStatus(); }, 500);