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
    var output = '';
    tags.forEach(tag => {
        output += `<a class="pr-tag tag-${tag.type}" style="margin: 0.2em;">${tag.value}</a>`
    });
    return output;
}

class Project {
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

    get headHTML() {
        return `
        <!-- JavaScript Generated -->
        <!-- Image and Title -->
        <div style="display: flex;">
            <div style="display: flex;">
                <img style="width: 80px; height: auto; margin-right: 0.25em;" src="${this.img}"
                    class="img-fluid" />
                <h2 style="color: white;">${this.title}</h2>
            </div>
            <!-- Tags -->
            <div style="position: absolute; margin: 45px 0px 0px 80px;">
                ${tagsAsHTML(this.tags)}
            </div>
        </div><br>
        <!-- Description -->
        <p>
            ${this.desc}
        </p>
        <table style="width: 100%;">
            <tbody>
                <tr>
                    <td style="min-width: 5em; height: 2em; padding: 0.4em;">
                        <img style="width: 2.75em; height: auto; background-color: black; padding: 0.4em;"
                            src="/static/src/icons/github_logo.png" class="img-fluid" alt="Language" /><span style="padding: 0.4em; background-color: ${GITHUB_COLOR};">
                            <a href="https://github.com/Jitzek/isala-web-app" class="href-link" target="_blank">https://github.com/Jitzek/isala-web-app</a>
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
}