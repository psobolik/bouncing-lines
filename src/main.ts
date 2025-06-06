import './style.css'
import Background from "./background.ts";
import Line from "./line.ts";
import StatefulLine from "./stateful-line.ts";
import Theme from "./theme.ts";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

const REPEAT_INTERVAL = 300;
const INITIAL_LINE_COUNT = 50;
const LINE_WIDTH = 1.5;
const lines: Line[] = [];
const SHIFT = 10;

let lineCount = INITIAL_LINE_COUNT;
const bumpLineCount = (count: number) => {
    if (lineCount + count > 0)
        lineCount += count;
    const footer = document.getElementById("lineCount") as HTMLElement;
    footer.innerText = `${lineCount}`;
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
var btnIntervalId: number = 0;
const endBtnRepeat = () => {
    if (btnIntervalId > 0) {
        clearInterval(btnIntervalId);
        lines.length = btnIntervalId = 0;
    }
}
const upBtn = document.getElementById("upBtn") as HTMLButtonElement;
upBtn.addEventListener("mousedown", (_e) => {
    endBtnRepeat()
    bumpLineCount(1);
    btnIntervalId = setInterval(() => bumpLineCount(1), REPEAT_INTERVAL);
})
upBtn.addEventListener("mouseup", endBtnRepeat)
upBtn.addEventListener("mouseleave", endBtnRepeat)

const dnBtn = document.getElementById("dnBtn") as HTMLButtonElement;
dnBtn.addEventListener("mousedown", (_e) => {
    endBtnRepeat()
    bumpLineCount(-1)
    btnIntervalId = setInterval(() => bumpLineCount(-1), REPEAT_INTERVAL);
})
dnBtn.addEventListener("mouseup", endBtnRepeat)
dnBtn.addEventListener("mouseleave", endBtnRepeat)

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    theme = event.matches ? Theme.dark() : Theme.light();
});

let theme: Theme =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.dark()
    : Theme.light();

bumpLineCount(0); // Initialize UI

const statefulLine = new StatefulLine(canvas.width, canvas.height, SHIFT);
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
setInterval(draw, 25);
