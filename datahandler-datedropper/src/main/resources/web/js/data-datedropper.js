function(wgt, dataValue) {
    options = dataValue.length > 0 ? $.evalJSON(dataValue) : {};
    jq(wgt.$n()).dateDropper(options);
}
