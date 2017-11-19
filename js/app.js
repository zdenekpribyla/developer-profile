// var _ = require('lodash');

$(document).ready(function () {

    $.get('./js/data.json', function (data) {
        console.log(data);


        _.forEach(data, function (project) {

            $('.main__list').append(
                '<div class="project">' +
                '<h2 class="project__title">' + project.name + '</h2>' +
                '<p class="project__description">' + project.description + '</p>' +
                '<div class="project__detail">Watch code source: ' +
                '<a href="' + project.html_url + '">' + project.html_url + '</a>' +
                '</div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                '</div>');


        });
        var filterTags = $('.filter__tag');
        filterTags.click(function () {
            var that = $(this);
            if ($(this).hasClass('filter--selected')) {

                $('.filter__title').text('All projects');
                $(this).removeClass('filter--selected');
                // console.log('remove class from active button');
                $('.project').removeClass('project--hide');
                //console.log('show all projects');
            }
            else {
                $('.filter__title').text('Projects using ' + $(this).text());
                filterTags.removeClass('filter--selected');
                // console.log('remove class .filter__selected everywhere');
                $(this).addClass('filter--selected');
                // console.log('add class filter__selected on that button');
                $('.project').addClass('project--hide');
                //console.log('remove all projects');
                // ==> add .map for tags and after .filter for projects with specific tag
                if (that.attr('id') === tag) {
                    console.log('rovnaji se');
                    //  ==> show all projects with that specific tag
                }
                else {

                    console.log('nerovnaji se');
                }
            }
        });

    });


    var rotation = 0;

    // https://stackoverflow.com/questions/1359018/in-jquery-how-to-attach-events-to-dynamic-html-elements
    $('.main__list').on('click', '.project__btn', function () {
        console.log('click button');
        var projectDetail = $(this).parent().find('.project__detail');
        $(projectDetail).toggle(450);
        rotation += 180;

        var that = $(this);
        setTimeout(function () {
            console.log('setTimeout');
            that.css({
                'transform': 'rotate(' + rotation + 'deg)'
            });
        }, 500)


    });

});


// api of gitHub projects: https://api.github.com/users/zdenekpribyla/repos