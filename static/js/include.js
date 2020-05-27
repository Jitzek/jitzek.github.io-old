function global_include() {
    document.write(`
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- <link rel="shortcut icon" href="./static/favicon.ico"> -->
        <link rel="stylesheet" href="/static/css/bootstrap/bootstrap.min.css" />
        <script src="/static/js/jquery/jquery-3.5.1.min.js" type="text/javascript"></script>
        <script src="/static/js/bootstrap/bootstrap.min.js" type="text/javascript""></script>
    `);
}

function navbar_include(page = "") {
    /**
     * [0] = Name of HTML file, doubles as class name ([0]-tab)
     * [1] = Display name for Navbar, doubles as Active identifier
     * [2] = Redirect URL
     * [3] = Type (static, dropdown, etc.)
     * [4] = [optional] Children of dropdown
     */
    const HOME = ['home', 'Home', '/', 'static'];
    const PROJECTS = ['projects', 'Projects', null, 'dropdown', [
        ['project1', 'Project 1', '#', 'static'],
        ['project2', 'Project 2', '#', 'static'],
        ['project3', 'Project 3', '#', 'static']]];
    const LINUX = ['linux', 'Linux', '/linux', 'static'];
    const CROMA = ['croma', 'Croma <span style="font-size: 10px">(in progress)</span>', '/croma-web-site', 'static'];
    const CONTACT = ['contact', 'Contact', '/contact', 'static'];
    var const_arr = [HOME, PROJECTS, LINUX, CROMA, CONTACT];
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
                const_arr.forEach(element => {
                    //var id = page == element[1] ? "active" : "";
                    switch(element[3]) {
                        case 'static':
                        default:
                            document.write(`
                            <li class="nav-item">
                                <a class="nav-link ${element[0]}" href="${element[2]}">${element[1]}</a>
                            </li>
                            `);
                            break;
                        case 'dropdown':
                            document.write(`
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle ${element[0]}" href="#" id="navbarDropdown ${element[0]}" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    ${element[1]}
                                </a>`);
                                if (element[4]) {
                                    document.write(`
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown ${element[0]}">`
                                    );
                                    element[4].forEach(child => {
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