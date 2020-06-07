const ISALA_ELEMENTID = 'isala-';
const ISALA_EXPANDER = 'isala-desc-expander';
const ISALA_DESCRIPTION = 'isala-description';
const ISALA_EXPANDEDKEY = 'expanded';
const ISALA_ANIMATIONTIME = 500;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function isalaExpanderOnClick(id) {
    var element = document.getElementById(`${ISALA_ELEMENTID}${id}`);
    var expander = element.querySelector(`.${ISALA_EXPANDER}`);
    var description = element.querySelector(`.${ISALA_DESCRIPTION}`);

    if (description.classList.contains(ISALA_EXPANDEDKEY)) {
        // Remove Key
        description.classList.remove(ISALA_EXPANDEDKEY);

        // rotate expander
        expander.style.transform = 'rotate(90deg)';

        description.style.opacity = '0';
        await sleep(ISALA_ANIMATIONTIME);
        description.style.height = '0';

        return
    }

    // rotate expander
    expander.style.transform = 'rotate(0deg)';

    description.style.height = 'initial';
    description.style.opacity = '1';

    // Add Key
    description.classList.add(ISALA_EXPANDEDKEY);
}