import * as RandomUtil from "./random_util.ts";

export default class Line {
    static LINE_WIDTH = 1.5;
    left: number;
    top: number;
    right: number;
    bottom: number;
    color: string;

    constructor(left: number, top: number, right: number, bottom: number, color: string) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.color = color;
    }
    static random = (width: number, height: number, limit: number, color: string): Line => {
        const left = RandomUtil.random_range(limit, width - limit);
        const top = RandomUtil.random_range(limit, height - limit);
        const right = RandomUtil.random_range(limit, width - limit);
        const bottom = RandomUtil.random_range(limit, height - limit);

        return new Line(left, top, right, bottom, color);
    }
    draw = (ctx: CanvasRenderingContext2D, alpha: number) => {
        ctx.save();

        // Draw the line
        ctx.globalAlpha = alpha;
        ctx.lineWidth = Line.LINE_WIDTH;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.left, this.top);
        ctx.lineTo(this.right, this.bottom);
        ctx.stroke();

        ctx.restore();
    }
}