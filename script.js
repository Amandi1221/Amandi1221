const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const toggleBtn = document.getElementById("theme-toggle");

// Local Storage එක පරීක්ෂා කර කලින් තිබූ Theme එක Active කිරීම
if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-mode");
    toggleBtn.innerHTML = "☀️";
}

// Light / Dark Mode Toggle එක ක්‍රියාත්මක කිරීම
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

// Mobile Responsive Hamburger Menu එක වැඩ කරවීම
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Menu Link එකක් Click කළ විට Mobile Menu එක ස්වයංක්‍රීයව Close වීම
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});