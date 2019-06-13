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
            + titleClassName + '">' + titleText + ': </span><span class="' + linkClassName + '">on request available</span></div>';
        // console.log('spustil se private url');
    }

    return typeOfUrlResult;

};

$(document).ready(function () {

    $.get('js/data.json', function (data) {
        // console.log("data is ready");
        data.mySkills.forEach(function (skill) {
            // console.log("mySkills");

            $('.footer__input-star').append(
                '<div class="">' + footerTagGenerator(skill.name, "footer__tag") + '<div class="footer__star">' +
                footerStarsGenerator(skill.rating) + '</div>'
            )


        });

        $('.filter__input-tag').append(
            filterAndProjectTagsGenerator(data.mySkills, 'filter__tag')
        );

        


        data.myProjects.forEach(function (project) {

            // divide project description on two part
            var prodesArray = (project.description).split(" ")
            numberOfCutWords = 10  // change number of trimmed words
            sliceA = prodesArray.slice(0, numberOfCutWords).join(' ')
            sliceB = prodesArray.slice(numberOfCutWords).join(' ')
            divideProjectDescription = '<p class="project__description"><span class="project__description-a">' + sliceA + '</span><span class="project__description-three-dots">...</span><span class="project__description-b hide--selector">' + sliceB + '<span></p>'


            $('.main__list').append(
                '<div class="project">' +
                '<h3 class="project__title">' + project.name + '</h3>' + divideProjectDescription +
                '<div class="project__details">' +
                projectDetailUrlGenerator("project__single-detail", "fa-github-alt", "project__single-detail__span", " GitHub", "link", project.html_url) +
                projectDetailUrlGenerator("project__single-detail", "fa-link", "project__single-detail__span", " url", "link", project.demo_url) +
                '<div class="project_tag"><i class="fa fa-trophy"></i><span class="project__single-detail__span">  Used Skills  </span>' + filterAndProjectTagsGenerator(project.tags, 'project__tag-single') + '</div></div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                '</div>');

        });

        var filterTags = $('.filter__tag');
        filterTags.click(function () {
            var that = $(this);
            if ($(that).hasClass('filter--selected')) {

                $('.filter__title').text('All Projects');
                $(that).removeClass('filter--selected');
                // console.log('remove class from active button');
                $('.project').addClass('project--hide');
                //console.log('show all projects');

                data.myProjects.forEach(function (project) {

                    // divide project description on two part
                    var prodesArray = (project.description).split(" ")
                    numberOfCutWords = 10  // change number of trimmed words
                    sliceA = prodesArray.slice(0, numberOfCutWords).join(' ')
                    sliceB = prodesArray.slice(numberOfCutWords).join(' ')
                    divideProjectDescription = '<p class="project__description"><span class="project__description-a">' + sliceA + '</span><span class="project__description-three-dots">...</span><span class="project__description-b hide--selector">' + sliceB + '<span></p>'

                    $('.main__list').append(
                        '<div class="project">' +
                        '<h3 class="project__title">' + project.name + '</h3>' +
                        divideProjectDescription +
                        '<div class="project__details">' +
                        projectDetailUrlGenerator("project__single-detail", "fa-github-alt", "project__single-detail__span", " GitHub", "link", project.html_url) +
                        projectDetailUrlGenerator("project__single-detail", "fa-link", "project__single-detail__span", " url", "link", project.demo_url) +
                        '<div class="project_tag"><i class="fa fa-trophy"></i><span class="project__single-detail__span">  Used Skills  </span>' + filterAndProjectTagsGenerator(project.tags, 'project__tag-single') + '</div></div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                        '</div>');
                })
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
                    // divide project description on two part
                    var prodesArray = (project.description).split(" ")
                    numberOfCutWords = 10  // change number of trimmed words
                    sliceA = prodesArray.slice(0, numberOfCutWords).join(' ')
                    sliceB = prodesArray.slice(numberOfCutWords).join(' ')
                    divideProjectDescription = '<p class="project__description"><span class="project__description-a">' + sliceA + '</span><span class="project__description-three-dots">...</span><span class="project__description-b hide--selector">' + sliceB + '<span></p>'

                    project.tags.forEach(function (singleTag) {

                        if (singleTag === that.attr('id')) {
                            //console.log(singleProject);
                            $('.main__list').append(
                                '<div class="project">' +
                                '<h3 class="project__title">' + project.name + '</h3>' +
                                divideProjectDescription +
                                '<div class="project__details">' +
                                projectDetailUrlGenerator("project__single-detail", "fa-github-alt", "project__single-detail__span", " GitHub", "link", project.html_url) +
                                projectDetailUrlGenerator("project__single-detail", "fa-link", "project__single-detail__span", " url", "link", project.demo_url) +
                                '<div class="project_tag"><i class="fa fa-trophy"></i><span class="project__single-detail__span">  Used Skills  </span>' +
                                filterAndProjectTagsGenerator(project.tags, 'project__tag-single') + '</div></div>' + '<div class="project__btn"><i class="fa fa-caret-down project__btn-open fa-2x" aria-hidden="true"></i></div>' +
                                '</div>');

                        }
                    })
                })
            }
        })
    });


    // alternative solution: https://stackoverflow.com/questions/1359018/in-jquery-how-to-attach-events-to-dynamic-html-elements
    $('.main__list').on('click', '.project__btn', function () {
        // console.log('click button');

        var projectDetailA = $(this).parent().find('.project__description-a');  // s tim zatim nic nedelam

        var projectDetailDots = $(this).parent().find('.project__description-three-dots');
        // if (projectDetailDots.hasClass('hide--selector')) {
        //     $(projectDetailDots).removeClass('hide--selector');
        //     }
        // else {
        //     $(projectDetailDots).addClass('hide--selector');
        //     $(projectDetailDots).append(' hello ')
        // }

        var projectDetailB = $(this).parent().find('.project__description-b');
        if (projectDetailB.hasClass('hide--selector')) {
            $(projectDetailB).removeClass('hide--selector')
            $(projectDetailDots).text(' ')
        }
        else {
            $(projectDetailB).addClass('hide--selector');
            $(projectDetailDots).text('...')
        }


        var projectDetail = $(this).parent().find('.project__details');
        $(projectDetail).toggle(450);

        var that = $(this);
        setTimeout(function () {
            if (that.hasClass('project__btn-rotate')) {
                that.removeClass('project__btn-rotate').animate({ opacity: '0.4' }, "slow").animate({ opacity: '1' }, 150);

            }
            else {
                that.addClass('project__btn-rotate').animate({ opacity: '0.4' }, "slow").animate({ opacity: '1' }, 150)
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
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    //Script generates current year at web footer
    var getCurrentYear = function () {
        var fullDate = new Date;
        var onlyYear = fullDate.getFullYear();
        document.getElementById("current-year").innerHTML = onlyYear
    }
    getCurrentYear()









    console.log("%cHi Developer,\n\nI am glad to see you watch my code.\n\nDo not hesitate to get me a feedback via %czdenek.pribyla@gmail.com%c\n\nSee you", "color: #222", "color: #2d6986; font-weight: bold", "color: #222");
    // console.log('            _ _           _                            \n' +
    //     '           (_) |         | |                           \n' +
    //     ' _ __  _ __ _| |__  _   _| | __ _   ___ ___  _ __ ___  \n' +
    //     '| \'_ \\| \'__| | \'_ \\| | | | |/ _` | / __/ _ \\| \'_ ` _ \\ \n' +
    //     '| |_) | |  | | |_) | |_| | | (_| || (_| (_) | | | | | |\n' +
    //     '| .__/|_|  |_|_.__/ \\__, |_|\\__,_(_)___\\___/|_| |_| |_|\n' +
    //     '| |                  __/ |                             \n' +
    //     '|_|                 |___/                              ')

});