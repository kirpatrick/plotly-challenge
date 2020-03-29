// Refer to the Plotly.js documentation (https://plot.ly/javascript/) when building the plots.

// // Check connection to app.js
console.log("Connected to app.js");

/*****************************************************/
// 1. Use the D3 library to read in `samples.json`.
const url = "data/samples.json";
// Fetch the JSON data - Promise Pending
const data = d3.json(url);
// Log results
console.log("Data Promise: ", data);

// Unpack uitilty to extract child elements
// function unpack(rows, index) {
//   return rows.map(function (row) {
//     return row[index];
//   });
// }

/*****************************************************/
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Display data on html
data.then((selectedData) => {
  // Store index otu index
  let selected_otu_index = 0;

  // Store importedData to local varable
  let localData = selectedData;
  // Check localData in console
  console.log("localData for bar chart: ", localData);

  /**********************************************************************/
  // Prepare data for bargraph
  let selected_sample = localData.samples[selected_otu_index];
  // Sort the data array using the greekSearchResults value
  selected_sample.sample_values.sort(function (a, b) {
    return parseFloat(b.sample_values) - parseFloat(a.sample_values);
  });

  // Slice the first 10 objects for plotting
  selected_sample.sample_values = selected_sample.sample_values.slice(0, 10);

  // Reverse the array due to Plotly's defaults
  selected_sample.sample_values = selected_sample.sample_values.reverse();

  // Trace - Working but y-axis label still duplating (x2)
  let bar_trace = {
    x: selected_sample.sample_values,
    y: selected_sample.sample_values.map(row => selected_sample.otu_ids),
    text: selected_sample.otu_labels.map(row => row).slice(0, 10),
    name: "OTU",
    type: "bar",
    orientation: "h"
  };
  console.log("bar_trace: ",bar_trace);

  // data
  let bar_chartData = [bar_trace];

  // Apply the group bar mode to the layout
  let layout = {
    title: `OTU results for Test Subject ${localData.names[selected_otu_index]}`,
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", bar_chartData, layout);

  /**********************************************************************/
  // 3. Create a bubble chart that displays each sample.
  
  
  
  
  // * Use `otu_labels` for the text values.

  // Trace - Working but y-axis label still duplating (x2)
  let bubble_trace = {
    // * Use `otu_ids` for the x values.
    x: selected_sample.sample_values,
    // * Use `sample_values` for the y values.
    y: selected_sample.sample_values.map(row => selected_sample.otu_ids),
    text: selected_sample.otu_labels.map(row => row).slice(0, 10),
    name: "OTU",
    type: "scatter",
    mode: "markers",
    marker: {
      // * Use `otu_ids` for the marker colors.
      color: 'rgb(31, 119, 180)',
      // * Use `sample_values` for the marker size.
      size: 18,
      symbol: 'circle'
    },
    orientation: "h"
  };
  console.log("bubble_trace: ", bubble_trace);

  // data
  let bubble_chartData = [bubble_trace];

  // Apply the group bar mode to the layout
  // let layout = {
  //   title: `OTU results for Test Subject ${localData.names[selected_otu_index]}`,
  //   margin: {
  //     l: 100,
  //     r: 100,
  //     t: 100,
  //     b: 100
  //   }
  // };

  // Render the plot to the div tag with id bubble""
  Plotly.newPlot("bubble", bubble_chartData, layout);

  /*****************************************************/
  // 4. Display the sample metadata, i.e., an individual's demographic information.
  // 5. Display each key-value pair from the metadata JSON object somewhere on the page.
  // Store metadata at index
  let selected_otu_metadata = localData.metadata[selected_otu_index];
  // Check names in console
  console.log("selected_otu_metadata: ", selected_otu_metadata);
  // Check value returned
  console.log("selected_otu_metadata[id]", selected_otu_metadata["id"]);

  // Store values
  let id = selected_otu_metadata["id"]
  let ethnicity = selected_otu_metadata["ethnicity"]
  let gender = selected_otu_metadata["gender"]
  let age = selected_otu_metadata["age"]
  let location = selected_otu_metadata["location"]
  let bbtype = selected_otu_metadata["bbtype"]
  let wfreq = selected_otu_metadata["wfreq"]

  // Utility to return the key given a value
  const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val);

  // Test key 'getKey'
  console.log("metadata id key", getKey(selected_otu_metadata, ethnicity));

  let item = d3.select(".panel-body");
  item.html("");

  item.append("p").text(`${getKey(selected_otu_metadata, id)}: ${id}`);
  item.append("p").text(`${getKey(selected_otu_metadata, ethnicity)}: ${ethnicity}`);
  item.append("p").text(`${getKey(selected_otu_metadata, gender)}: ${gender}`);
  item.append("p").text(`${getKey(selected_otu_metadata, age)}: ${age}`);
  item.append("p").text(`${getKey(selected_otu_metadata, location)}: ${location}`);
  item.append("p").text(`${getKey(selected_otu_metadata, bbtype)}: ${bbtype}`);
  item.append("p").text(`${getKey(selected_otu_metadata, wfreq)}: ${wfreq}`);

  

  // let dropdown = d3.select("#selDataset");
  // dropdown.append("option").text()


  // d3.selectAll("#selDataset")
//     .data(localData)
//     .enter()
//     .append("option")
//     .html(function(d){
//         return d.names;
//         // return `<option value="${d.names}">${d.names}</option>`;
//     });
//     // .append("<option>" + names + "</option>");
  
  
  
  // localData.forEach((selected_otu_metadata) => {
  //   let row = sample_metadata.append("div");
  //   Object.entries(selected_otu_metadata).forEach(([key, value]) => {
  //     let cell = row.append("p");
  //     cell.text(key, value);
  //   });
  // });


});


/*****************************************************/
// 6. Update all of the plots any time that a new sample is selected.
// Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);



// Use D3 to create an event handler
// d3.selectAll("body").on("change", optionChanged);

// function optionChanged() {

    // // * Use `sample_values` as the values for the bar chart.
    // let dropdownMenu = d3.selectAll("#selDataset").node();
    // // Assign the value of the dropdown menu option to a varable
    // // let dataset = dropdownMenu.property("onchange");

    // // Assign the dropdown menu item ID to a varable
    // let dropdownMenuID = dropdownMenu.id;
    // // Assign the dropdown menu option to a varable
    // let selectedOption = dropdownMenu.onchange;

    // console.log("dropdownMenuID", dropdownMenuID);
    // console.log("selectedOption", selectedOption);


// }

// let dropdownMenu = d3.selectAll("#selDataset").node();
// // Assign the value of the dropdown menu option to a varable
// // let dataset = dropdownMenu.property("onchange");

// // Assign the dropdown menu item ID to a varable
// let dropdownMenuID = dropdownMenu.id;
// // Assign the dropdown menu option to a varable
// let selectedOption = dropdownMenu.onchange;

// console.log("dropdownMenuID", dropdownMenuID);
// console.log("selectedOption", selectedOption);

// // Map to sample_names (ids)
// let sample_names = localData.names;
// console.log("sample_names", sample_names);
// console.log("sample_names.length", sample_names.length);

// // dropdownMenuID.onchange.append(`<option> ${sample_names} </option>`);

// // dropdownMenu
// d3.selectAll("#selDataset")
//     .data(localData)
//     .enter()
//     .append("option")
//     .html(function(d){
//         return d.names;
//         // return `<option value="${d.names}">${d.names}</option>`;
//     });
//     // .append("<option>" + names + "</option>");

