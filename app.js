//var _ = require('lodash');
//
// var testApp = function () {
//     alert('hi man')
// };



var resultDiv = document.getElementById('result');
var url = 'https://api.github.com/users/zdenekpribyla/repos';
fetch(url)
    .then((resp) => resp.json())
.then(function(data) {
    data.forEach(function (project) {

        resultDiv.append('<h1>' + project.name + '</h1>');
        resultDiv.append('<p>' + project.description + '</p>');
        resultDiv.append('<hr>')
    })

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





