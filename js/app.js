$(document).ready(function () {

    console.log('jQuery ready');

    $.get('https://api.github.com/users/zdenekpribyla/repos', function (data) {
        console.log(data);

        data.forEach(function (project) {

            $('.center__list').append(
                '<div class="project">' +
                '<h2 class="project__title">' + project.name + '</h2>' +
                '<p class="project__description">' + project.description + '</p>' +
                '<button type="button" class="project__detail-btn">Open details</button>' +
                '<div class="project__detail">Watch code source: ' +
                '<a href="' + project.html_url + '">' + project.html_url + '</a>' +
                '</div>' +
                '</div>')
        });

    });

    // https://stackoverflow.com/questions/1359018/in-jquery-how-to-attach-events-to-dynamic-html-elements
    $('.center__list').on('click', '.project__detail-btn', function () {
        console.log('click button');
        var projectDetail = $(this).parent().find('.project__detail');
        $(projectDetail).toggle(400);
    });


});
// var isElementVisible = false;
//
// if (isElementVisible) {
//     projectDetail.hide();
//     console.log('spustil if');
//     isElementVisible = false
// }
// else {
//     projectDetail.show();
//     console.log('spustil else');
//     isElementVisible = true
// }






