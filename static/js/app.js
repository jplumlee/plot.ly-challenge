function dropdown() {
    // console.log("data")
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // console.log("data")
    d3.json("samples.json").then(function(data) {
        console.log(data)

        data.names.forEach(function(name) {
            dropdownMenu.append("option").text(name).property("value");

            });
    });
    
    }
dropdown();

// function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.node().value;
// }


// function buildData(dataset) {



//     // Grab values from the response json object to build the plots
//     // var otu_label = data.metadata.data;
//     // console.log(otu_label)
//     var otu_id = data.samples.otu_ids;
//     // console.log(otu_id)
// });
// };

// d3.json("samples.json", function(data) {
//     console.log(data);
//   });