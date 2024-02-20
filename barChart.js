class BarChart{
    constructor(obj){
        this.data = obj.data;
        this.yValue = obj.yValue;
        this.xValue = obj.xValue;
        this.chartWidth=obj.chartWidth;
        this.chartHeight=obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.axisLineColour = obj.axisLineColour;
        this.labelTextSize = obj.labelTextSize;
        this.labelPadding = obj.labelPadding;
        this.labelColour = obj.labelColour;
        this.labelRotation = obj.labelRotation;
        this.barWidth = obj.barWidth;
        this.barColour = obj.barColour;
    }

    render(){
        push ();
        translate (this.xPos,this.yPos);
        stroke(this.axisLineColour)
        line (0,0,0,-this.chartHeight);
        line (0,0,this.chartWidth,0);

        let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1)
        let lables = this.data.map(d => d[this.xValue]);
        let scale = this.chartHeight/ max(this.data.map(d => d[this.yValue]));
        console.log(scale)
      
        //This loop draws the horizontal elements, bars and lables
        push()
        translate(gap,0);
        for(let i=0; i<this.data.length; i++){
            //This draws the bars
            fill ("#cf291d")
            noStroke()
            rect (0,0,this.barWidth, -this.data[i][this.yValue] * scale);

            //This draws the lables
            fill (this.labelColour)
            noStroke()
            textSize(this.lableTextSize)
            textAlign(LEFT, CENTER)
            push()
            translate(this.barWidth/2,this.labelPadding)
            rotate (this.labelRotation)

            text(lables[i],0,0)
            pop()

            translate(gap+this.barWidth,0)
          
        
        }
        pop()

        //This draws the vertical elements
        let tickGap = this.chartHeight / 5;
        let tickValue = max(this.data.map(d=> d[this.yValue]))/5
        for(let i=0; i<=5; i++){
            noStroke()            
            line(0,-i*tickGap,-20,-i*tickGap);
            fill (this.labelColour)
            textSize(this.lableTextSize)
            textAlign(RIGHT, CENTER)
            text(tickValue*i,-20,-i*tickGap)
            noStroke()
        }

        
        
        pop ();
    }
}