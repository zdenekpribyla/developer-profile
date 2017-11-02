//var _ = require('lodash');
//
// var testApp = function () {
//     alert('hi man')
// };



var resultDiv = document.getElementsByClassName('result');
var url = 'https://api.github.com/users/zdenekpribyla/repos';
fetch(url)
    .then((resp) => resp.json())
.then(function(data) {
    console.log(data);

        var onlyName = data.map(function (project) {
        return project.name;
            });
    console.log(onlyName);

    onlyName.forEach(function (singleProject) {
        var el = document.getElementById('result'),
            // Make a new div
            elChild = document.createElement("h2");

// Give the new div some content
        elChild.innerHTML = singleProject;

// Chug in into the parent element
        el.appendChild(elChild);
    });



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

});
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





