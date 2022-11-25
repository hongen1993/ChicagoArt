window.onscroll = function () {
    const navbar = document.getElementById("navbar")
    window.scrollY > 5 ? navbar.classList.add("scrolled") : navbar.classList.remove("scrolled")
}

function zoomOut() {
    const nonDisplayButtonZo = document.getElementById("button-zo")
    const nonDisplayButtonIn = document.getElementById("button-zi")

    const zoomOut = document.getElementById("zoom")
    const overlay = document.getElementById('overlay')

    nonDisplayButtonZo.classList.add('display-none')
    nonDisplayButtonIn.classList.remove('display-none')

    zoomOut.classList.add('zoomImage')
    overlay.classList.add('positionOverlay')
}

function zoomIn() {
    const nonDisplayButtonZo = document.getElementById("button-zo")
    const nonDisplayButtonIn = document.getElementById("button-zi"
    )
    const zoomOut = document.getElementById("zoom")
    const overlay = document.getElementById('overlay')

    nonDisplayButtonIn.classList.add('display-none')
    nonDisplayButtonZo.classList.remove('display-none')


    zoomOut.classList.remove('zoomImage')
    overlay.classList.remove('positionOverlay')
}