import './style.css'
import * as Background from "./background.ts";
import Line from "./line.ts";
import StatefulLine from "./stateful-line.ts";
import Theme from "./theme.ts";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;
const footer = document.getElementById("lineCount") as HTMLElement;

const REPEAT_INTERVAL = 300;
const INITIAL_LINE_COUNT = 50;
const LINE_WIDTH = 1.5;
const lines: Line[] = [];
const SHIFT = 10;

const MARGIN = 50;
const HEADER = document.querySelector<HTMLElement>('header');
const TOP_MARGIN = HEADER ? HEADER.clientHeight : 0;
const FOOTER = document.querySelector<HTMLElement>('footer');
const BOTTOM_MARGIN = FOOTER ? FOOTER.clientHeight : 0;

let lineCount = INITIAL_LINE_COUNT;
const bumpLineCount = (count: number) => {
    if (lineCount + count > 0) {
        lineCount += count;
        footer.innerText = `${lineCount}`;
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

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    theme = event.matches ? Theme.dark() : Theme.light();
});

let statefulLine = new StatefulLine(canvas.width, canvas.height, SHIFT);
const draw = () => {
    lines.push(statefulLine.line);
    Background.draw(context, theme);
    for (let i = 0; i < lines.length; i++) {
        lines[i].draw(context, theme, LINE_WIDTH, i / lineCount);
    }
    if (lines.length > lineCount) {
        do lines.shift();
        while (lines.length < lineCount);
    }
    statefulLine.shiftLine();
}
const resize = () => {
    const canvasWidth = window.innerWidth - MARGIN;
    const canvasHeight = window.innerHeight - TOP_MARGIN - BOTTOM_MARGIN - MARGIN;
    context.canvas.width = canvasWidth;
    context.canvas.height = canvasHeight;
    statefulLine = new StatefulLine(canvasWidth, canvasHeight, SHIFT);
    lines.length = 0;
}

let theme: Theme =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.dark()
    : Theme.light();
bumpLineCount(0); // Initialize UI
resize();
window.addEventListener("resize", resize);
setInterval(draw, 25);
