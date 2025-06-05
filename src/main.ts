import './style.css'
import Background from "./background.ts";
import Line from "./line.ts";
import StatefulLine from "./stateful-line.ts";
import Theme from "./theme.ts";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

const LINE_COUNT = 50;
const LINE_WIDTH = 1.5;
const lines: Line[] = [];
const SHIFT = 10;

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    theme = event.matches ? Theme.dark() : Theme.light();
});

let theme: Theme =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.dark()
    : Theme.light();

const statefulLine = new StatefulLine(canvas.width, canvas.height, SHIFT);
const draw = () => {
    lines.push(statefulLine.line);
    Background.draw(context, theme);
    for (let i = 0; i < lines.length; i++) {
        lines[i].draw(context, theme, LINE_WIDTH, i / LINE_COUNT);
    }
    if (lines.length > LINE_COUNT) {
        lines.shift()
    }
    statefulLine.shiftLine();
}
setInterval(draw, 25);
