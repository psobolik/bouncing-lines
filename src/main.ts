import './style.css'
import * as Background from "./background.ts";
import Line from "./line.ts";
import * as RandomUtil from "./random_util.ts";
import StatefulLine from "./stateful-line.ts";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;
const lineCountDisplay = document.getElementById("lineCount") as HTMLElement;

const REPEAT_INTERVAL = 300;
const INITIAL_LINE_COUNT = 50;
const lines: Line[] = [];
let shift = 10;

const elHeight = (selector: string): number => {
    const el = document.querySelector(selector);
    return el ? el.clientHeight : 0;
}
const MARGIN = 50;
const TOP_MARGIN = elHeight('header');
const BOTTOM_MARGIN = elHeight('footer');

let lineCount = INITIAL_LINE_COUNT;
const bumpLineCount = (count: number) => {
    if (lineCount + count > 0) {
        lineCount += count;
        lineCountDisplay.innerText = `${lineCount}`;
    }
}

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            bumpLineCount(1);
            break;
        case "ArrowDown":
            bumpLineCount(-1);
            break;
    }
})
document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
            lines.length = 0;
            break;
    }
})

let btnIntervalId = 0;
const endBtnRepeat = () => {
    if (btnIntervalId > 0) {
        clearInterval(btnIntervalId);
        lines.length = btnIntervalId = 0;
    }
}
const upBtn = document.getElementById("upBtn") as HTMLButtonElement;
upBtn.addEventListener("mousedown", () => {
    endBtnRepeat()
    bumpLineCount(1);
    btnIntervalId = setInterval(() => bumpLineCount(1), REPEAT_INTERVAL);
})
upBtn.addEventListener("mouseup", endBtnRepeat)
upBtn.addEventListener("mouseleave", endBtnRepeat)

const dnBtn = document.getElementById("dnBtn") as HTMLButtonElement;
dnBtn.addEventListener("mousedown", () => {
    endBtnRepeat()
    bumpLineCount(-1)
    btnIntervalId = setInterval(() => bumpLineCount(-1), REPEAT_INTERVAL);
})
dnBtn.addEventListener("mouseup", endBtnRepeat)
dnBtn.addEventListener("mouseleave", endBtnRepeat)

const LINE_COLORS = [
    "#FF0000",
    "#FFCCCC",
    "#4444FF",
    "#44AAFF",
    "#00FF00",
    "#CCFFCC",
    "#FFFF00",
    "#FFFFCC",
    "#00FFFF",
    "#CCFFFF",
    "#FF00FF",
    "#FF77FF",
    "#555577",
    "#CCCCFF",
    "#FFFFFF",
];
let lineColorIndex = 0; // Index of the current line color
let colorCount = 0; // Count of how many times the current line color has been used

const currentLineColor = () => LINE_COLORS[lineColorIndex];
const randomizeLineIndex = () => lineColorIndex = Math.floor(RandomUtil.random_range(0, LINE_COLORS.length));
const randomizeShift = () => shift = RandomUtil.random_range(3, 10) * 2;
const maxColorCount = () => lineCount * 4;
const newStatefullLine = () => new StatefulLine(canvas.width, canvas.height, shift, currentLineColor());

let statefulLine = newStatefullLine();
const draw = () => {
    const BACKGROUND_COLOR = "#2A2626";

    if (lines.length > lineCount) {
        do lines.shift();
        while (lines.length < lineCount);

        if (++colorCount % maxColorCount() === 0) {
            colorCount = 0;
            randomizeShift();
            randomizeLineIndex();
        }
        statefulLine.line.color = currentLineColor();
        statefulLine.shift = shift;
    }
    lines.push(statefulLine.line);
    Background.draw(context, BACKGROUND_COLOR);
    for (let i = 0; i < lines.length; i++) {
        lines[i].draw(context, i / lineCount);
    }
    statefulLine.shiftLine();
}
const resize = () => {
    context.canvas.width = window.innerWidth - MARGIN;
    context.canvas.height = window.innerHeight - TOP_MARGIN - BOTTOM_MARGIN - MARGIN;
    statefulLine = newStatefullLine();
    lines.length = 0;
}

bumpLineCount(0); // Initialize UI
resize();
window.addEventListener("resize", resize);
setInterval(draw, 25);
