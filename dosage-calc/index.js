"use strict";

var getValue = function(id){
    var el = document.getElementById(id);
    return parseFloat(trim(el.value)) || 0;
};

var getSelectValue = function(id){
    var el = document.getElementById(id),
        index = Math.max(el.selectedIndex, 0);
    return el.options[index].value;
};

var trim = function(s){
    if ( typeof s === "string" ) {
        return s.replace( /^\s+|\s+$/g, "" );
    }
    return s;
};

var calcButtonClick = function(e){
    var bg = getValue("bg"),
        targetBg = getValue("target-bg"),
        timeProfile = getSelectValue("time-profile"),
        correctionRatio = getValue("correction-ratio-" + timeProfile), 
        foodGrams = getValue("food-grams"), 
        gramsPerUnit = getValue("grams-per-unit-" + timeProfile), 
        resultElement = document.getElementById("result"),
        warningElement = document.getElementById("warning");
    
    warningElement.innerHTML = "";
    
    var result = (( bg - targetBg ) / correctionRatio) + (foodGrams / gramsPerUnit);
    
    var warnings = [];
    
    if (bg < 40 || bg > 500)
        warnings.push("Current BG " + bg);
    if (targetBg < 80 || targetBg > 150)
        warnings.push("Target BG " + targetBg);
    if (correctionRatio < 100 || correctionRatio > 150)
        warnings.push("Correction Ratio " + correctionRatio);
    if (foodGrams < 0 || foodGrams > 110)
        warnings.push("Food Grams " + foodGrams);
    if (gramsPerUnit < 10 || gramsPerUnit > 100)
        warnings.push("Grams Per Unit " + gramsPerUnit);
    
    resultElement.innerHTML = result.toFixed(2);
    resultElement.className = ( result > 0 && warnings.length === 0 ) ? "success" : "warning";
    
    if (warnings.length)
        warningElement.innerHTML = "These values are suspect: " + warnings.join(", ") + ". Review the values carefully."
    
};

var toggleVariables = function(e){
    var container = document.getElementById("variables");
    if (/hidden/.test(container.className))
        container.className = "";
    else
        container.className = "hidden";
};

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("btn-calculate")
        .addEventListener("click", calcButtonClick);
        
    document.getElementById("toggle-variables")
        .addEventListener("click", toggleVariables);

    // if after 7pm, default to "Overnight" time profile
    if ((new Date()).getHours() >= 19) {
        document.getElementById("time-profile").selectedIndex = 1;
    }

});