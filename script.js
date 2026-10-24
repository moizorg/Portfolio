        (() => {
            "use strict";
            const menuButton = document.querySelector(".menu-btn");
            const navLinks = document.querySelector("#nav-links");
            const menuLabel = menuButton?.querySelector(".menu-label");
            const themeButton = document.querySelector(".theme-toggle");
            const themeLabel = themeButton?.querySelector(".theme-label");
            const themeIcon = themeButton?.querySelector("svg");
            const savedTheme = (() => {
                try { return localStorage.getItem("portfolio-theme"); } catch { return null; }
            })();
            const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

            function setTheme(theme, save = false) {
                const isDark = theme === "dark";
                document.documentElement.dataset.theme = theme;
                if (themeLabel) themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
                themeButton?.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
                themeButton?.setAttribute("aria-pressed", String(isDark));
                if (themeIcon) themeIcon.innerHTML = isDark
                    ? '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>'
                    : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>';
                if (save) {
                    try { localStorage.setItem("portfolio-theme", theme); } catch { /* Storage may be unavailable. */ }
                }
            }

            setTheme(savedTheme === "dark" || savedTheme === "light" ? savedTheme : (prefersDark ? "dark" : "light"));
            themeButton?.addEventListener("click", () => {
                setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
            });

            function setMenuOpen(open) {
                if (!menuButton || !navLinks) return;
                navLinks.classList.toggle("open", open);
                menuButton.setAttribute("aria-expanded", String(open));
                if (menuLabel) menuLabel.textContent = open ? "Close" : "Menu";
            }

            menuButton?.addEventListener("click", () => {
                setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
            });
            navLinks?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenuOpen(false)));
            document.addEventListener("keydown", event => {
                if (event.key === "Escape") setMenuOpen(false);
            });
            document.addEventListener("click", event => {
                if (navLinks?.classList.contains("open") &&
                    !navLinks.contains(event.target) && !menuButton?.contains(event.target)) setMenuOpen(false);
            });

            const copyButton = document.querySelector("#copy-email");
            const copyStatus = document.querySelector("#copy-status");
            const email = "moizabdullah79@gmail.com";
            copyButton?.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText(email);
                    if (copyStatus) copyStatus.textContent = "Email copied to clipboard.";
                } catch {
                    if (copyStatus) copyStatus.textContent = "Copy unavailable here. Please use the email link above.";
                }
            });
        })();
