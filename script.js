const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const toggleBtn = document.getElementById("theme-toggle");

// 1. තේමාව පූරණය කිරීම
if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-mode");
    toggleBtn.innerHTML = "☀️";
} else {
    toggleBtn.innerHTML = "🌙";
}

// 2. Theme Toggle ක්‍රියාකාරීත්වය
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if(document.body.classList.contains("light-mode")){
        localStorage.setItem("theme", "light");
        toggleBtn.innerHTML = "☀️";
    } else {
        localStorage.setItem("theme", "dark");
        toggleBtn.innerHTML = "🌙";
    }
});

// 3. Hamburger Menu ක්‍රියාකාරීත්වය
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// 4. Menu Link එකක් ක්ලික් කළ විට මෙනුව වැසීම
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});
