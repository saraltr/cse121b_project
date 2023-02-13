function getData(url){
    return new Promise((resolve, reject) => {
        fetch("https://limitless-basin-67065.herokuapp.com/"+url)
            .then(response => {
                if (response.status !== 200) {
                    console.log(
                        "Looks like there was a problem. Status Code: " + response.status
                    );
                    return; //returns undefined!
                }

                // Examine the text in the response
                response.json().then(data => {
                    resolve(data);
                });
            })
            .catch(function(err) {
                console.log("Fetch Error :-S", err);
                reject(err)
            });
    })
}

async function getAlbum(id) {
    console.log("Looking for the album...");
    const data = await getData("http://api.deezer.com/album/"+id);
    console.log("Loaded !");
    return data;
}

async function getArtist(id) {
    console.log("Looking for the artist...");
    const data = await getData("http://api.deezer.com/artist/"+id);
    console.log("loaded !");
    return data;
}

async function getTrack(id) {
    console.log("Looking for the title...");
    const data = await getData("http://api.deezer.com/track/"+id);
    console.log("Loaded!");
    return data;
}

async function getTrackList(id) {
    console.log("Chargement en cours de la tracklist...");
    const data = await getData("http://api.deezer.com/artist/"+id+"/top?limit=50");
    console.log("Loaded !");
    return data;
}
