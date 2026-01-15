document.querySelectorAll(".faq-item button").forEach(b=>{
b.onclick=()=>{let d=b.nextElementSibling;d.style.display=d.style.display=="block"?"none":"block";}
})

function themeToggle(){
document.body.classList.toggle("light")
}

{
let index = 0;
const slides = document.querySelector(".slides");
const slideCount = document.querySelectorAll(".slide").length;
const dots = document.querySelectorAll(".dot");

function showSlide(i) {
  index = (i + slideCount) % slideCount;
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");
}

function nextSlide() { showSlide(index + 1); }
function prevSlide() { showSlide(index - 1); }
function goSlide(i) { showSlide(i); }

setInterval(nextSlide, 3000);
}

function sendWhatsApp(){
let n=name.value,e=email.value,no=number.value,c=course.value
let text=`Assalam-o-Alaikum, I want to enroll.%0A%0AName: ${n}%0AEmail: ${e}%0AWhatsApp: ${no}%0ACourse: ${c}`
window.open(`https://wa.me/923148068523?text=${text}`,"_blank")
}
