let vidCount = 2
let start = document.getElementById('btnStart');
let stop = document.getElementById('btnStop');
let vidSave;
stop.style.display = 'none'


let media = {
    audio: true,
    video: true
}




navigator.mediaDevices.getUserMedia(media).then(function(mediaStreamObj) {
    let video = document.querySelector('video');
    video.srcObject = mediaStreamObj

    video.onloadedmetadata = function (ev) {
        video.play()
    };

    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    let chunks = []

    start.addEventListener('click', function(ev) {
        mediaRecorder.start();
        console.log('bat dau ghi', mediaRecorder.state);
        start.style.display = 'none'
        stop.style.display = null
    })
    
    stop.addEventListener('click', function(ev) {
        mediaRecorder.stop();
        console.log('dung ghi', mediaRecorder.state);
        stop.style.display = 'none'
        start.style.display = null

        $("#app-video").append('<video controls id="vid' + vidCount.toString() +'"></video>');
        vidSave = document.getElementById('vid' + vidCount.toString());
        vidCount += 1
    })

    mediaRecorder.ondataavailable = function (ev) {
        chunks.push(ev.data)
    }
    mediaRecorder.onstop = function (ev) {
        let blob = new Blob(chunks, {'type': 'video/mp4;'});
        chunk = []
        let videoURL = window.URL.createObjectURL(blob)
        vidSave.src = videoURL
    }
    
}).catch(function(err) {
    console.log(err.name, err.message)
})

$("#app-video ").hide()

$("#libButton").click(function() {
    $("#app-video ").slideToggle()
})