$(document).ready(function () {

    $.get('./js/data.json', function (data) {
        // console.log(data);


        data.forEach(function (project) {

            //console.log(project);
            $('.main__list').append(
                '<div class="project">' +
                '<h3 class="project__title">' + project.name + '</h3>' +
                '<p class="project__description">' + project.description + '</p>' +
                '<div class="project__detail"><div class="single__detail"><i class="fa fa-github-alt"></i><span class="project__detail__span">  GitHub: </span> ' +
                '<a href="' + project.html_url + '">' + project.html_url + '</a></div>' + '<div class="single__detail"><i class="fa fa-link"></i><span class="project__detail__span">  URL (live or demo version): </span> ' +
                '<a href="' + project.demo_url + '">' + project.demo_url + '</a></div>' + '<div class="single__detail"><span class="project__detail__span">Used skills: </span>' + project.tags + '</div>' +
                '</div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                '</div>');
            console.log(project.tags);

            for (var ind = 0; ind < project.tags.length; ind++) {
                var singleTag = project.tags[ind];
                $('.project__detail').append(
                    '<div class="project__detail__skill">' + singleTag
                );
                // console.log(singleTag);
            }


        });

        var filterTags = $('.filter__tag');
        filterTags.click(function () {
            var that = $(this);
            if ($(this).hasClass('filter--selected')) {

                $('.filter__title').text('All projects');
                $(this).removeClass('filter--selected');
                // console.log('remove class from active button');
                $('.project').addClass('project--hide');
                //console.log('show all projects');
                data.forEach(function (project) {

                    $('.main__list').append(
                        '<div class="project">' +
                        '<h3 class="project__title">' + project.name + '</h3>' +
                        '<p class="project__description">' + project.description + '</p>' +
                        '<div class="project__detail"><div class="single__detail"><span class="project__detail__span"><i class="fa fa-github-alt"></i>  GitHub: </span> ' +
                        '<a href="' + project.html_url + '">' + project.html_url + '</a></div>' + '<div class="single__detail"><span class="project__detail__span"><i class="fa fa-link"></i>  URL (live or demo version): </span> ' +
                        '<a href="' + project.demo_url + '">' + project.demo_url + '</a></div>' +
                        '</div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                        '</div>');

                });
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

                //console.log(data);
                for (var i = 0; i < data.length; i++) {
                    var singleProject = data[i];
                    for (var index = 0; index < singleProject.tags.length; index++) {
                        var singleTag = singleProject.tags[index];
                        if (singleTag === that.attr('id')) {
                            //console.log(singleProject);
                            $('.main__list').append(
                                '<div class="project">' +
                                '<h3 class="project__title">' + singleProject.name + '</h3>' +
                                '<p class="project__description">' + singleProject.description + '</p>' +
                                '<div class="project__detail"><div class="single__detail"><span class="project__detail__span"><i class="fa fa-github-alt"></i>  GitHub: </span> ' +
                                '<a href="' + singleProject.html_url + '">' + singleProject.html_url + '</a></div>' + '<div class="single__detail"><span class="project__detail__span"><i class="fa fa-link"></i>  URL (live or demo version): </span> ' +
                                '<a href="' + singleProject.demo_url + '">' + singleProject.demo_url + '</a></div>' +
                                '</div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                                '</div>');

                        }
                    }
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