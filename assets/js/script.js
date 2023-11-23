function hideCookieBanner(){

    document.getElementById("cookie").style.display = 'none';

}

function handleCookieBannerDisplay(){

    if (localStorage.getItem("cookie_ack")) hideCookieBanner();

}

function cookieAck(){

    hideCookieBanner();
    localStorage.setItem("cookie_ack", true);

}