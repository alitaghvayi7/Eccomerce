let offerDate = new Date("March 30, 2022 23:59:59").getTime();
let TimerID = setInterval(() => {
    let nowDate = new Date().getTime();
    let timeDistance = offerDate - nowDate;
    let days = Math.floor(timeDistance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeDistance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDistance % (1000 * 60)) / 1000);
    let demos = document.getElementsByClassName('demos');
    for (element of demos) {
        element.innerHTML = `<span id="day" class='day'>${days}</span><span id="hours">${hours}</span><span id="minute">${minutes}</span><span id="second">${seconds}</span>`;;
    }
    // document.getElementById('demo').innerHTML = 
    if (timeDistance < 0) {
        clearInterval(TimerID);
        const expireds = document.getElementsByClassName('offer-Expired');
        const blurs = document.getElementsByClassName('offer-blur');
        for (element of demos) {
            element.innerHTML = "";
            for (el of blurs) {
                el.style.filter = "blur(2px)";
            }
            for (el of expireds) {
                el.style.visibility = "visible";
                el.innerHTML = "<span class='bg-warning p-2 rounded text-dark'>به پایان رسیده</span>";
            }
        }
        // document.getElementById('offer-Expired').style.visibility = "visible";
        // document.getElementById('offer-Expired').innerHTML = "<span class='bg-warning p-2 rounded text-dark'>به پایان رسیده</span>";
        // const parent = document.getElementById('offer-blur').style.filter = "blur(2px)";
    }
}, 1000);

$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        rtl: true,
        loop: true,
        nav: true,
        items: 5,
        margin: 0,
        responsiveClass: true,
        responsive: {
            0: { items: 2, slideBy: 2 },
            577: { items: 3, slideBy: 3 },
            769: { items: 4, slideBy: 4 },
            992: { items: 5, slideBy: 5 }
        }
    });
});
$(function() {
    $('.popover-dismiss').popover()
});
$(function() {
    $('tooltip-dismiss').tooltip();
});
$('.popover-dismiss').popover({
    trigger: 'hover'
});
const urls = ["../assets/pic/productSingle/164f44759bf3275005fd03d14385501ac74c0b76_1637144053.jpg",
    "../assets/pic/productSingle/39a7b7cd56a34ea6a9f61622b91c72d26204e714_1637144060.jpg",
    "../assets/pic/productSingle/3bb8f8af5909da731e568dd66f8dc402221bf63a_1637144055.jpg",
    "../assets/pic/productSingle/52015e264b878ec7d38fe74e7f90303f94a5bf34_1637144051.jpg",
    "../assets/pic/productSingle/b9f970caa716d8a800bf063aa6e76a24475ff704_1637144058.jpg"
];
const options = {
    width: 300,
    height: 500
};
$("#productGallery").zoomy(urls);