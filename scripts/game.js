jQuery(document).ready(async function(){

	const title = "Welcome to the Ulitmate Shrek Songs Blindtest!";
	document.querySelector("h1").innerHTML = title;
	
	// function to get the MP3 from a Track object
	function getPreview(track) {
		return track.preview;
	}

	// function to get the title of a track
	function getTitle(track) {
		return track.title;
	}

	// function to load the preview of a track
	function loadPreview(track) {
		let mp3 = getPreview(track);
		jQuery("#player").attr("src",mp3);
	}

	jQuery('button').hover(function(){
		jQuery(this).css({'border-color':'yellow', 'border-style':'solid'});
	},
	function(){
		jQuery(this).css({'border-color':'', 'border-style':''});
	})

	// function to load the title, artist name, and album title of a track, and display them in the console
	function loadAll(round){
		loadPreview(myTrack[round]);
		let myTitle = getTitle(myTrack[round]);
		let myArtist = myTrack[round].artist.name;
		let myFilm = myTrack[round].album.title;
		console.log("My title: ",myTitle);
		console.log("My artist: ",myArtist);
		console.log("My film: ",myFilm);
	}

	const affichageScore = document.querySelector("#score");
	const affichageTour = document.querySelector("#round");

	// function to update the displays for the score and round number during the next round
	function nextRound(){
		round += 1
		affichageScore.innerHTML="Score: "+score;
		affichageTour.innerHTML="Round: "+round;
		console.log("score "+score+"tour "+round);
		
	}

	// function to hide the game at the end of the rounds and display a custom result (text and image corresponding to the result)
	function endGame(){
		affichageScore.innerHTML = "Score: " + score;
		affichageTour.innerHTML = "Round: " + round;
		document.querySelector("#game").style.display="none";
		document.querySelector("#finalResult").style.display="block";
	}
	
	// functions to add the text and image corresponding
	function resultatSimple(result){
	if (result < 5) {
		return "<p>Do you live in a swamp? Because you seem to know nothing...<br><br><img src='img/resultatNormal1.jpg' alt='Shrek swamp image'></p>";
	}
	if (result >= 5 && result<= 7) {
		return "<p>You are on your way to becoming the king/queen of the blind test.<br><br><img src='img/resultatNormal2.jpg' alt='Shrek, donkey, and Fiona image'></p>";
	}
	
	if (result > 7) {
	return "<p>Wow! Your knowledge of Shrek's music is far far advanced! <br><br><img src='img/resultatNormal3.webp' alt='far far away image'></p>";
	}}

// Setting up the blind test

myTrack = [];
let myList = await getAlbum(160601) //Shrek1
myTrack[2] = myList.tracks.data[1]; //I'm a Believer
myTrack[4] = myList.tracks.data[5]; //Bad Reputation
myTrack[3] = myList.tracks.data[8]; //All Star
myTrack[5] = myList.tracks.data[6]; //My Beloved Monster
myTrack[10] = myList.tracks.data[9]; //Hallelujah

let myList2 = await getAlbum(15801622) //Shrek2
myTrack[1] = myList2.tracks.data[0]; //Accidentally in Love
myTrack[6] = myList2.tracks.data[2]; //Changes
myTrack[8] = myList2.tracks.data[4]; //Funky Town
myTrack[7] = myList2.tracks.data[6]; //I Need Some Sleep

let myList3 = await getAlbum(249396972)
myTrack[9] = myList3.tracks.data[9] // I'm On My Way
myTrack[11] = myList3.tracks.data[3] // Holding Out For A Hero

// const form = document.querySelector("#reponseForm");


// setting up variables for the score and round as well as their display
let score = 0;
let round = 1;

let displayRound = document.getElementById('round');
displayRound.innerHTML = "Round: " + round

let displayScore = document.getElementById('score');
displayScore.innerHTML = "Score: " + score

if (round <= 10) {
// hide our results window until then
document.getElementById("finalResult").style.display = "none";
}

loadAll(round);


	// answer for normal mode
	jQuery("#reponseForm").submit(function () {
		let myTitle = getTitle(myTrack[round]);
		let playerProposal = jQuery("#reponse").val();

	// the answer does not take into account uppercase letters
		if (myTitle.toLowerCase().includes(playerProposal.toLowerCase())) {
			console.log("You Won!");
			score = score + 1;
			console.log("score " + score);
		} else {
			console.log("You Lost...");
		}

		return false;
	})

	jQuery(".next").click(function () {
		if (round == 11) {
			endGame();
			document.getElementById("finalResult").innerHTML+="<h3>Your score is : "+score+"/11</h3>"+resultatSimple(score);
		} else {
			nextRound();
			loadAll(round);
		}
	});

	let date = new Date();
	let currentYear = date.getFullYear();

	document.querySelector("#currentYear").innerHTML = currentYear;
	
})