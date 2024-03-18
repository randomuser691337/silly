// Border was ported from https://windows96.net, therefor there is some leftover code. 
// I don't know much about this code or how Windows 96 works.
class Border {

    #Files = {}

    constructor() {
        const sync = async () => {
            this.#Files.config = {
                theme: {
                    currentTheme: "dark",
                    primary: "rgba(200, 30, 30)",
                    secondary: "#ffe5fb",
                },
                browser: {
                    defaultPage: "webdesk://newtab",
                    enableShortcuts: true,
                },
            };
            this.#Files.bookmarks = [];
            this.#Files.whitelist = [];

            await this.#main();

        }
        sync();
    }

    // Variable declaration
    #tabNb = 0;
    #tabId = [];
    #browserBody;
    version = "1.0";
    protocols = {
        newtab: `
        <!DOCTYPE html>
        <html>
        
        <head>
            <title>WebDesk</title>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
            <link rel="stylesheet" href="https://betawebdesk.vercel.app/assets/core.css">
            <style>
                body {
                    padding: 12px;
                }
            </style>
        </head>
        
        <body>
           <p class="h2">WebDesk Browser - v1.0 beta</p>
           <p>Welcome! If you encounter pages that don't load/error out, <a href="https://chromewebstore.google.com/detail/ignore-x-frame-options/ammjifkhlacaphegobaekhnapdjmeclo" target="_blank">install this extension.</a></p>
           <p>Some things might not work - this browser is in beta.</p>
           <p>This browser is a fork of <a href="https://github.com/Onofficiel/border/" target="_blank">Border</a>.</p>
        </body>
        
        </html>`,
        offline: `<p>WebDesk is offline.</p><p>Check your router/WiFi connnection.</p>`,
        kitty: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Woooooooozy</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet">
</head>
<body style="width: 100vw; height: 100vh;">
    <div id="centered">
        <img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;"><img src="https://betawebdesk.vercel.app/assets/img/kibby.jpg" style="width: 25vw; height: auto; margin: 0px; padding: 0px;">
    </div>
</body>
</html>`};

    #handleURI(url) {
        if (!window.navigator.onLine && !RegExp("webdesk:/*").test(url)) return ["data:text/html," + encodeURI(this.protocols.offline), "Not Connected"];
        if (url.startsWith("//")) return ["https://" + url.substring(2), false];

        if (/^\S*:/i.test(url)) {
            for (let i = 0; i < Object.keys(this.protocols).length; i++) {
                const protocol = Object.keys(this.protocols)[i];

                if (RegExp("^webdesk:/*" + protocol + "$").test(url)) {
                    return [
                        encodeURI("data:text/html," + this.protocols[protocol]),
                        protocol,
                    ];
                }
            }
            return [url, false];
        } else {
            if (/^([-a-zA-Z0-9^\p{L}\p{C}\u00a1-\uffff@:%_\+.~#?&//=]{2,256}){1}(\.[a-z]{2,4}){1}(\:[0-9]*)?(\/[-a-zA-Z0-9\u00a1-\uffff\(\)@:%,_\+.~#?&//=]*)?([-a-zA-Z0-9\(\)@:%,_\+.~#?&//=]*)?$/i.test(url)) {
                return ["https://" + url, false];
            }
            else {
                return [encodeURI("https://google.com/search?igu=1&q=" + url.replace(" ", "+")), false];
            }
        }
    }

    // BORDER API
    addTab(tab) {
        if (!tab)
            throw new Error("You have to add an object for creating a tab.");
        if (!tab.url) tab.url = this.#Files.config.browser.defaultPage;

        // Create an html tab div
        let tabElement = document.createElement("div");
        tabElement.draggable = true;
        tabElement.classList.add("border-tab");
        tabElement.classList.add("nodrag");
        tabElement.dataset.id = this.generateId();
        tabElement.dataset.url = tab.url;
        tabElement.innerHTML =
            `
<div class='border-title'>Name Undefined</div>
<div class='border-close-btn'>
<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20"
                                fill="none">
                                <path
                                    d="M10 6.2963L3.7037 0L0 3.7037L6.2963 10L0 16.2963L3.7037 20L10 13.7037L16.2963 20L20 16.2963L13.7037 10L20 3.7037L16.2963 0L10 6.2963Z"
                                    fill="rgba(var(--accent), 0.95)" />
                            </svg>
</div>
`;

        tabElement.addEventListener("click", () => {
            this.setCurrent(tabElement.dataset.id);
        });

        tabElement.addEventListener("contextmenu", (e) => {
            const tabIndex = Array.prototype.indexOf.call(
                tabElement.parentNode.children,
                tabElement
            );
        });

        tabElement
            .querySelector(".border-close-btn")
            .addEventListener("click", () => {
                this.removeTab(tabElement.dataset.id);
            });

        this.#browserBody.querySelector("#border-tab-container").appendChild(tabElement);
        // <

        // Create an html view tab
        let viewElement = document.createElement("iframe");
        viewElement.classList.add("border-view");
        viewElement.dataset.id = tabElement.dataset.id;

        this.#browserBody.querySelector("#border-view-container").appendChild(viewElement);
        // <

        // After Created Action
        if (tab.current) this.setCurrent(tabElement.dataset.id);
        this.reloadTab();
        // <

        this.#tabNb++;
        this.#tabId.push(tabElement.dataset.id);
    }

    setCurrent(id) {
        try {
            for (let tab of this.#browserBody
                .querySelector("#border-tab-container")
                .querySelectorAll(".border-tab")) {
                tab.classList.remove("border-current");
            }
            this.#browserBody
                .querySelector('.border-tab[data-id~="' + id + '"]')
                .classList.add("border-current");

            for (let view of this.#browserBody
                .querySelector("#border-view-container")
                .querySelectorAll(".border-view")) {
                view.classList.remove("border-current");
            }
            this.#browserBody
                .querySelector('.border-view[data-id~="' + id + '"]')
                .classList.add("border-current");

            this.#browserBody.querySelector("#border-searchbar").value = this.#browserBody.querySelector(
                ".border-tab.border-current"
            ).dataset.url;
        } catch { }
    }

    removeTab(id) {
        if (!id) throw new Error("Specify a correct ID");

        this.#tabNb--;
        this.#tabId.splice(this.#tabId.indexOf(id), 1);

        this.#browserBody
            .querySelector("#border-tab-container")
            .removeChild(
                this.#browserBody.querySelector('.border-tab[data-id~="' + id + '"]')
            );
        this.#browserBody
            .querySelector("#border-view-container")
            .removeChild(
                this.#browserBody.querySelector('.border-view[data-id~="' + id + '"]')
            );
    }

    reloadTab() {
        if (
            !this.#handleURI(
                this.#browserBody.querySelector(".border-tab.border-current").dataset.url
            )[1]
        ) {
            this.#browserBody.querySelector("#border-searchbar").value =
                this.#handleURI(
                    this.#browserBody.querySelector(".border-tab.border-current").dataset.url
                )[0];
        } else {
            this.#browserBody.querySelector("#border-searchbar").value = this.#browserBody.querySelector(
                ".border-tab.border-current"
            ).dataset.url;
        }

        this.#browserBody
            .querySelector("#border-view-container")
            .querySelector(".border-view.border-current").src =
            this.#handleURI(
                this.#browserBody
                    .querySelector("#border-tab-container")
                    .querySelector(".border-tab.border-current").dataset.url
            )[0];

        this.#browserBody.querySelector("#border-searchbar").blur();

        if (
            this.#handleURI(
                this.#browserBody.querySelector(".border-tab.border-current").dataset.url
            )[1]
        ) {
            this.#browserBody
                .querySelector(".border-tab.border-current")
                .querySelector(".border-title").innerText =
                this.#handleURI(
                    this.#browserBody.querySelector(".border-tab.border-current").dataset.url
                )[1];
        } else
            this.#browserBody
                .querySelector(".border-tab.border-current")
                .querySelector(".border-title").innerText = this.#handleURI(
                    this.#browserBody.querySelector(".border-tab.border-current").dataset.url
                )[0]
                    .split("/")[2];
    }

    closeWindow() {
        return window.location.href = window.location.href;
    }

    openWindow() {
        return;
    }

    generateId() {
        const hi = gen(7);
        return hi;
    }

    async #main() {
        // Create "webdesk://urls" protocol
        this.protocols.urls = `
        <p>whar</p>
        `;

        this.#browserBody = window.document.body;

        // boot
        document
            .querySelector(":root")
            .style.setProperty("--border-primary", this.#Files.config.theme.primary);
        document
            .querySelector(":root")
            .style.setProperty(
                "--border-secondary",
                this.#Files.config.theme.secondary
            );

        let h = this.#browserBody.querySelectorAll(".border-history-btn");

        h[0].addEventListener("click", () => {
            window.history.back();
            this.reloadTab();
        });
        h[1].addEventListener("click", () => {
            window.history.forward();
            this.reloadTab();
        });
        h[2].addEventListener(
            "click",
            () =>
            (this.#browserBody.querySelector(".border-view.border-current").src =
                this.#browserBody.querySelector(".border-view.border-current").src)
        );

        this.#browserBody
            .querySelector("#border-add-button")
            .addEventListener("click", () => this.addTab({ current: true }));
        this.#browserBody
            .querySelector("#border-search-button")
            .addEventListener("click", () => {
                this.#browserBody.querySelector(".border-tab.border-current").dataset.url =
                    this.#browserBody.querySelector("#border-searchbar").value;
                this.reloadTab();
            });

        this.addTab({ current: true });

        this.#browserBody
            .querySelector("#border-searchbar")
            .addEventListener("keyup", (event) => {
                if (event.key === "Enter") {
                    this.#browserBody.querySelector(".border-tab.border-current").dataset.url =
                        this.#browserBody.querySelector("#border-searchbar").value;
                    this.reloadTab();
                }
            });

        setInterval(() => {
            if (
                this.#browserBody
                    .querySelector("#border-tab-container")
                    .querySelectorAll(".border-tab").length <= 0
            )

                if (!this.#browserBody.querySelector(".border-tab.border-current")) {
                    this.setCurrent(this.#tabId[0]);
                }
        }, 10);

        if (this.#Files.config.browser.enableShortcuts) {
            for (const keybind in this.keybinds) {
                if (Object.hasOwnProperty.call(this.keybinds, keybind)) {
                    const cKeybind = this.keybinds[keybind];

                    cKeybind.keys.reverse();

                    let status = [];

                    for (const key in cKeybind.keys) {
                        if (Object.hasOwnProperty.call(cKeybind.keys, key)) {
                            const cKey = cKeybind.keys[key];

                            status.push(false);

                            window.addEventListener("keydown", (e) => {
                                if (e.key.toLowerCase() === cKey.toLowerCase()) {
                                    status[key] = true;
                                } else status[key] = false;

                                let i = 0;
                                for (let stat in status) {
                                    if (status[stat]) i++;

                                    if (i >= status.length) {
                                        e.preventDefault();
                                        cKeybind.exec();
                                    }
                                }
                            });
                        }
                    }
                }
            }
        }
    }
}

let browser = new Border();