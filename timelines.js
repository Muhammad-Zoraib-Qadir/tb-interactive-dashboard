// Set dimensions with increased bottom margin
const margin = { top: 20, right: 20, bottom: 80, left: 50 }; // Increased bottom margin for x-axis
const width = 1000 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

// Append SVG
const svg = d3.select("#timeline-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Tooltip
const tooltip = d3.select("#tooltip");

// Load data
d3.csv("cleaned_data.csv").then(data => {
    // Parse year and the selected metric (e.g., new_ep)
    data.forEach(d => {
        d.year = +d.year; // Ensure 'year' is numeric
        d.new_ep = +d.new_ep; // Use 'new_ep' as the metric for the bars
    });

    // Get the range of years
    const years = d3.extent(data, d => d.year);

    // Check the maximum value of new_ep to adjust the scale
    const maxTotalEp = d3.max(data, d => d.new_ep);
    console.log("Max Total Episodes: ", maxTotalEp); // Debugging step to see the max value of new_ep

    // Create scales for the x and y axes
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.year)) // Set domain based on years
        .range([0, width])
        .padding(0.1);  // Space between bars

    const yScale = d3.scaleLinear()
        .domain([0, maxTotalEp]) // Use the max new_ep value for the domain
        .range([height, 0]) // Invert the scale to have 0 at the bottom
        .nice(); // Adds nice rounding to the scale's domain

    // Add x-axis
    const xAxis = d3.axisBottom(xScale)
        .ticks(5) // Adjust number of ticks, showing 10 ticks
        .tickFormat(d3.format("d"));  // Format to show year as integer

    // Append the x-axis and rotate labels for better readability
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle")  // Centers the text
        .style("font-size", "18px")      // Adjust font size for better readability
        .attr("dx", "-2em")           // Slightly moves the labels
        .attr("dy", "-0em")              // Adjust vertical alignment
        .attr("transform", "rotate(-90)"); // Rotate the x-axis labels by 45 degrees to prevent overlap

    // Add y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .call(yAxis);

    // Create a group for bars
    const barGroup = svg.append("g").attr("class", "bars");

    // Function to create and animate the bars for a specific year
    function updateBars(currentYear) {
        // Filter the data for the current year (No filtering of data at this step)
        const currentData = data.filter(d => d.year === currentYear);

        // Add new bars for the current year
        const bars = barGroup.selectAll(".bar")
            .data(currentData)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.year))
            .attr("y", height)  // Start the bars at the bottom (height of the SVG)
            .attr("width", xScale.bandwidth())
            .attr("height", 0)   // Start with zero height
            .attr("fill", "steelblue")
            .attr("opacity", 0.7)
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", 1)
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 20}px`)
                    .html(`<strong>Year:</strong> ${d.year}<br><strong>Total Episodes:</strong> ${d.new_ep}`);
            })
            .on("mouseout", () => tooltip.style("opacity", 0));

        // Animate the height of the bars from zero to the actual height
        bars.transition()
            .duration(1000) // Duration of the animation
            .attr("y", d => yScale(d.new_ep)) // The height of each bar
            .attr("height", d => height - yScale(d.new_ep)); // Adjust the height of the bar
    }

    // Animation controls
    const playPauseButton = d3.select("#play-pause");
    const yearSlider = d3.select("#year-slider");
    const currentYearText = d3.select("#current-year");

    let currentYear = years[0];
    let interval;

    // Sync slider with the timeline
    yearSlider
        .attr("min", years[0])
        .attr("max", years[1])
        .attr("value", currentYear)
        .on("input", function () {
            const year = +this.value;
            updateYear(year);
        });

    // Update function to update the timeline and bars
    function updateYear(year) {
        currentYear = year;
        currentYearText.text(currentYear);
        yearSlider.property("value", currentYear); // Sync the slider value with the current year
        updateBars(currentYear);
    }

    // Play/Pause functionality
    playPauseButton.on("click", () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
            playPauseButton.text("Play");
        } else {
            playPauseButton.text("Pause");
            interval = setInterval(() => {
                if (currentYear >= years[1]) {
                    clearInterval(interval);
                    playPauseButton.text("Play");
                } else {
                    updateYear(currentYear + 1);
                }
            }, 1000);
        }
    });

    // Initial setup to display the first year's data
    updateYear(currentYear);
});