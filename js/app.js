$(document).ready(function () {

    console.log('jQuery ready');

    $.get('https://api.github.com/users/zdenekpribyla/repos', function (data) {
        console.log(data);

        data.forEach(function (project) {


            $('.projects-list').append('<div class="project"><h2 class="projects__title">' + project.name + '</h2><p class="projects__description">' + project.description +
                '</p><div class="projects__read-more"><input type="button" value="Read Details" class="button-class"></div><div class="projects__details" id="project-details">Watch code source: ' + '<a href="' + project.html_url + '">' + project.html_url + '</div></div>')
            
        });


    });

});


