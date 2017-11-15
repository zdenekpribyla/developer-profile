$(document).ready(function () {

    $.get('./js/data.json', function (data) {
        console.log(data);


        data.forEach(function (project) {

            $('.center__list').append(
                '<div class="project">' +
                '<h2 class="project__title">' + project.name + '</h2>' +
                '<p class="project__description">' + project.description + '</p>' +
                '<div class="project__detail">Watch code source: ' +
                '<a href="' + project.html_url + '">' + project.html_url + '</a>' +
                '</div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                '</div>')
        });

    });
    //https://stackoverflow.com/questions/17525205/trying-to-rotate-a-button-in-jquery
    var rotation = 0;
    jQuery.fn.rotate = function (degrees) {
        $(this).css({
            '-webkit-transform': 'rotate(' + degrees + 'deg)',
            '-moz-transform': 'rotate(' + degrees + 'deg)',
            '-ms-transform': 'rotate(' + degrees + 'deg)',
            'transform': 'rotate(' + degrees + 'deg)'
        });
    };

    // https://stackoverflow.com/questions/1359018/in-jquery-how-to-attach-events-to-dynamic-html-elements
    $('.center__list').on('click', '.project__btn', function () {
        console.log('click button');
        var projectDetail = $(this).parent().find('.project__detail');
        $(projectDetail).toggle(400);
        rotation += 180;
        $(this).rotate(rotation);
    });

    var filterTags = $('.filter__tag');

    filterTags.click(function () {
        if ($(this).hasClass('filter__selected')) {
            $(this).removeClass('filter__selected');
            console.log('remove class from active button');
        }
        else {
            filterTags.removeClass('filter__selected');
            console.log('remove class .filter__selected everywhere');
            $(this).addClass('filter__selected');
            console.log('add class filter__selected on that button');
        }


    });

});


//https://api.github.com/users/zdenekpribyla/repos