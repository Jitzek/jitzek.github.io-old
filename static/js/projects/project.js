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

