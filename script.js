let pics = document.querySelectorAll(".pic");
let currentIndex = 0;
let currentList = [];

let lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightboxImg");
let caption = document.getElementById("caption");

function filterImages(cat) {
  pics.forEach(p => p.classList.toggle("hide", cat !== "all" && !p.classList.contains(cat)));
  document.querySelectorAll(".filter-btns button").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
}

pics.forEach(pic => {
  pic.addEventListener("click", () => {
    currentList = [...pics].filter(p => !p.classList.contains("hide"));
    currentIndex = currentList.indexOf(pic);
    showImage();
    lightbox.classList.add("show");
  });
});

function showImage() {
  let pic = currentList[currentIndex];
  lightboxImg.src = pic.querySelector("img").src;
  caption.innerText = pic.querySelector("p").innerText;
}

document.getElementById("closeBtn").onclick = () => lightbox.classList.remove("show");
document.getElementById("nextBtn").onclick = () => { currentIndex = (currentIndex + 1) % currentList.length; showImage(); };
document.getElementById("prevBtn").onclick = () => { currentIndex = (currentIndex - 1 + currentList.length) % currentList.length; showImage(); };

lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.classList.remove("show"); };

document.onkeydown = (e) => {
  if (!lightbox.classList.contains("show")) return;
  if (e.key === "Escape") lightbox.classList.remove("show");
  if (e.key === "ArrowRight") document.getElementById("nextBtn").click();
  if (e.key === "ArrowLeft") document.getElementById("prevBtn").click();
};