/////////////////////////////
//   ADIF LOAD FUNCTIONS   //
/////////////////////////////

// Given the text of an adif file, populate the qsos map.
function loadAdif(text) {
    qsos = [];
    let cursor = 0;
    let qsoCount = 0;
    let qsoCountWithGrids = 0;

    $("#loadingStatus").html("<i class=\"fa-solid fa-spinner\"></i> Loading...");
    $("#loadingStatus").show();

    setTimeout(function () {
        try {
            // Find the end of the header and the start of actual records
            while (text.substring(cursor, cursor + 5).toUpperCase() !== "<EOH>") {
                cursor += 1;
            }
            cursor += 5;

            // In the content. Parse the QSOs
            let finishedFile = false;
            while (!finishedFile) {
                let qso = new Map();
                let finishedRecord = false;
                while (!finishedRecord) {
                    let openBracketPos = text.indexOf('<', cursor);

                    // Figure out if this is the end of the file
                    if (!cursor || openBracketPos === -1 || cursor >= text.length) {
                        finishedRecord = true;
                        finishedFile = true;
                        break;
                    }

                    // Figure out if this is the end of the record
                    if (text.substring(cursor, cursor + 5).toUpperCase() === "<EOR>") {
                        finishedRecord = true;
                        cursor += 5;
                        break;
                    }

                    // Still got more fields in this record, so continue to parse
                    let colonPos = text.indexOf(':', openBracketPos);
                    let fieldName = text.substring(openBracketPos + 1, colonPos).toUpperCase();
                    let closeBracketPos = text.indexOf('>', colonPos);
                    let fieldLength = parseInt(text.substring(colonPos + 1, closeBracketPos));
                    let fieldValue = text.substring(closeBracketPos + 1, closeBracketPos + 1 + fieldLength).trim();

                    // Populate QSO field
                    qso.set(fieldName, fieldValue);

                    // If we have MY_GRIDSQUARE, use it
                    if (fieldName === "MY_GRIDSQUARE") {
                        $("#qthGrid").val(fieldValue.substring(0, 6));
                        updatePosFromGridInput();
                    }

                    // Move the cursor ready for the next one
                    cursor = closeBracketPos + 2 + fieldLength;
                }
                qsos.push(qso);

                // Increment counters
                qsoCount++;
                if (qso.has("GRIDSQUARE") && qso.get("GRIDSQUARE")) {
                    qsoCountWithGrids++;
                }
            }

            updateMapObjects();
            zoomToFit();
        } catch (e) {
            console.error(e);
        } finally {
            updateStatus(qsoCount, qsoCountWithGrids);
        }
    }, 500);
}

function updateStatus(count, countWithGrids) {
    let statusText = "";
    if (count > 0) {
        if (countWithGrids < count) {
            statusText += "<i class=\"fa-solid fa-check\"></i>";
        } else {
            statusText += "<i class=\"fa-solid fa-triangle-exclamation\"></i>";
        }
        statusText += " Loaded " + count + " QSOs."
        if (countWithGrids < count) {
            statusText += " " + countWithGrids + " contained grids.";
        }
    } else {
        statusText += "<i class=\"fa-solid fa-triangle-exclamation\"></i> Failed to parse QSOs in this file";
    }
    $("#loadingStatus").html(statusText);
}