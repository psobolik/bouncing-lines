export const draw = (ctx: CanvasRenderingContext2D, color: string)=> {
    ctx.save();

    // Fill the canvas with the background color
    ctx.fillStyle = color;
    ctx.rect(0.0, 0.0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();

    ctx.restore();
}
