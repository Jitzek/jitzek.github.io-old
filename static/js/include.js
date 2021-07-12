// Don't use for HTML files with JavaScript in them
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function global_include() {
    document.write(`
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="/static/favicon.ico">
        <link rel="stylesheet" href="/static/css/bootstrap/bootstrap.min.css" />
        <script src="/static/js/jquery/jquery-3.5.1.min.js" type="text/javascript"></script>
        <script src="/static/js/bootstrap/bootstrap.min.js" type="text/javascript""></script>
        <link rel="stylesheet" href="/static/css/global.css" />
    `);
}

function navbar_include() {
  /**
   * [0] = Name of HTML file, doubles as class name ([0]-tab)
   * [1] = Display name for Navbar, doubles as Active identifier
   * [2] = Redirect URL
   * [3] = Type (static, dropdown, etc.)
   * [4] = [optional] Children of dropdown
   *
   * TODO: objectify
   */
  const page = window.location.pathname;
  const HOME = ["home", "Home", "/index.html", "static"];
  const PROJECTS = ["projects", "Projects", "/projects/index.html", "static"];
  const LINUX = [
    "linux",
    'Linux <span style="font-size: 10px">(in progress)</span>',
    "/linux/index.html",
    "static",
  ];
  const CROMA = ["croma", "Croma", "/croma-web-site", "static"];
  const CONTACT = ["contact", "Contact", "/contact/index.html", "static"];
  var const_arr = [HOME, PROJECTS, LINUX, CROMA /*, CONTACT*/];
  document.write(`
    <link rel="stylesheet" href="/static/css/navbar.css" />
    <section>
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div style="display: flex;">
                <div class="firstname"><a id="firstname" href="/">Jitze Jan</a><a href="index.html">
                        <div id="name-br"></div>
                    </a></div>
                <div class="lastname">
                    <span><a id="surname" href="/">Kerkstra</a></span>
                </div>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">`);
                const_arr.forEach((element) => {
                    var active = page == element[1] ? "active" : "";
                    switch (element[3]) {
                        case "static":
                        default:
                            document.write(`
                            <li class="nav-item">
                                <a class="nav-link ${element[0]} ${active}" href="${element[2]}">${element[1]}</a>
                            </li>
                            `);
                            break;
                        case "dropdown":
                            document.write(`
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle ${element[0]} ${active}" href="#" id="navbarDropdown ${element[0]}" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        ${element[1]}
                                    </a>`);
                            if (element[4]) {
                                document.write(`
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown ${element[0]}">`);
                                element[4].forEach((child) => {
                                    document.write(`
                                        <a class="dropdown-item" href="${child[2]}">${child[1]}</a>
                                    `);
                                });
                                document.write(`</div>`);
                            }
                            document.write(`
                                </li>
                            `);
                            break;
                    }
                });
                document.write(`</ul>`);
                document.write(`
                <div style="margin-right: 50px;"></div>
                <section>
                    <div style="display: flex;">
                        <a href="https://github.com/Jitzek" target="_blank">
                            <div class="social-logo gh-logo"></div>    
                            <!-- <i id="social-icon" class="fa fa-github"></i> -->
                        </a>
                        <!-- <img class="social-icons" src="../../src/github-w.png" /> -->
                        <div style="margin-left: 25px;"></div>
                        <a href="https://www.linkedin.com/in/jitze-jan-kerkstra" target="_blank">
                            <div class="social-logo li-logo"></div>    
                            <!-- <i id="social-icon" class="fa fa-linkedin"></i> -->
                        </a>
                        <!-- <img class="social-img" src="../../src/linkedin-w.png" /> -->
                        <div style="margin-left: 25px;"></div>
                        <img class="social-img" src="/static/src/pfp-round.png" />
                    </div>
                </section>
            </div>
        </nav>
    </section>
    `);
}
