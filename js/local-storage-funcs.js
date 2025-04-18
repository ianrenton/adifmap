/////////////////////////////
// LOCAL STORAGE FUNCTIONS //
/////////////////////////////
// noinspection JSJQueryEfficiency

// Load from local storage or use default
function localStorageGetOrDefault(key, defaultVal) {
    const valStr = localStorage.getItem(key);
    if (null === valStr) {
        return defaultVal;
    } else {
        return JSON.parse(valStr);
    }
}

// Load from local storage and set GUI up appropriately
function loadLocalStorage() {
    let tmpBbasemap = localStorageGetOrDefault('basemap', basemap);
    $("#basemap").val(tmpBbasemap);
    let tmpBasemapOpacity = localStorageGetOrDefault('basemapOpacity', basemapOpacity);
    $("#basemapOpacity").val(tmpBasemapOpacity);
    let tmpQthGrid = localStorageGetOrDefault('qthGrid', '');
    $("#qthGrid").val(tmpQthGrid);
    let tmpShowMaidenheadGrid = localStorageGetOrDefault('showMaidenheadGrid', showMaidenheadGrid);
    $("#showMaidenheadGrid").prop('checked', tmpShowMaidenheadGrid);
    let tmpMarkersEnabled = localStorageGetOrDefault('markersEnabled', markersEnabled);
    $("#markersEnabled").prop('checked', tmpMarkersEnabled);
    let tmpLinesEnabled = localStorageGetOrDefault('linesEnabled', linesEnabled);
    $("#linesEnabled").prop('checked', tmpLinesEnabled);
    let tmpGridSquaresEnabled = localStorageGetOrDefault('gridSquaresEnabled', gridSquaresEnabled);
    $("#gridSquaresEnabled").prop('checked', tmpGridSquaresEnabled);
    let tmpColourLines = localStorageGetOrDefault('colourLines', colourLines);
    $("#colourLines").prop('checked', tmpColourLines);
    let tmpBandColours = localStorageGetOrDefault('bandColours', bandColours);
    $("#bandColours").prop('checked', tmpBandColours);
    let tmpModeColours = localStorageGetOrDefault('modeColours', modeColours);
    $("#modeColours").prop('checked', tmpModeColours);
    let tmpSmallMarkers = localStorageGetOrDefault('smallMarkers', smallMarkers);
    $("#smallMarkers").prop('checked', tmpSmallMarkers);
    let tmpOutdoorSymbols = localStorageGetOrDefault('outdoorSymbols', outdoorSymbols);
    $("#outdoorSymbols").prop('checked', tmpOutdoorSymbols);
    let tmpHybridMarkerSize = localStorageGetOrDefault('hybridMarkerSize', hybridMarkerSize);
    $("#hybridMarkerSize").prop('checked', tmpHybridMarkerSize);
    let tmpCallsignLabels = localStorageGetOrDefault('callsignLabels', callsignLabels);
    $("#callsignLabels").prop('checked', tmpCallsignLabels);
    let tmpQueryQRZ = localStorageGetOrDefault('queryQRZ', queryQRZ);
    $("#queryQRZ").prop('checked', tmpQueryQRZ);
    let tmpQrzUser = localStorageGetOrDefault('qrzUser', '');
    $("#qrzUser").val(tmpQrzUser);
    let tmpQrzPass = localStorageGetOrDefault('qrzPass', '');
    $("#qrzPass").val(tmpQrzPass);

    // Load lookup data. This had to be converted to an object for storage, now we need it back as a map.
    const lookupDataStr = localStorage.getItem('lookupData');
    if (lookupDataStr !== null) {
        lookupData = new Map(Object.entries(JSON.parse(lookupDataStr)));
    }

    updateModelFromUI();
}
