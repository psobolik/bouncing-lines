import Theme from "./theme.ts";

export const draw = (ctx: CanvasRenderingContext2D, theme: Theme)=> {
    ctx.save();

    // Fill the canvas with the background color
    ctx.fillStyle = theme.background;
    ctx.rect(0.0, 0.0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();

    ctx.restore();
}
