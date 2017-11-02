//var _ = require('lodash');
//
// var testApp = function () {
//     alert('hi man')
// };


// var projectsDetails = document.getElementsByClassName('projects__details');
// for(var i = 0; i < projectsDetails.length; i++) {
//     var result = projectsDetails[i];
//     console.log('result :' + result);
// }





var url = 'https://api.github.com/users/zdenekpribyla/repos';
fetch(url)
    .then((resp) => resp.json())
.then(function(data) {
console.log(data);

var onlyName = data.map(function (projects) {
    return projects;
});

onlyName.forEach(function (project) {


    //http://clubmate.fi/append-and-prepend-elements-with-pure-javascript/
    var parent = document.getElementById('result');
    // Make a new div
    var divChild = document.createElement("div");
    divChild.className = "projects";
// Give the new div some content
    divChild.innerHTML = ('<h2 class="projects__title">' + project.name + '</h2>' +
        '<p class="projects__description">' + project.description + '</p><div class="projects__read-more"><input type="button" onclick="readDetails()" value="Read Details"></div><div class="projects__details" id="project-details">Watch code source: '+ '<a href="' + project.html_url + '">' + project.html_url + '</div>');

// Chug in into the parent element
    parent.appendChild(divChild);

});

});

// display/hide detail of every project
var isDetailsVisible = false;
var readDetails = function () {
    if (isDetailsVisible) {

        document.getElementById('project-details').style.display = 'none';
        isDetailsVisible = false
    }
    else {

        document.getElementById('project-details').style.display = 'block';
        isDetailsVisible = true
    }
};




