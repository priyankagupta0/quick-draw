class SketchPad{
    constructor(container,size = 400){
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
        background-color: white;
        box-shadow: 0px 0px 0px 4px brown`;
        container.appendChild(this.canvas);

        // undo button
            
        const lineBreak = document.createElement("br");
        container.appendChild(lineBreak);

        this.undoBtn = document.createElement("button");
        this.undoBtn.innerHTML = "UNDO";
        container.appendChild(this.undoBtn);

        this.ctx = this.canvas.getContext("2d");
        this.#addEventListener();

        this.reset();
    }
    reset(){
        this.paths=[];
        this.isDrawing=false;
        this.#reDraw();
     }
    #addEventListener(){
        // coordinates of mouse click in the white canvas
        // down means click
        this.canvas.onmousedown=(evt)=>{
            const mouse = this.#getMouse(evt);
            // console.log(mouse);
            // draw
            this.paths.push([mouse]);
            this.isDrawing = true;
        }
        this.canvas.onmousemove=(evt)=>{
            if(this.isDrawing){
                const mouse = this.#getMouse(evt);
                const lastPath = this.paths[this.paths.length -1];
                lastPath.push(mouse);
                // console.log(this.path.length);  
                this.#reDraw();
            }
        }
        document.onmouseup=()=>{
            this.isDrawing = false;
        }
        this.canvas.ontouchstart=(evt)=>{
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc);
        }
        this.canvas.ontouchmove=(evt)=>{
            const loc = evt.touches[0];
            this.canvas.onmousemove(loc);
        }
        document.ontouchend=()=>{
            // this.isDrawing = false;
            document.onmouseup();
        }
        this.undoBtn.onclick=()=>{
            this.paths.pop();
            this.#reDraw();
        }
    }
    #reDraw(){
        this.ctx.clearRect(0,0, this.canvas.width,this.canvas.height);
        draw.paths(this.ctx,this.paths);
        if(this.paths.length>0){
            this.undoBtn.disabled = false;
        }else{
            this.undoBtn.disabled = true;
        }
    }

    #getMouse=(evt)=>{
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(evt.clientX-rect.left),
            Math.round(evt.clientY-rect.top)       
        ];
    }
}

