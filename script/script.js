//array to set the movies list
let movies = [];

//url for the movie cover image ( OBS: THERE IS NO IMAGES ON THE DATA SET PROVIDED BY THE API)
let movie1Img = "https://m.media-amazon.com/images/I/81aA7hEEykL.jpg";
let movie2Img = "https://m.media-amazon.com/images/I/91eOgodm4nL.jpg";
let movie3Img = "https://m.media-amazon.com/images/I/51UB-i-tjdL._AC_SY1000_.jpg";
let movie4Img = "https://m.media-amazon.com/images/I/71rFhtOvY+L._SL1372_.jpg";
let movie5Img = "https://kbimages1-a.akamaihd.net/fecec623-3022-4c16-92bf-4193128f3fa4/1200/1200/False/star-wars-episode-ii-attack-of-the-clones-1.jpg";
let movie6Img = "https://m.media-amazon.com/images/I/71OAJeaOCEL.jpg";

//url for the trailers on YouTube
let movie1Video = `<a href="https://www.youtube.com/watch?v=vZ734NWnAHA" target="_blank">${"YouTube Trailer"}</a>`;
let movie2Video = `<a href="https://www.youtube.com/watch?v=JNwNXF9Y6kY" target="_blank">${"YouTube Trailer"}</a>`;
let movie3Video = `<a href="https://www.youtube.com/watch?v=7L8p7_SLzvU" target="_blank">${"YouTube Trailer"}</a>`;
let movie4Video = `<a href="https://www.youtube.com/watch?v=bD7bpG-zDJQ" target="_blank">${"YouTube Trailer"}</a>`;
let movie5Video = `<a href="https://www.youtube.com/watch?v=gYbW1F_c9eM" target="_blank">${"YouTube Trailer"}</a>`;
let movie6Video = `<a href="https://www.youtube.com/watch?v=5UnjrG_N8hU" target="_blank">${"YouTube Trailer"}</a>`;



//set the current date
let myDate = new Date();
console.log(myDate);

//set the day of the week
let myWeekDate;
myWeekDate = myDate.getDay();
console.log(myWeekDate);



//prompts the user for his/her name
let userName = prompt("Please, inform your name: ");
let userNameLetter = userName.charAt(0).toUpperCase() + userName.slice(1);

//message that displays the name of the user and a message, according to the day of the week
let myMessage;
if (myWeekDate >= 1 && myWeekDate <= 5) {
    myMessage = userNameLetter + ", in the mood to watch STAR WARS this comming weekend?";
} else{
    myMessage = userNameLetter + ", Today is a good day to watch STAR WARS!";
}
document.querySelector("#message1").textContent = myMessage;


//message informing to wait to load the content
let buttonMessage = document.createElement("h4");
let node = document.createTextNode("Click the button and wait a few seconds");
buttonMessage.appendChild(node);
let element = document.querySelector(".seconds");
element.appendChild(buttonMessage);



//set the logic and create elements and displays the values.
function output (movies) {
    //get the data and turn the obj in array
    Object.entries(movies.results).forEach(([key, value]) => {
       
        //variable valueItem: turn the second layer of obj in array / episode_Id: slice the array to get the episode.
        var valueItem = Object.entries(value);
        var episode_Id = valueItem[1];
    
        //create element to dipslay the name and episode of the movie
        var h3moviesName = document.createElement("h3");
        h3moviesName.textContent = valueItem[0].join(": ") + " - " + episode_Id.join(": ").replace(",", "-");
            
        //create element to display the release date
        let h4moviesDate = document.createElement("h4");
        h4moviesDate.textContent = valueItem[5].join(": ");

        //create element to display the cover image
        let imgElement = document.createElement("img");
        if (key == 0) {
            imgElement.setAttribute("src", movie1Img);
        } else if (key == 1) {
            imgElement.setAttribute("src", movie2Img);
        } else if (key == 2) {
            imgElement.setAttribute("src", movie3Img);
        } else if (key == 3) {
            imgElement.setAttribute("src", movie4Img);
        }else if (key == 4) {
            imgElement.setAttribute("src", movie5Img); 
        } else {
            imgElement.setAttribute("src", movie6Img);
        }
        
        //create element to display the text and link to a trailer in YouTube
        let videoElement = document.createElement("h4");
        if (key == 0) {
            videoElement.innerHTML += movie1Video;
        } else if (key == 1) {
            videoElement.innerHTML += movie2Video;
        } else if (key == 2) {
            videoElement.innerHTML += movie3Video;
        } else if (key == 3) {
            videoElement.innerHTML += movie4Video;
        } else if (key == 4) {
            videoElement.innerHTML += movie5Video;
        } else  {
            videoElement.innerHTML += movie6Video;
        }


        let moviesDiv = document.querySelector("#movies");
        let article = document.createElement("article");
    
        //append the elements to the main article tag
        article.appendChild(h3moviesName);
        article.appendChild(h4moviesDate);
        article.appendChild(imgElement);
        article.appendChild(videoElement);
        
        moviesDiv.append(article);
    });
};

// function that get the data from api
async function getMovies() {


//using fitch to receive data
    let response = await fetch("http://swapi.dev/api/films/");
    console.log("temple data", response);

    //turn the data into jason file to handle the data
    let movies = await response.json();
    console.log("movie data jason", movies.results);
        
    //call the output() and the properties in it
    output(movies);
    console.log("teste", movies.results)
       
};
// button event to load the movies informations. Calling the getMovies()
document.querySelector("#buttonLoad").addEventListener("click", getMovies);



/*Not able to make the sort functin work correctly
function sortBy() {
    let element = document.querySelector("#movies");
    let order = document.querySelector("#sortBy").value;
    element.innerHTML = "";

    let sorted = output(movies).sort((movie1, movie2) => {
        if(movie1.h3moviesName > movie2.h3moviesName) {
            return 1
        } else if (movie1.h3moviesName < movie2.h3moviesName) {
            return -1
        } else {
            return 0;    
        }

    });

    sorted.forEach(movie => {
        element.innerHTML += movie.h3moviesName;
    })
};*/

