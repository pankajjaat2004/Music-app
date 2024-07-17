import { apiCall } from "./api-call.js";

document.getElementsByClassName('searchSongs')[0].addEventListener('click',searchsongs);
document.getElementsByClassName('searchSongs')[1].addEventListener('click',searchsongs);
console.log(document.getElementsByClassName('searchSongs'));

var searchSong;
var number;

function searchsongs(){
    searchSong=document.getElementById('artistName').value;
    console.log(searchSong);
    document.getElementById('PrintArtistDetail').innerHTML='';
    document.getElementById('SongsPrint').innerHTML='';
    loadSongs();
}

async function loadSongs(){
    const URL = (`https://itunes.apple.com/search?term=${searchSong}&limit=10`);
    try{
        const response = await apiCall(URL);
        const SongsJson = await response.json();

        // console.log("Json passed",SongsJson.results);

        printArtist(SongsJson.results);

        printSongs(SongsJson.results);

        }
        catch(err){
            console.log('Error in fetching songs:- ', err);
        }
}

function PlayMusic(Songurl){
    const Player= document.getElementById('AudioPlayer');
    Player.innerHTML='';

    const AudioTag = document.createElement("audio");
    AudioTag.id='songplayer';
    AudioTag.controls=true;
    AudioTag.autoplay=true;
    const SourceTag = document.createElement("source");
    SourceTag.src = Songurl;

    AudioTag.appendChild(SourceTag);

    Player.appendChild(AudioTag);

}

function PauseMusic(){

    const Player= document.getElementById('songplayer');
    Player.pause();

}
const songsInPlaylist ={InPlaylist:[]}

function addToPlayList(item){
    var flag=0;

    songsInPlaylist.InPlaylist.forEach((listSong)=>{
        if(listSong==item){
            flag+=1;
        }
    })
        
    if(flag==0){
        songsInPlaylist.InPlaylist.push(item);
    }
    else{
        alert('Song already in Library');
    }

    printPlaylist();
}

function printArtist(songs){

    const ArtistDetailDiv=document.createElement('div');
    ArtistDetailDiv.className='artistDetail';

    const ArtistDetailh1=document.createElement('h1');
    ArtistDetailh1.innerText='Artist';

    const DetailDiv=document.createElement('div');
    DetailDiv.className='detail';

    const DetailImg=document.createElement('img');
    DetailImg.src=songs[4].artworkUrl100;

    const Detailh3=document.createElement('h3');
    Detailh3.innerText=searchSong.toUpperCase();

    const DetailSpan=document.createElement('span');
    DetailSpan.innerText='Artist';

    DetailDiv.appendChild(DetailImg);
    DetailDiv.appendChild(Detailh3);
    DetailDiv.appendChild(DetailSpan);

    ArtistDetailDiv.appendChild(ArtistDetailh1);
    ArtistDetailDiv.appendChild(DetailDiv);

    document.getElementById('PrintArtistDetail').appendChild(ArtistDetailDiv);
    
}

function printSongs(songs){

    number=0;

    const SongsDiv=document.createElement('div');
    SongsDiv.className='songs';
    SongsDiv.id='SongPrints';

    const Songsh1=document.createElement('h1');
    Songsh1.innerText='Songs';

    SongsDiv.appendChild(Songsh1);

    document.getElementById('SongsPrint').appendChild(SongsDiv);

    for(let i=0;i<songs.length;i++){
        printSong(songs[i]);
    }

}

document.getElementById('clearAll').addEventListener('click',ClearLibrary);

function  ClearLibrary(){

    songsInPlaylist.InPlaylist=[];

    printPlaylist();
    
}

function printSong(song){
    number+=1;

    const SongDiv=document.createElement('div');
    SongDiv.className='Song';

    const Songh3=document.createElement('h3');
    Songh3.innerText=number+'.';

    const Songimg=document.createElement('img');
    Songimg.src=song.artworkUrl100;

    const SongSpan=document.createElement('span');
    SongSpan.innerText=song.trackName;

    const SongButton1=document.createElement('button');
    SongButton1.id='Play';
    SongButton1.addEventListener('click',()=>PlayMusic(song.previewUrl));

    const SongButton2=document.createElement('button');
    SongButton2.id='Pause';
    SongButton2.addEventListener('click',PauseMusic);

    const SongButton3=document.createElement('button');
    SongButton3.id='AddToMyLibrary';
    SongButton3.addEventListener('click',()=>addToPlayList(song));

    SongDiv.appendChild(Songh3);
    SongDiv.appendChild(Songimg);
    SongDiv.appendChild(SongSpan);
    SongDiv.appendChild(SongButton1);
    SongDiv.appendChild(SongButton2);
    SongDiv.appendChild(SongButton3);

    document.getElementById('SongPrints').appendChild(SongDiv);

}


function printPlaylist(){

    const data=songsInPlaylist.InPlaylist;

    document.getElementById('PlaylistSongs').innerHTML='';

    data.forEach((PlaylistSong)=>{

        const SongDiv=document.createElement('div');
        SongDiv.className='PlaylistSong';

        const Songimg=document.createElement('img');
        Songimg.src=PlaylistSong.artworkUrl100;

        const SongSpan=document.createElement('span');
        SongSpan.innerText=PlaylistSong.trackName;

        const SongButton1=document.createElement('button');
        SongButton1.id='Play';
        SongButton1.addEventListener('click',()=>PlayMusic(PlaylistSong.previewUrl));

        const SongButton2=document.createElement('button');
        SongButton2.id='Pause';
        SongButton2.addEventListener('click',PauseMusic);

        SongDiv.appendChild(Songimg);
        SongDiv.appendChild(SongSpan);
        SongDiv.appendChild(SongButton1);
        SongDiv.appendChild(SongButton2);

        document.getElementById('PlaylistSongs').appendChild(SongDiv);

    })

}