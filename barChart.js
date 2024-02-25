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
    this.chartType = obj.chartType; // Add new property for chart type
  }

  render() {
    push();
    translate(this.xPos, this.yPos);
    if (this.chartType === "horizontal") {
      // Draw horizontal axis
      stroke(this.axisLineColour);
      line(0, 0, 0, -this.chartHeight); // Vertical line
      line(0, 0, this.chartWidth, 0);  // Vertical line
    } else {
      // Draw vertical axis
      stroke(this.axisLineColour);
      line(0, 0, 0, -this.chartHeight); // Vertical line
      line(0, 0, this.chartWidth, 0); // Horizontal line
    }

    

    let gap =
      (this.chartWidth - this.data.length * this.barWidth) /
      (this.data.length + 1);
    let maxValue;
    if (this.chartType === "stacked") {
      maxValue = max(
        this.data.map((d) =>
          this.yValues.reduce((sum, yValue) => sum + d[yValue], 0)
        )
      );
    } else {
      maxValue = max(this.data.map((d) => d[this.yValue]));
    }
    let labels = this.data.map((d) => d[this.xValue]);
    let scale = this.chartHeight / maxValue;

    push();
    translate(gap, 0);
    for (let i = 0; i < this.data.length; i++) {
      if (this.chartType === "stacked") {
        let y0 = 0;
        for (let yValue of this.yValues) {
          fill(this.barColours[this.yValues.indexOf(yValue)]);
          stroke(this.tickColour);
          let barHeight = this.data[i][yValue] * scale;
          rect(0, -y0, this.barWidth, -barHeight);
          y0 += barHeight;
        }
      } else if (this.chartType === "100% stacked") {
        let y0 = 0;
        for (let yValue of this.yValues) {
          fill(this.barColours[this.yValues.indexOf(yValue)]);
          stroke(this.tickColour);
          let percentage = this.data[i][yValue];
          let barHeight = (percentage * this.chartHeight) / 100; // Calculate height based on percentage
          rect(0, -y0, this.barWidth, -barHeight);
          y0 += barHeight;
        }
      } else {
        fill(this.barColour);
        noStroke();
        rect(0, 0, this.barWidth, -this.data[i][this.yValue] * scale);
      }
 

      fill(this.labelColour);
      noStroke();
      textSize(this.labelTextSize);
      textAlign(LEFT, CENTER);
      push();
      translate(this.barWidth / 2, this.labelPadding);
      rotate(this.labelRotation);
      text(labels[i], 0, 0);
      pop();

      translate(gap + this.barWidth, 0);
    }
    pop();

    let tickGap = this.chartHeight / this.numTicks;
    for (let i = 0; i <= this.numTicks; i++) {
      stroke(this.tickColour);
      strokeWeight(this.tickStrokeWeight);
      line(0, -i * tickGap, -this.tickStrokeLength, -i * tickGap);

      fill(this.tickTextColour);
      textSize(this.tickTextSize);
      textAlign(RIGHT, CENTER);
      let value = (maxValue / this.numTicks) * i;
      text(
        value.toFixed(this.tickDecimals),
        -this.tickPadding - this.tickStrokeLength,
        -i * tickGap
      );
    }
    pop();
  }
}
