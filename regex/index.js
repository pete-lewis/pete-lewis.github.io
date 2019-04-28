"use strict";

const btnExecHandler = function(e){
    let expression = document.getElementById("expression").value;
    let data = document.getElementById("data").value;
    let flags = getFlags();

    let regex = new RegExp(expression, flags);
    let matches = data.match(regex);

    displayMatches(matches);
};

const getFlags = function(){
    let output = "";

    document.querySelectorAll("input[data-flag]:checked")
        .forEach(function(input){
            output += input.getAttribute("data-flag");
        });
    
    return output;
};

const displayMatches = function(matches){
    const results = document.getElementById("results");

    if (!matches || !matches.length) {
        results.innerHTML = "No matches!";
        return;
    }

    const list = document.createElement("ul");

    matches.forEach(function(value){
        const item = document.createElement("li");
        const tnode = document.createTextNode(value);
        item.append(tnode);
        list.append(item);
    });

    results.innerHTML = "Matches";
    results.append(list);
};


document.addEventListener("DOMContentLoaded", function(e){
    
    let btn = document.getElementById("btn-execute");
    btn.addEventListener("click", btnExecHandler);
});