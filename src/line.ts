import Theme from "./theme.ts";

export default class Line {
    left: number;
    top: number;
    right: number;
    bottom: number;

    constructor(left: number, top: number, right: number, bottom: number) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    draw = (ctx: CanvasRenderingContext2D, theme: Theme, lineWidth: number, alpha: number) => {
        ctx.save();

        // Draw the line
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = theme.line;
        ctx.beginPath();
        ctx.moveTo(this.left, this.top);
        ctx.lineTo(this.right, this.bottom);
        ctx.stroke();

        ctx.restore();
    }
}