'use strict'

//const apiKey = ''




//curl -u "emsmami" https://api.github.com`

function removeSpace(queryString){
    let newQuery= queryString.replace(/\s/g, '');
    console.log(newQuery);
    return newQuery;
}



function getRepos(queryString){
    const thisQuery = removeSpace(queryString);
    
    fetch(`https://api.github.com/users/${thisQuery}/repos`)
  
    .then(response => {
        if(response.ok){
           return response.json();
        } throw new Error(response.statusText);
    })
    .then(responseJson => {
        if(responseJson.length == 0){
            throw new Error('has no public repos');
        } 
        displayRepos(responseJson)
    })
    /*.then(responseJson => displayRepos(responseJson))*/
    .catch(error => {$('#js-error-message').text(`Something strange is afoot at the circle K user ${error.message}.`)
    });
}


function displayRepos(responseJson){
    $('.results-items').empty();
    
    $('.results').removeClass('hidden');
    for(let i = 0; i < responseJson.length; i++){
        $('.results-items').append(

            `<li><p><a href='${responseJson[i].html_url}' target="_blank">${responseJson[i].name}</a></p></li>`
          
            )}
        
}


function chooserListener (){
    $('form').submit(event => {
    event.preventDefault();
    $('.error-message').empty();
    $('.results-items').empty();
    let queryString = $('#userInput').val();
    console.log(queryString);
    getRepos(queryString);
    });
}

chooserListener();