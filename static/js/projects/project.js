const CPLUSPLUS_LOGO = '/static/src/icons/programming_languages/cplusplus_logo.png';
const CSHARP_LOGO = '/static/src/icons/programming_languages/csharp_logo.png';
const HASKELL_LOGO = '/static/src/icons/programming_languages/haskell_logo.png';
const JAVA_LOGO = '/static/src/icons/programming_languages/java_logo.png';
const JAVASCRIPT_LOGO = '/static/src/icons/programming_languages/javascript_logo.png';
const PHP_LOGO = '/static/src/icons/programming_languages/php_logo.png';
const PYTHON_LOGO = '/static/src/icons/programming_languages/python_logo.png';

const GITHUB_COLOR = "#007095";
const TEAMSIZE_COLOR = "#493698";
const PHP_COLOR = '#1F4580';

function getLogoOfLanguage(lang) {
    switch (lang.toUpperCase()) {
        case "C++":
            return CPLUSPLUS_LOGO;
        case "C#":
            return CSHARP_LOGO;
        case "HASKELL":
            return HASKELL_LOGO;
        case "JAVA":
            return JAVA_LOGO;
        case "JAVASCRIPT":
            return JAVASCRIPT_LOGO;
        case "PHP":
            return PHP_LOGO;
        case "PYTHON":
            return PYTHON_LOGO;
        default:
            return '';
    }
}

function getColorOfLanguage(lang) {
    switch (lang.toUpperCase()) {
        case "C++":
            return '';
        case "C#":
            return '';
        case "HASKELL":
            return '';
        case "JAVA":
            return '';
        case "JAVASCRIPT":
            return '';
        case "PHP":
            return PHP_COLOR;
        case "PYTHON":
            return '';
        default:
            return '';
    }
}

function tagsAsHTML(tags) {
    var output = '<div>';
    tags.forEach(tag => {
        output += `<p class="pr-tag tag-${tag.type}">${tag.value}</p>&nbsp;\n`
    });
    return output + '</div>';
}

const PROJECT_ELEMENTID = 'pr-';
const PROJECT_EXPANDER = 'pr-desc-expander';
const PROJECT_DESCRIPTION = 'pr-description';
const PROJECT_EXPANDEDKEY = 'expanded';
const PROJECT_ANIMATIONTIME = 500;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function expanderOnClick(id) {
    var element = document.getElementById(`${PROJECT_ELEMENTID}${id}`);
    var expander = element.querySelector(`.${PROJECT_EXPANDER}`);
    var description = element.querySelector(`.${PROJECT_DESCRIPTION}`);

    if (description.classList.contains(PROJECT_EXPANDEDKEY)) {
        // Remove Key
        description.classList.remove(PROJECT_EXPANDEDKEY);

        // rotate expander
        expander.style.transform = 'rotate(90deg)';

        description.style.opacity = '0';
        await sleep(PROJECT_ANIMATIONTIME);
        description.style.height = '0';

        return
    }

    // rotate expander
    expander.style.transform = 'rotate(0deg)';

    description.style.height = 'initial';
    description.style.opacity = '1';

    // Add Key
    description.classList.add(PROJECT_EXPANDEDKEY);
}

