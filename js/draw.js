const draw = {};

draw.path = (ctx, path, color = "black")=>{
    ctx.strokeStyle = "black";
    ctx.linewidth = 3;
    ctx.beginPath();
    ctx.moveTo(...path[0]);
    for(let i = 1; i<path.length; i++){
        ctx.lineTo(...path[i]);
    }
        ctx.stroke();
}