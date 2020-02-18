var global_inludes_css = ["//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css", "https://fonts.googleapis.com/css?family=Quicksand&display=swap"];
var global_includes_js_head = ["https://use.fontawesome.com/61960a9d8f.js"];
var global_includes_js_foot = ["//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"];

function global_include() {
    $(function () {
        // Include css
        for (i = 0; i < global_inludes_css.length; i++) {
            $("<link/>", {
                rel: "stylesheet",
                type: "text/css",
                href: global_inludes_css[i]
            }).appendTo("head");
        }
        for (i = 0; i < global_includes_js_head.length; i++) {
            $("<script/>", {
                src: global_includes_js_head[i]
            }).appendTo("head");
        }
        for (i = 0; i < global_includes_js_foot.length; i++) {
            $("<script/>", {
                src: global_includes_js_foot[i]
            }).appendTo("footer");
        }
    });
}

function include() {
    $(function () {
        // Include html
        jQuery.each($('[html-include]'), function () {
            $(this).load($(this).attr("html-include") + '.html');
        });

        // Include css
        jQuery.each($('[css-include]'), function () {
            $("<link/>", {
                rel: "stylesheet",
                type: "text/css",
                href: $(this).attr("css-include") + '.css'
            }).appendTo("head");
        });
    });
};


