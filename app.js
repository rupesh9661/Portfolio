(function () {
    // Navigation controls (sidebar + hero CTA)
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            const targetId = button.dataset.id;
            if (!targetId) return;

            // Update active nav button (only nav-links buttons get active-btn)
            const activeNavBtn = document.querySelector(".nav-links .active-btn");
            if (activeNavBtn) activeNavBtn.classList.remove("active-btn");
            const newNavBtn = document.querySelector(`.nav-links [data-id="${targetId}"]`);
            if (newNavBtn) newNavBtn.classList.add("active-btn");

            // Switch active page
            const activePage = document.querySelector(".page.active");
            if (activePage) activePage.classList.remove("active");
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add("active");
                targetPage.scrollTop = 0;
            }
        });
    });

    // Theme toggle
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
})();

