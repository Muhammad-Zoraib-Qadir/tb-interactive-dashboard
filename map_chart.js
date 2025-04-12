// Set dimensions
const width = 1000;
const height = 600;

// Append SVG to map container
const svg = d3.select("#map-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Create a group for zooming and panning
const g = svg.append("g");

// Tooltip for country information
const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip");

// Define color scale for WHO regions
const colorScale = d3.scaleOrdinal()
    .domain(["AFR", "AMR", "EMR", "EUR", "SEAR", "WPR"])
    .range(d3.schemeCategory10);

// Load GeoJSON and cleaned data
Promise.all([
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
    d3.csv("cleaned_data.csv")
]).then(([geojson, data]) => {
    // Map countries to regions
    const countryRegionMap = new Map();
    data.forEach(d => countryRegionMap.set(d.country, d.g_whoregion));

    // Create a projection and path generator
    const projection = d3.geoMercator()
        .scale(150)
        .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    // Draw the map
    const countries = g.selectAll("path")
        .data(geojson.features)
        .join("path")
        .attr("d", path)
        .attr("fill", d => {
            const region = countryRegionMap.get(d.properties.name);
            return region ? colorScale(region) : "#ccc";
        })
        .attr("stroke", "#333")
        .attr("stroke-width", 0.5)
        .on("mouseover", (event, d) => {
            const country = d.properties.name;
            const region = countryRegionMap.get(country);
            tooltip.transition().duration(200).style("opacity", 1);
            tooltip.html(`<strong>Country:</strong> ${country}<br><strong>Region:</strong> ${region || "Unknown"}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mousemove", event => {
            tooltip.style("left", (event.pageX + 10) + "px")
                   .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", () => {
            tooltip.transition().duration(200).style("opacity", 0);
        });

    // Add zoom and pan behavior
    const zoom = d3.zoom()
        .scaleExtent([1, 8]) // Define zoom scale limits
        .on("zoom", event => {
            g.attr("transform", event.transform); // Apply zoom transformation
        });

    svg.call(zoom);

    // Add a legend for the regions
    const legend = svg.append("g")
        .attr("transform", `translate(${width - 220}, 20)`);

    // Add a background for the legend
    legend.append("rect")
        .attr("x", -10)
        .attr("y", -10)
        .attr("width", 200)
        .attr("height", colorScale.domain().length * 20 + 10)
        .attr("fill", "rgba(255, 255, 255, 0.8)") // Semi-transparent white background
        .attr("stroke", "#ccc")
        .attr("rx", 5); // Rounded corners

    legend.selectAll("rect.color")
        .data(colorScale.domain())
        .join("rect")
        .attr("class", "color")
        .attr("x", 0)
        .attr("y", (d, i) => i * 20)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", d => colorScale(d));

    legend.selectAll("text")
        .data(colorScale.domain())
        .join("text")
        .attr("x", 20)
        .attr("y", (d, i) => i * 20 + 12)
        .text(d => d)
        .attr("font-size", 12)
        .attr("fill", "#333");
});