class BarChart {
  constructor(obj) {
    this.x = obj.x;
    this.y = obj.y;
    this.w = obj.w;
    this.h = obj.h;
    this.data = obj.data;
    this.yValue = obj.yValue;
    this.yValues = obj.yValues;
    this.xValue = obj.xValue;
    this.chartWidth = obj.chartWidth;
    this.chartHeight = obj.chartHeight;
    this.xPos = obj.xPos;
    this.yPos = obj.yPos;
    this.axisLineColour = obj.axisLineColour;
    this.labelTextSize = obj.labelTextSize;
    this.labelPadding = obj.labelPadding;
    this.labelColour = obj.labelColour;
    this.labelRotation = obj.labelRotation;
    this.barWidth = obj.barWidth;
    this.barColour = obj.barColour;
    this.barColours = obj.barColours;
    this.tickColour = obj.tickColour;
    this.tickStrokeWeight = obj.tickStrokeWeight;
    this.tickStrokeLength = obj.tickStrokeLength;
    this.tickPadding = obj.tickPadding;
    this.numTicks = obj.numTicks;
    this.tickTextColour = obj.tickTextColour;
    this.tickTextSize = obj.tickTextSize;
    this.tickDecimals = obj.tickDecimals
  }

  render() {
    push();
    translate(this.xPos, this.yPos);
    stroke(this.axisLineColour);
    line(0, 0, 0, -this.chartHeight);
    line(0, 0, this.chartWidth, 0);

    let gap = (this.chartWidth - this.data.length * this.barWidth) / (this.data.length + 1);
    let maxValue = max(this.data.map((d) => d[this.yValue]));
    let lables = this.data.map((d) => d[this.xValue]);
    let scale = this.chartHeight / max(this.data.map((d) => d[this.yValue]));
    console.log(scale);

    //This loop draws the horizontal elements, bars and lables
    push();
    translate(gap, 0);
    for (let i = 0; i < this.data.length; i++) {
      //This draws the bars
      fill("#cf291d");
      noStroke();
      rect(0, 0, this.barWidth, -this.data[i][this.yValue] * scale);

      //This draws the lables
      fill(this.labelColour);
      noStroke();
      textSize(this.labelTextSize);
      textAlign(LEFT, CENTER);
      push();
      translate(this.barWidth / 2, this.labelPadding);
      rotate(this.labelRotation);

      text(lables[i], 0, 0);
      pop();

      translate(gap + this.barWidth, 0);
    }
    pop();

    //This draws the vertical elements
    let tickGap = this.chartHeight / 5;
    for (let i = 0; i <= this.numTicks; i++) {
      stroke(this.tickColour);
      strokeWeight(this.tickStrokeWeight);
      line(0, -i * tickGap, -this.tickStrokeLength, -i * tickGap);

      // Draw tick labels
      fill(this.tickTextColour);
      textSize(this.tickTextSize);
      textAlign(RIGHT, CENTER);
      let value = (maxValue / this.numTicks) * i;
      
      text( value.toFixed(this.tickDecimals), -this.tickPadding - this.tickStrokeLength, -i * tickGap
    );
    }
    
 

    pop();
  }


}

