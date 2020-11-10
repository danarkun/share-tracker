import { VisualizationSpec } from 'react-vega';

export default {
  $schema: "https://vega.github.io/schema/vega/v5.json",
  description: "A basic line chart example.",
  width: 1000,
  height: 200,
  padding: 5,
  signals: [
    {
      name: "interpolate",
      value: "linear",
      bind: {
        input: "select",
        options: [
          "basis",
          "cardinal",
          "catmull-rom",
          "linear",
          "monotone",
          "natural",
          "step",
          "step-after",
          "step-before"
        ]
      }
    }
  ],

  data: [
    {
      name: 'table',
    },
  ],

  scales: [
    {
      name: "time",
      type: "point",
      range: "width",
      domain: { data: "table", field: "time" }
    },
    {
      name: "price",
      type: "linear",
      range: "height",
      nice: true,
      zero: true,
      domain: { "data": "table", "field": "price" }
    },
    {
      name: "color",
      type: "ordinal",
      range: "category",
      domain: { "data": "table", "field": "c" }
    }
  ],

  axes: [
    { orient: "bottom", scale: "time" },
    { orient: "left", scale: "price" }
  ],

  encoding: {
    x: {field: "time", type: "temporal"},
    y: {field: "price", type: "quantitative"}
  },

  marks: [
    {
      type: "group",
      from: {
        facet: {
          name: "series",
          data: "table",
          groupby: "c"
        }
      },
      marks: [
        {
          type: "line",
          from: { "data": "series" },
          encode: {
            enter: {
              x: { scale: "time", field: "time" },
              y: { scale: "price", field: "price" },
              stroke: { scale: "color", field: "c" },
              strokeWidth: { value: 2 }
            },
            update: {
              interpolate: { signal: "interpolate" },
              strokeOpacity: { "value": 1 }
            },
            hover: {
              strokeOpacity: { "value": 0.5 }
            }
          }
        }
      ]
    }
  ]
} as VisualizationSpec