export default class Theme {
    static DARK_MODE_BACKGROUND = "#2A1111";
    static DARK_MODE_BORDER = "#FF0000";
    static DARK_MODE_LINE = "#EE4422";

    static LIGHT_MODE_BACKGROUND = "#FFFEFE";
    static LIGHT_MODE_BORDER = "#FF0000";
    static LIGHT_MODE_LINE = "#BB0000";

    background: string;
    border: string;
    line: string;

    constructor(background: string, border: string, line: string) {
        this.background = background;
        this.border = border;
        this.line = line;
    }
    static light = () => {
        return new Theme(Theme.LIGHT_MODE_BACKGROUND, Theme.LIGHT_MODE_BORDER, Theme.LIGHT_MODE_LINE);
    }
    static dark = () => {
        return new Theme(Theme.DARK_MODE_BACKGROUND, Theme.DARK_MODE_BORDER, Theme.DARK_MODE_LINE);
    }
}