let id = 0;
function initProject(title, desc, img, date, pr_lang, teamsize, tags = []) {
    var project = new Object();
    project.title = title;
    project.desc = desc;
    project.date = date;
    project.img = img;
    project.pr_lang = pr_lang;
    project.teamsize = teamsize;
    project.tags = tags;

    project.getIncludesHTML = `
    <link rel="stylesheet" href="/static/css/projects/project.css" />
    `;
    project.getDescHTML = `
        <!-- JavaScript Generated -->
        <!-- Image and Title -->
        <div id="pr-${id}">
            <div style="display: flex;">
                <div style="display: flex; max-height: 4.5em;">
                    <img style="width: 80px; height: auto; margin-right: 0.25em;" src="${project.img}"
                        class="img-fluid" />
                    <div>
                        <h2 style="color: white;">${project.title}</h2>
                        <!-- Tags -->
                        <div style="min-height: 1.5em; max-height: 1.5em; overflow: auto; line-height: 1.5em;">
                            ${tagsAsHTML(project.tags)}
                        </div>
                    </div>
                </div>
                <div class="pr-desc-expander" onclick="expanderOnClick(${id})"></div>
                <!--<div style="position: absolute; margin: 45px 0px 0px 80px;">
                    ${tagsAsHTML(project.tags)}
                </div>-->
            </div><span style="color: #aaaaaa; font-size: 0.8em;">Date of completion: <span style="color: #dddddd;">${project.date}</span></span><br>
            <!-- Description -->
            <div class="pr-description expanded">
                <div style="margin-top: 1em;">
                    <p>
                        ${project.desc}
                    </p>
                </div>
                <table style="width: 100%; font-size: 1em;">
                    <tbody>
                        <tr>
                            <td style="min-width: 5em; height: 2em; padding: 0.4em;">
                                <img style="width: 2.75em; height: auto; background-color: black; padding: 0.4em;"
                                    src="/static/src/icons/github_logo.png" class="img-fluid" alt="Language" /><span style="padding: 0.4em; background-color: ${GITHUB_COLOR};">
                                    <a href="https://github.com/Jitzek/isala-web-app" class="href-link gh-repo" target="_blank">https://github.com/Jitzek/isala-web-app</a>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td style="min-width: 5em; height: 2em; padding: 0.4em;">
                                <img style="width: 2.75em; height: auto; background-color: black; padding: 0.4em;"
                                    src="/static/src/icons/programming_lang_white.png" class="img-fluid" alt="Language" /><span style="padding: 0.4em; background-color: ${getColorOfLanguage(project.pr_lang)};">
                                    <img style="width: 1.5em; height: auto;"
                                        src="${getLogoOfLanguage(project.pr_lang)}" class="img-fluid" /><span
                                        style="color: white; margin-left: 0.5em;">${project.pr_lang}</span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td style="min-width: 5em; height: 2em; padding: 0.4em;">
                                <img style="width: 2.75em; height: auto; background-color: black; padding: 5px;"
                                    src="/static/src/icons/team_icon.png" class="img-fluid" alt="Language" /><span style="padding: 5px; background-color: ${TEAMSIZE_COLOR};">
                                    <span style="color: white;">${project.teamsize}</span>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    id++;
    return project;
}

function codeBlock(content, language = null) {
    
}

/*class Project {
    title = 'undefined';
    desc = 'undefined';
    img = 'undefined';
    pr_lang = 'undefined';
    teamsize = 0;
    tags = [];

    constructor(title, desc, img, pr_lang, teamsize, tags = []) {
        this.title = title;
        this.desc = desc;
        this.img = img;
        this.pr_lang = pr_lang;
        this.teamsize = teamsize;
        this.tags = tags;
    }

    get includesHTML() {
        return `
            <link rel="stylesheet" href="/static/css/projects/project.css" />
        `;
    }

    get headHTML() {
        return `
        <!-- JavaScript Generated -->
        <!-- Image and Title -->
        <div style="display: flex;">
            <div style="display: flex; max-height: 4.5em;">
                <img style="width: 80px; height: auto; margin-right: 0.25em;" src="${this.img}"
                    class="img-fluid" />
                <div>
                    <h2 style="color: white;">${this.title}</h2>
                    <!-- Tags -->
                    <div style="min-height: 2em; max-height: 2em; overflow: auto; line-height: 2em;">
                        ${tagsAsHTML(this.tags)}
                    </div>
                </div>
            </div>
            <!--<div style="position: absolute; margin: 45px 0px 0px 80px;">
                ${tagsAsHTML(this.tags)}
            </div>-->
        </div><br>
        <!-- Description -->
        <div style="margin-top: 1em;">
            <p>
                ${this.desc}
            </p>
        </div>
        <table style="width: 100%; font-size: 1em;">
            <tbody>
                <tr>
                    <td style="min-width: 5em; height: 2em; padding: 0.4em;">
                        <img style="width: 2.75em; height: auto; background-color: black; padding: 0.4em;"
                            src="/static/src/icons/github_logo.png" class="img-fluid" alt="Language" /><span style="padding: 0.4em; background-color: ${GITHUB_COLOR};">
                            <a href="https://github.com/Jitzek/isala-web-app" class="href-link gh-repo" target="_blank">https://github.com/Jitzek/isala-web-app</a>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td style="min-width: 5em; height: 2em; padding: 0.4em;">
                        <img style="width: 2.75em; height: auto; background-color: black; padding: 0.4em;"
                            src="/static/src/icons/programming_lang_white.png" class="img-fluid" alt="Language" /><span style="padding: 0.4em; background-color: ${getColorOfLanguage(this.pr_lang)};">
                            <img style="width: 1.5em; height: auto;"
                                src="${getLogoOfLanguage(this.pr_lang)}" class="img-fluid" /><span
                                style="color: white; margin-left: 0.5em;">${this.pr_lang}</span>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td style="min-width: 5em; height: 2em; padding: 0.4em;">
                        <img style="width: 2.75em; height: auto; background-color: black; padding: 5px;"
                            src="/static/src/icons/team_icon.png" class="img-fluid" alt="Language" /><span style="padding: 5px; background-color: ${TEAMSIZE_COLOR};">
                            <span style="color: white;">${this.teamsize}</span>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        `;
    }
}*/