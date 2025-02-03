document.addEventListener("DOMContentLoaded", function () {
    createStars();
    loadKrathongs();
});

// สร้างดวงดาวแบบสุ่ม
function createStars() {
    let starContainer = document.getElementById("stars");
    for (let i = 0; i < 50; i++) {
        let star = document.createElement("div");
        star.classList.add("star");
        star.style.top = Math.random() * 200 + "px";
        star.style.left = Math.random() * window.innerWidth + "px";
        star.style.animationDuration = (Math.random() * 2 + 1) + "s";
        starContainer.appendChild(star);
    }
}

// ส่งกระทงใหม่
function launchKrathong() {
    let wishText = document.getElementById("wishInput").value;
    if (wishText.trim() === "") {
        alert("กรุณากรอกคำอวยพรก่อนลอยกระทง!");
        return;
    }

    document.getElementById("popup").style.display = "block";

    let newKrathong = { text: wishText, id: Date.now() };

    let krathongs = JSON.parse(localStorage.getItem("krathongs")) || [];
    krathongs.push(newKrathong);
    localStorage.setItem("krathongs", JSON.stringify(krathongs));

    addKrathongToRiver(newKrathong);
}

// ปิดป๊อปอัพ
function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("wishInput").value = "";
}

// โหลดกระทงเก่าให้ลอยวนซ้ำ
function loadKrathongs() {
    let krathongs = JSON.parse(localStorage.getItem("krathongs")) || [];
    krathongs.forEach(addKrathongToRiver);

    setInterval(() => {
        krathongs.forEach(addKrathongToRiver);
    }, 20000); // วนซ้ำทุก 20 วินาที
}

// เพิ่มกระทงลงไปในแม่น้ำ
function addKrathongToRiver(krathong) {
    let krathongContainer = document.createElement("div");
    krathongContainer.classList.add("krathong-container");
    krathongContainer.style.top = Math.random() * 200 + "px";

    let krathongImg = document.createElement("img");
    krathongImg.src = "krathong.png";
    krathongImg.classList.add("krathong");

    let wish = document.createElement("p");
    wish.classList.add("wish-text");
    wish.textContent = krathong.text;

    krathongContainer.appendChild(wish);
    krathongContainer.appendChild(krathongImg);
    document.getElementById("river").appendChild(krathongContainer);

    animateKrathong(krathongContainer);
}

// กระทงลอยวนซ้ำไปมา
function animateKrathong(element) {
    element.style.right = "-60px";
    element.style.animation = "floatKrathong 15s linear infinite";
}
