$(document).ready(function () {

    $.get('./js/data.json/', function (data) {
        data.mySkills.forEach(function (skill) {
            console.log("mySkills");
            $('.filter__input-tag').append(
                '<li class="filter__tag" id="' + skill.name + '">' + skill.name + '</li>'
            );


            $('.footer__input-star').append(
                '<li><div class=""><div class="footer__tag">' + skill.name + '</div><div class="footer__star">' +
                '<ul class="ratingSM o' + skill.rating + 'star"><li class="one">1</li><li class="two">2</li>' +
                '<li class="three">3</li><li class="four">4</li><li class="five">5</li></ul></div></div></li>'
            )
        });


        // console.log(data);
        data.myProjects.forEach(function (project) {

            var projectTags = '';

            project.tags.forEach(function (singleTag) {
                console.log('tag: ' + singleTag); // az sem to je dobre

                projectTags = projectTags + '<div class="project__tag-single">' + singleTag + '</div>'
            });

            console.log('-----------------');
            console.log('nazev projektu: ' + project.name);
            $('.main__list').append(
                '<div class="project">' +
                '<h3 class="project__title">' + project.name + '</h3>' +
                '<p class="project__description">' + project.description + '</p>' +
                '<div class="project__detail"><div class="single__detail"><i class="fa fa-github-alt"></i><span class="project__detail__span">  GitHub: </span> ' +
                '<span class="link"><a target="_blank" href="' + project.html_url + '">' + project.html_url + '</a></span></div>' + '<div class="single__detail"><i class="fa fa-link"></i><span class="project__detail__span">  Demo: </span> ' +
                '<span class="link"><a target="_blank" class="link" href="' + project.demo_url + '">' + project.demo_url + '</a></span></div>' +
                 '<div class="project_tag">' + projectTags + '</div></div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                '</div>');
            console.log(project.tags);






            // pridava .hide--selector uplne kazdemu projektu misto jen tomu jednomu
            // if (project.demo_url === null) {
            //     $('.project__detail').addClass('hide--selector');
            //     console.log("skryj project detail");
            //
            // }


        });


        var filterTags = $('.filter__tag');
        filterTags.click(function () {
            var that = $(this);
            if ($(this).hasClass('filter--selected')) {

                $('.filter__title').text('All Projects');
                $(this).removeClass('filter--selected');
                // console.log('remove class from active button');
                $('.project').addClass('project--hide');
                //console.log('show all projects');
                data.myProjects.forEach(function (project) {

                    $('.main__list').append(
                        '<div class="project">' +
                        '<h3 class="project__title">' + project.name + '</h3>' +
                        '<p class="project__description">' + project.description + '</p>' +
                        '<div class="project__detail"><div class="single__detail"><span class="project__detail__span"><i class="fa fa-github-alt"></i>  GitHub: </span> ' +
                        '<span class="link"><a target="_blank" href="' + project.html_url + '">' + project.html_url + '</a></span></div>' + '<div class="single__detail"><span class="project__detail__span"><i class="fa fa-link"></i>  URL (live or demo version): </span> ' +
                        '<span class="link"><a target="_blank" href="' + project.demo_url + '">' + project.demo_url + '</a></span></div>' +
                        '</div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                        '</div>');

                });
            }
            else {
                $('.filter__title').text('Projects Using ' + $(this).text());
                filterTags.removeClass('filter--selected');
                // console.log('remove class .filter__selected everywhere');
                $(this).addClass('filter--selected');
                // console.log('add class filter__selected on that button');
                $('.project').addClass('project--hide');
                //console.log('remove all projects');
                // ==> add .map for tags and after .filter for projects with specific tag

                //console.log(data);
                for (var i = 0; i < data.myProjects.length; i++) {
                    var singleProject = data.myProjects[i];
                    for (var index = 0; index < singleProject.tags.length; index++) {
                        var singleTag = singleProject.tags[index];
                        if (singleTag === that.attr('id')) {
                            //console.log(singleProject);
                            $('.main__list').append(
                                '<div class="project">' +
                                '<h3 class="project__title">' + singleProject.name + '</h3>' +
                                '<p class="project__description">' + singleProject.description + '</p>' +
                                '<div class="project__detail"><div class="single__detail"><span class="project__detail__span"><i class="fa fa-github-alt"></i>  GitHub: </span> ' +
                                '<span class="link"><a target="_blank" href="' + singleProject.html_url + '">' + singleProject.html_url + '</a></span></div>' + '<div class="single__detail"><span class="project__detail__span"><i class="fa fa-link"></i>  URL (live or demo version): </span> ' +
                                '<span class="link"><a target="_blank" href="' + singleProject.demo_url + '">' + singleProject.demo_url + '</a></span></div>' +
                                '</div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                                '</div>');

                        }
                    }
                }
            }
        });

    });


    // alternative solution: https://stackoverflow.com/questions/1359018/in-jquery-how-to-attach-events-to-dynamic-html-elements
    $('.main__list').on('click', '.project__btn', function () {
        console.log('click button');
        var projectDetail = $(this).parent().find('.project__detail');
        $(projectDetail).toggle(450);


        var that = $(this);
        setTimeout(function () {
            if (that.hasClass('project__btn-rotate')) {
                that.removeClass('project__btn-rotate').animate({opacity: '0.4'}, "slow").animate({opacity: '1'}, 150);
            }
            else {
                that.addClass('project__btn-rotate').animate({opacity: '0.4'}, "slow").animate({opacity: '1'}, 150);
            }
        }, 300)


    });


    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scroll-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });


});


// api of gitHub projects: https://api.github.com/users/zdenekpribyla/repos