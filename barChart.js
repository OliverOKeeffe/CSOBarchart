class BarChart {
	constructor(data, chartWidth, chartHeight, x, y, barWidth) {
		this.data = data;
		this.x = x;
		this.y = y;
		this.chartWidth = chartWidth;
		this.chartHeight = chartHeight;
		this.barWidth = barWidth;
		this.numBars = data.length;
	}

	render() {
		translate(this.x, this.y);
		noFill();
		stroke(axisColour);
		strokeWeight(axisThickness);
		line(0, 0, this.chartWidth, 0);
		line(0, 0, 0, -this.chartHeight);

		noStroke();
		fill(barColour);
		//prettier-ignore
		let barGap = (this.chartWidth - (this.numBars * this.barWidth)) / (this.numBars + 1);
		// console.log(barGap);
		for (let i = 0; i < this.numBars; i++) {
			//prettier-ignore
			let jump = (barGap * (i+1)) + (this.barWidth * i);
			let colHeight = this.data[i].Total * 10;
			rect(jump, 0, this.barWidth, -colHeight);
		}
	}
}
