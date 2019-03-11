//拖动导航

function myNavMove (nav, event) {

    nav.style.zIndex = "100";

    let originalX = parseInt(window.getComputedStyle(nav, null).getPropertyValue("left"));
    let originalY = parseInt(window.getComputedStyle(nav, null).getPropertyValue("top"));

    let disX = event.clientX - originalX;
    let disY = event.clientY - originalY;

    document.onmousemove = (event) => {
        let left = event.clientX - disX;
        let top = event.clientY - disY;

        nav.style.left = left + "px";
        nav.style.top = top + "px";
    }

    document.onmouseup = () => {
        document.onmousemove = null;

        let navGoBack = setInterval(() => {

            speedX = (originalX - nav.offsetLeft)/4;
            speedY = (originalY - nav.offsetTop)/4;

            nav.style.left = nav.offsetLeft + speedX + "px";
            nav.style.top = nav.offsetTop + speedY + "px";

            if(Math.abs(speedX) < 0.6 && Math.abs(speedY) < 0.6) {
                clearInterval(navGoBack);
                nav.style.left = originalX + "px";
                nav.style.top = originalY + "px";
                nav.style.zIndex = "1";
            }
        }, 30)
    }
}