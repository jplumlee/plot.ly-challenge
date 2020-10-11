function metaData() {

    d3.json("samples.json").then(function(data) {
        var demoData = data.metadata;
        var filteredData = demoData.filter(sample => sample.id === 940);
        var sampleMetadata = d3.select("#sample-metadata");
        
        // Use `.html("") to Clear any Existing Metadata
        sampleMetadata.html("");

        Object.entries(filteredData).forEach(([key, value]) => {
          sampleMetadata.append("p").text(`${key}:${value}`);
        })

    });
};

function charts(sampleId) {
    d3.json("samples.json").then(function(importedData) {
        var data = importedData;
        var samples = data.samples;
        // var sampleIds = samples.map(id => id);
        // var idIndex = sampleIds.findIndex(sampleId);
        const otu_ids = samples.map(({ otu_ids }) => otu_ids.slice(0, 10))[0];
        const otu_ids2 = otu_ids.map(x => "OTU" + " " + x)
        const otu_labels = samples.map(({ otu_labels }) => otu_labels.slice(0, 10))[0];
        const sample_values = samples.map(({ sample_values }) => sample_values.slice(0, 10))[0];

        var bubbleData = [{
            x: sample_values.reverse(),
            y: otu_ids2.reverse(),
            // mode: "markers",
            text: otu_labels.reverse(),
            type: "bar",
            orientation: "h"
            // marker: {
            //     size: sample_values,
            //     color: otu_ids,
            // }
        }]
    Plotly.newPlot("bar", bubbleData);
});
}


function dropdown() {

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    d3.json("samples.json").then(function(data) {
        console.log(data)

        data.names.forEach(function(sample) {
            dropdownMenu.append("option").text(sample).property("value", sample);

        });
        // const defaultSample = data[0].id;
        charts(dropdownMenu.property("value"));
    });    
};

dropdown();
charts();