import Theme from "./theme.ts";

export default class Background {
    static BORDER_SIZE = 10;

    static draw(ctx: CanvasRenderingContext2D, theme: Theme) {
        ctx.save();

        ctx.beginPath();

        // Fill the background
        ctx.fillStyle = theme.background;
        ctx.rect(0.0, 0.0, ctx.canvas.width, ctx.canvas.height);
        ctx.fill();

        // Stroke the border (half the width will be off the canvas)
        ctx.strokeStyle = theme.border;
        ctx.lineWidth = Background.BORDER_SIZE;
        ctx.rect(0.0, 0.0, ctx.canvas.width, ctx.canvas.height);
        ctx.stroke();

        ctx.restore();
    }
}