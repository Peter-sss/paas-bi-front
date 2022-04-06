import React, { useState, useEffect, useCallback } from 'react';
import { Collapse } from 'antd';
import { InputEle, ColorEle, InputNumberEle } from './configWidget';
const { Panel } = Collapse;

export default function ChartConfig (props) {
  const {type, option, setOption} = props

  // 图表支持可操作的属性
  const showPanel = {
    bar: ['title', 'color', 'size', 'axis', 'background', 'font'],
    line: ['title', 'color', 'size', 'axis', 'background', 'font'],
    pie: ['title', 'color', 'size', 'background', 'font'],
    scatter: ['title', 'color', 'size', 'axis', 'background', 'font'],
  }

  // condition二维数字中第一列代表组件的键值(组件加上key属性), 后续列的代表所支持的图表
  const configArr = [
    {
      title: '标题设置',
      key: 'title',
      condition: [['inputEle', 'bar', 'line', 'pie', 'scatter']],
      inputEle: () => <InputEle key='inputEle' title='标题' value={option.title.text} onChange={(e) => setOption({...option, title: {...option.title, text: e.target.value}})}/>
    },
    {
      title: '颜色设置',
      key: 'color',
      condition: [['colorEle', 'bar', 'line', 'pie', 'scatter']],
      colorEle: () => <ColorEle key='colorEle' value={option.color} onChange={(color) => setOption({...option, color})}/>
    },
    {
      title: '大小设置',
      key: 'size',
      condition: [['inputNumberEle', 'bar'], ['lineWidth', 'line'], ['radiusWidth', 'pie'], ['pointWidth', 'scatter']],
      inputNumberEle: () => <InputNumberEle
        key='InputNumberEle'
        expandProps={{min: -100, max: 100, formatter: (value) => `${value}%`, parser: (value) => value.replace('%', '')}}
        title='柱间距离'
        value={option.series[0].barGap}
        onChange={(num) => setOption({...option, series: option.series.map((item) => ({...item, barGap: num + '%'}))})} />,
      lineWidth: () => <InputNumberEle
        key='lineWidth'
        expandProps={{min: 1}}
        title='线宽'
        value={option.series[0].lineStyle.width}
        onChange={(num) => setOption({...option, series: option.series.map((item) => ({...item, lineStyle: {...item.lineStyle, width: num}}))})} />,
      radiusWidth: () => <InputNumberEle
        key='radiusWidth'
        expandProps={{min: 20, max: 100, formatter: (value) => `${value}%`, parser: (value) => value.replace('%', '')}}
        title='半径'
        value={option.series[0].radius[1]}
        onChange={(num) => setOption({...option, series: option.series.map((item) => ({...item, radius: [0, num + '%']}))})} />,
      pointWidth: () => <InputNumberEle
        key='pointWidth'
        expandProps={{min: 1}}
        title='点直径'
        value={option.series[0].symbolSize}
        onChange={(num) => setOption({...option, series: option.series.map((item) => ({...item, symbolSize: num}))})} />,
    },
    {title: '轴线设置', key: 'axis'},
    {title: '背景设置', key: 'background'},
    {title: '字体设置', key: 'font'},
  ]
  return <Collapse expandIconPosition="right" className='board-collapse'>
    {
      configArr.filter((item) => showPanel[type].includes(item.key)).map((item) => <Panel header={item.title} key={item.key} >
        {
          (item.condition || [[]]).map((el) => {
            if (el.includes(type)) {
              return item[el[0]]()
            }
          })
        }
      </Panel>)
    }
  </Collapse>
}
