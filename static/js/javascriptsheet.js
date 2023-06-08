// topnavbar




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



 