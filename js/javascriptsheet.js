// topnavbar

document.getElementById("topnavbar").innerHTML=
`
<nav>
    <div class="menu">
        <ul class="links">
            <div class="logo">
                <img src="./img/logorm.jpg" alt="GSGP_Logo">
            </div>
            <li><a href="./index.html"> Inicio </a></li>
            <div class="dropdown">
                <li><a href="#Juegos"> Juegos </a></li>
                <div class="dropdowncontent">
                    <li><a href="./HOI4.html"> Hearts of Iron 4 </a></li>
                    <li><a href="./EU4.html"> Europa Universalis 4 </a></li>
                </div>
            </div>
            <div class="dropdown">
                <li><a href="#Tutorial"> Tutorial </a></li>
                <div class="dropdowncontent">
                    <li><a href="#Informacion"> Informacion </a></li>
                    <li><a href="#Politica"> Politica </a></li>
                    <li><a href="#Economia"> Economia </a></li>
                    <li><a href="#Militar"> Militar </a></li>
                </div>
            </div>
            <li><a href="./Login.html"> Login </a></li>
        </ul>
    </div>
</nav>
`


// video
const videos = document.getElementsByTagName("video"); //Obtiene todos los videos como un array

function startPreview(video) {
  video.muted = true;
  video.currentTime = 1; //desde que frame inicia
  video.playbackRate = 1; //velocidad del frame
  video.loop = true;
  video.play();
}

function stopPreview(video) {
  video.currentTime = 0;
  video.playbackRate = 1;
  video.pause();
}


for (let i = 0; i < videos.length; i++) {
  let video = videos[i];
  video.addEventListener("mouseenter", () => {
    startPreview(video);
  });

  video.addEventListener("mouseleave", () => {
    stopPreview(video);
    video.src = video.src; //resetea el video a la imagen
  });
}



 