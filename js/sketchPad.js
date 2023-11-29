class SketchPad{
    constructor(container,size = 400){
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
        background-color: white;
        box-shadow: 0px 0px 10px 2px black;
        `;
        container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");
        this.#addEventListener();

        this.path = [];
        this.isDrawing = false;
    }
    #addEventListener(){
        // coordinates of mouse click in the white canvas
        // down means click
        this.canvas.onmousedown=(evt)=>{
            const mouse = this.#getMouse(evt)
            // console.log(mouse);
            // draw
            this.path = [mouse];
            this.isDrawing = true;
        }
        this.canvas.onmousemove=(evt)=>{
            if(this.isDrawing){
                const mouse = this.#getMouse(evt)
                this.path.push(mouse);
                // console.log(this.path.length);  
                this.#reDraw();
            }
        }
        this.canvas.onmouseup=()=>{
            this.isDrawing = false;
        }
    }
    #reDraw(){
        this.ctx.clearRect(0,0,
            this.canvas.width,this.canvas.height);
        draw.path(this.ctx,this.path);
    }

    #getMouse=(evt)=>{
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(evt.clientX-rect.left),
            Math.round(evt.clientY-rect.top)       
        ];
    }
}

