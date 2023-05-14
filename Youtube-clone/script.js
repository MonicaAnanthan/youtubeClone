const videoCardWrapper = document.querySelector('.video-wrapper');

let api_key = "AIzaSyDbQbT1erB-EPbYY-Wilxh1foFMhBTEU-g";
let video_url = "https://www.googleapis.com/youtube/v3/videos?";
let channel_url = "https://www.googleapis.com/youtube/v3/channels?";
let playlist_url = "https://www.googleapis.com/youtube/v3/playlists?";
let subscriptions_url = "https://www.googleapis.com/youtube/v3/subscriptions?"/

fetch(video_url + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelData(item);
    })
})
.catch(err => console.log(err));

const getChannelData = (video_data) => {
    fetch(channel_url + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        createVideoCard(video_data);
    })
}

const getPlayList = (play_data) => {
    fetch(playlist_url + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: play_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        play_data.channelThumbnail = data.items[0].snippet.thu.default.url;
        createVideoCard(play_data)
    })
    .catch(err => console.log(err + ' noooo play'))
}

const createVideoCard = (data) => {
    videoCardWrapper.innerHTML += `
    <div class="box-wrap">
        <div class="video-box" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
            <div class="box-wrap">
                <div class="content">
                    <img src="${data.channelThumbnail}" class="channel-icon" alt="">
                    <div class="info">
                        <h4 class="title text-truncate">${data.snippet.title}</h4>
                        <p class="channel-name">${data.snippet.channelTitle}</p>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
        <div class="dropdown">
            <a class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="./assets/img/dots.png" alt="playicon" /> 
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a type="button" class="btn btn-primary dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Save to playlist
                </a>
            </ul>
        </div>
    </div>
    `;
}
{/* <div class="modal-footer"  onclick="location.href = 'https://www.youtube.com/playlist?list=${data.channelId}'" >
<button type="button" class="btn btn-primary">Create</button>
</div> */}


// search //
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})


// playlist //
function playListFunction(){
    var x = document.getElementById('playName').value;
    document.getElementsByClassName("playListName")[0].innerHTML = `<img src="./assets/img/playList.png" alt="icon" /> ` + x;
    console.log(x)
}

const playSec = document.querySelector('.playListName');
let playLink = "https://www.youtube.com/playlist?list="

playSec.addEventListener('click', () => {
    location.href = playLink + playSec.value;
})


// subscriptions //
const subscriptions = document.querySelector('.subscriptionList');
let subscriptionLink = "https://www.youtube.com/feed/subscriptions"
subscriptions.addEventListener('click', () => {
    location.href = subscriptionLink + subscriptions.value;
})
