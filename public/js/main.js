window.onscroll = function toggleOnScroll() {
    const navbar = document.getElementById("navbar");
    if (window.scrollTop > 10) navbar.classList.toggle("scrolled")
}