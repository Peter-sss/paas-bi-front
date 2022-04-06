// 图表颜色数组
export const colorGroup = [
  ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  ['#236FFF', '#49DFEF', '#FF801A', '#26FB79', '#FB3770', '#705FEF', '#FFEB3B', '#64D2FF', '#7CE324'],
  ['#FFEB3B', '#1BB5FF', '#05FFBC', '#FB3770', '#7CE324', '#FF801A', '#0CFFE6', '#705DFF', '#26FB79'],
  ['#49DFEF', '#FB3770', '#FFEB3B', '#FF801A', '#A3FF0C', '#2A7EFF', '#705DFF', '#FF453A', '#05FFBC'],
  ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E86452', '#6DC8EC', '#FF9845', '#1E9493', '#FF99C3'],
  ['#1890FF', '#9BCC66', '#2FC25B', '#F7CB4A', '#F88D48', '#F35352', '#CE62D6', '#8854D4', '#5156B8'],
  ['#016BC2', '#FF8502', '#0FA8E0', '#197C90', '#4D5FB0', '#B98934', '#4D8CAE', '#72C8F2', '#FFBF9A'],
  ['#984337', '#5B6246', '#999053', '#E1D09F', '#E39971', '#9A4D2E', '#DB5546', '#E7824F', '#DBA946'],
  ['#A1CB80', '#3D8A6F', '#FFCD5D', '#C74A66', '#42A4B8', '#8B736E', '#739E90', '#08A86C', '#4294B8'],
  ['#A1CB80', '#5B6246', '#999053', '#E1D09F', '#E39971', '#AD6244', '#77AD98', '#AECDC3', '#B4BBA5'],
  ['#8BD6DA', '#FFF2AC', '#C0DC90', '#FEDFCF', '#A2DADD', '#7CBDC1', '#EABBCD', '#FDD9D1', '#6AA8AB'],
  ['#9FAE7C', '#91268F', '#EFB8CB', '#E39D79', '#794D95', '#6BA9BA', '#F6D48C', '#1A66A2', '#D4D3A3'],
  ['#008E93', '#A9B788', '#2A5C9E', '#76A45E', '#CFD455', '#6091B9', '#439C9F', '#8C83A7', '#373A79'],
];

// 柱状图
export const barOption = {
  title: {
    text: '未命名组件1',
  },
  color: colorGroup[0],
  legend: {},
  tooltip: {},
  xAxis: [{ type: 'category' }],
  yAxis: [{}],
  series: [
    { type: 'bar',  barGap: '30%', },
    { type: 'bar',  barGap: '30%', },
    { type: 'bar',  barGap: '30%', },
  ],
  dataZoom: [
    {
      type: 'inside',
      startValue: 0,
      endValue: 6,
    }
  ],
  dataset: [{
    source: []
  }]
}

// 折线图
export const lineOption = {
  title: {
    text: '未命名组件1',
  },
  color: colorGroup[0],
  legend: {},
  tooltip: {},
  xAxis: [{ type: 'category' }],
  yAxis: [{}],
  series: [
    { type: 'line', lineStyle: {width: 2} },
    { type: 'line', lineStyle: {width: 2} },
    { type: 'line', lineStyle: {width: 2} }
  ],
  dataZoom: [
    {
      type: 'inside',
      startValue: 0,
      endValue: 6,
    }
  ],
  dataset: [{
    source: []
  }]
}

// 饼图
export const pieOption = {
  title: {
    text: '未命名组件1',
  },
  color: colorGroup[0],
  legend: {},
  tooltip: {},
  series: [
    { type: 'pie', radius: [0, '75%']},
    { type: 'pie', radius: [0, '75%']},
    { type: 'pie', radius: [0, '75%']}
  ],
  dataset: [{
    source: []
  }]
}

// 散点图
export const scatterOption = {
  title: {
    text: '未命名组件1',
  },
  color: colorGroup[0],
  legend: {},
  tooltip: {},
  xAxis: [{ type: 'category' }],
  yAxis: [{}],
  series: [
    { type: 'scatter', symbolSize: 10 },
    { type: 'scatter', symbolSize: 10 },
    { type: 'scatter', symbolSize: 10 }
  ],
  dataZoom: [
    {
      type: 'inside',
      startValue: 0,
      endValue: 6,
    }
  ],
  dataset: [{
    source: []
  }]
}

