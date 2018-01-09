var footerTagGenerator = function (skillName, className) {
    return '<div class="' + className + '">' + skillName + '</div>'
};

//Rating stars
var emptyStar = '<i class="fa fa-star-o fa-yellow" aria-hidden="true"></i>';
var fullStar = '<i class="fa fa-star fa-yellow" aria-hidden="true"></i>';
var halfStar = '<i class="fa fa-star-half-o fa-yellow" aria-hidden="true"></i>';

var footerStarsGenerator = function (number) {
    var starRaitingIsInteger = number % 1 === 0;
    // console.log('isInteger', isInteger);

    var fullStarsNumber = '';
    var emptyStarsNumber = '';
    var starsMaximumNumber = 5;
    if (starRaitingIsInteger) {

        for (var a = 0; a < number; a++) {
            fullStarsNumber = fullStarsNumber + fullStar
        }
        for (var b = 0; b < (starsMaximumNumber - number); b++) {
            emptyStarsNumber = emptyStarsNumber + emptyStar
        }
        return fullStarsNumber + emptyStarsNumber
    }

    else {

        for (var c = 0; (c + 1) < number; c++) {
            fullStarsNumber = fullStarsNumber + fullStar
        }
        var roundNumber = Math.ceil(number);
        for (var d = 0; d < (starsMaximumNumber - roundNumber); d++) {
            emptyStarsNumber = emptyStarsNumber + emptyStar
        }
        return fullStarsNumber + halfStar + emptyStarsNumber
    }
};

var filterAndProjectTagsGenerator = function (tags, className) {

    var projectTags = '';
    tags.forEach(function (singleTag) {
        // console.log('tag: ' + singleTag); // az sem to je dobre
        //
        // console.log('type of tags', typeof singleTag);

        if (typeof singleTag === 'object') {
            singleTag = singleTag.name
        }

        projectTags = projectTags + '<div class="' + className + '"' + ' id="' + singleTag + '">' + singleTag + '</div>'
    });
    return projectTags
};

var projectDetailUrlGenerator = function (projectDetailClassName, iconClassName, titleClassName, titleText, linkClassName, url) {

    var typeOfUrlResult;
    if (url === ""
        || typeof url === "object"
        || typeof url === "boolean"
        || typeof url === "function"
        || typeof url === "number"
        || typeof url === "undefined") {

        typeOfUrlResult = "";
    }

    else if (url.indexOf("http") >= 0) {  //possible to use => url.include("http") === true

        typeOfUrlResult = '<div class="' + projectDetailClassName + '"><i class="fa ' + iconClassName + '"></i><span class="'
            + titleClassName + '">' + titleText + ': </span><span class="' + linkClassName + '"><a target="_blank" href="' + url + '">' +
            url + '</a></span></div>';
    }

    else {

        typeOfUrlResult = '<div class="' + projectDetailClassName + '"><i class="fa ' + iconClassName + '"></i><span class="'
            + titleClassName + '">' + titleText + ': </span><span class="' + linkClassName + '">private url</span></div>';
        // console.log('spustil se private url');
    }

    return typeOfUrlResult;

};

$(document).ready(function () {

    $.get('./js/data.json/', function (data) {
        data.mySkills.forEach(function (skill) {
            console.log("mySkills");

            $('.footer__input-star').append(
                '<div class="">' + footerTagGenerator(skill.name, "footer__tag") + '<div class="footer__star">' +
                footerStarsGenerator(skill.rating) + '</div>'
            )


        });

        $('.filter__input-tag').append(
            filterAndProjectTagsGenerator(data.mySkills, 'filter__tag')
        );


        // console.log(data);
        data.myProjects.forEach(function (project) {

            console.log('-----------------');
            console.log('nazev projektu: ' + project.name);
            $('.main__list').append(
                '<div class="project">' +
                '<h3 class="project__title">' + project.name + '</h3>' +
                '<p class="project__description">' + project.description + '</p>' +
                '<div class="project__detail">' +
                projectDetailUrlGenerator("single__detail", "fa-github-alt", "project__detail__span", " GitHub", "link", project.html_url) +
                projectDetailUrlGenerator("single__detail", "fa-link", "project__detail__span", " Demo", "link", project.demo_url) +
                '<div class="project_tag"><i class="fa fa-trophy"></i><span class="project__detail__span">  Used Skills  </span>' + filterAndProjectTagsGenerator(project.tags, 'project__tag-single') + '</div></div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                '</div>');


            console.log(project.tags);

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


                    $('.main__list').append(
                        '<div class="project">' +
                        '<h3 class="project__title">' + project.name + '</h3>' +
                        '<p class="project__description">' + project.description + '</p>' +
                        '<div class="project__detail"><div class="single__detail"><span class="project__detail__span"><i class="fa fa-github-alt"></i>  GitHub: </span> ' +
                        '<span class="link"><a target="_blank" href="' + project.html_url + '">' + project.html_url + '</a></span></div>' + '<div class="single__detail"><span class="project__detail__span"><i class="fa fa-link"></i>  URL (live or demo version): </span> ' +
                        '<span class="link"><a target="_blank" href="' + project.demo_url + '">' + project.demo_url + '</a></span></div>' +
                        '</div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                        '</div>');


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
                data.myProjects.forEach(function (project) {

                    project.tags.forEach(function (singleTag) {



                        if (singleTag === that.attr('id')) {
                            //console.log(singleProject);
                            $('.main__list').append(
                                '<div class="project">' +
                                '<h3 class="project__title">' + project.name + '</h3>' +
                                '<p class="project__description">' + project.description + '</p>' +
                                '<div class="project__detail"><div class="single__detail"><span class="project__detail__span"><i class="fa fa-github-alt"></i>  GitHub: </span> ' +
                                '<span class="link"><a target="_blank" href="' + project.html_url + '">' + project.html_url + '</a></span></div>' + '<div class="single__detail"><span class="project__detail__span"><i class="fa fa-link"></i>  URL (live or demo version): </span> ' +
                                '<span class="link"><a target="_blank" href="' + project.demo_url + '">' + project.demo_url + '</a></span></div>' +
                                '</div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                                '</div>');

                        }
                    })
                })
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