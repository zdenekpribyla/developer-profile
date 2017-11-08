
$(document).ready(function () {

    console.log('jQuery ready');


});


var url = 'https://api.github.com/users/zdenekpribyla/repos';
fetch(url)
    .then((resp) => resp.json())

.then(function (data) {
    //console.log(data);

    data.forEach(function (project) {


        var parentElement = document.getElementById('result');

        var newCreatedElement = document.createElement("div");
        newCreatedElement.className = "projects";

        newCreatedElement.innerHTML = ('<h2 class="projects__title">' + project.name + '</h2>' +
            '<p class="projects__description">' + project.description + '</p><div class="projects__read-more"><input type="button" value="Read Details" class="button-class"></div><div class="projects__details" id="project-details">Watch code source: ' + '<a href="' + project.html_url + '">' + project.html_url + '</div>');

        parentElement.appendChild(newCreatedElement);


    });
    var buttonsClass = document.getElementsByClassName('button-class');
    for (i = 0; i < buttonsClass.length; i++) {
        buttonsClass[i].addEventListener('click', function () {
            console.log('klik funguje');

        })
    }


});


