/////////////////////////////
//     CONTROLS SETUP      //
/////////////////////////////

// Listen for file select
$("#fileSelect").change(function () {
    let file = $(this).prop('files')[0];
    const reader = new FileReader();
    reader.addEventListener(
        "load",
        () => loadAdif(reader.result),
        false,
    );
    if (file) {
        reader.readAsText(file);
    }
});

function updatePosFromGridInput() {
    let grid = $("#qthGrid").val().toUpperCase();
    let pos = null;
    if (/^[A-R]{2}[0-9]{2}([A-X]{2})?$/.test(grid)) {
        pos = latLonForGrid(grid);
    }
    setQTH(pos);
    updateMapObjects();
}

// Listen for QTH grid input
$("#qthGrid").on("input", function(e) {
    updatePosFromGridInput();
});

// Listen for lines enabled toggle
$("#linesEnabled").change(function () {
    linesEnabled = $(this).is(':checked');
    updateMapObjects();
});

// Listen for band colours toggle
$("#bandColours").change(function () {
    bandColours = $(this).is(':checked');
    updateMapObjects();
});
