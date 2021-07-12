var TextColor = /** @class */ (function () {
    function TextColor() {
        this.id = 'e';
        this.start = '[';
        this.seperator = ';';
        this.end = 'm';
        // "code": "html"
        this.codes = [
            { code: "0", style: 'color: #FFFFFF; font-family: monospace, "Quicksand", sans-serif; font-weight: 400;' },
            { code: "1", style: "font-weight: 800;" },
        ];
    }
    TextColor.prototype.getStyle = function (code) {
        for (var i = 0; i < this.codes.length; i++)
            if (this.codes[i].code == code)
                return this.codes[i].style;
        return '';
    };
    return TextColor;
}());
