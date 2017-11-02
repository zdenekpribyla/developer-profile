//var _ = require('lodash');
//
// var testApp = function () {
//     alert('hi man')
// };




var url = 'https://api.github.com/users/zdenekpribyla/repos';
fetch(url)
    .then((resp) => resp.json())
.then(function(data) {
    console.log(data);

        var onlyName = data.map(function (projects) {
        return projects; });

        onlyName.forEach(function (project) {
        //http://clubmate.fi/append-and-prepend-elements-with-pure-javascript/
            var parent = document.getElementById('result');
        // Make a new div
            var divChild = document.createElement("div");
            divChild.className = "projects";
// Give the new div some content
            divChild.innerHTML = ('<h2 class="projects__title">' + project.name + '</h2>' + '<p class="projects__description">' + project.description + '</p>');


// Chug in into the parent element
            parent.appendChild(divChild);
        });

        });
    //console.log(onlyName);

//     onlyName.forEach(function (singleProject) {
//         //http://clubmate.fi/append-and-prepend-elements-with-pure-javascript/
//         var parent = document.getElementById('result');
//             // Make a new div
//          var divChild = document.createElement("div");
//
// // Give the new div some content
//         divChild.innerHTML = singleProject;
//
// // Chug in into the parent element
//         parent.appendChild(divChild);
//     });

    // var divProject = document.createElement("div");
    // divProject.style.cssText = "background-color:pink; border:2px dashed green; color:white;"



    // resultDiv.innerHTML = ('<h1>' + onlyName + '</h1>');
    // console.log(resultDiv.innerHTML = '<h1>' + onlyName + '</h1>');

    // var projectN = data.map(function (name) {
    //     return name.projectName
    //
    // });
    // console.log(projectN);
    // data.forEach(function (project) {
    //     var projectName = project.name;
    //     resultDiv.innerHTML = ('<h1>' + projectName + '</h1>');
    //     // resultDiv.innerHTML('<p>' + project.description + '</p>');
    //     // resultDiv.innerHTML('<hr>')
    //     resultDiv.append('<h1>' + project.name + '</h1>');
    //     resultDiv.append('<p>' + project.description + '</p>');
    //     resultDiv.append('<hr>')
    // })


    // .catch(function(error) {
    //     console.log(JSON.stringify(error));
    // });



// $(document).ready(function () {
//     console.log('ready!');
//
//     var resultDiv = $('.result');
//
//     $.get('https://api.github.com/users/zdenekpribyla/repos', function (data) {
//         // console.log(data)
//
//         data.forEach(function (project) {
//             // console.log(project)
//
//             resultDiv.append('<h1>' + project.name + '</h1>');
//             resultDiv.append('<p>' + project.description + '</p>');
//             resultDiv.append('<hr>')
//         })
//     })
// });





