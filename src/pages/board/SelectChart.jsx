import React, {useState, useEffect} from 'react';
import { Input, Button, Select, Empty, Checkbox} from 'antd';
import './index.less'
import ic_bar from '../../assets/images/charts/ic_chart_bar.png'
import ic_line from '../../assets/images/charts/ic_chart_line.png'
import ic_pie from '../../assets/images/charts/ic_chart_pie.png'
import ic_scatter from '../../assets/images/charts/ic_chart_scatter_2d.png'
import ChartConfig from './ChartConfig';
import ChartAnalyze from './ChartAnalyze';
import BaseChart from '../../components/charts/BaseChart';
import {barOption, lineOption, pieOption, scatterOption} from './config';
import {randomString, fullScreen, isFullScreen} from '../../utils/index'
const { Search } = Input;
const { Option } = Select;
const Id = randomString()

export default function SelectChart () {
  const [coordinate, setCoordinate] = useState({dimensions: [], target: [], selectedDimensions: [], selectedTarget: [] })
  const [editType, setEditType] = useState('attributes') // attributes 样式属性操作  analyze 数据分析
  const [optionObj, setOptionObj] = useState({})
  useEffect(() => {
    setCoordinate((coordinate) => ({
      ...coordinate,
      dimensions: ['日期', '姓名', '性别'],
      target: ['年龄', '销售额', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    }))
  }, [])
  const fullScreenOk = (ele) => {
    if (!isFullScreen()) {
      fullScreen(true, ele || document.body)
    } else {
      fullScreen(false)
    }
  }
  const onChangeSelect = (type, item) => {
    if (type === 'dimensions') {
      let bool = coordinate.selectedDimensions.includes(item)
      setCoordinate({...coordinate, selectedDimensions: bool ? coordinate.selectedDimensions.filter((it) => it !== item) : [...coordinate.selectedDimensions, item]})
    }
    if (type === 'target') {
      let bool = coordinate.selectedTarget.includes(item)
      setCoordinate({...coordinate, selectedTarget: bool ? coordinate.selectedTarget.filter((it) => it !== item) : [...coordinate.selectedTarget, item]})
    }
  }
  const getOption = (type, option) => {
    option.dataset = [{
      // 提供一份数据。
      source: [
        ['product', '2015', '2016', '2017'],
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1],
        ['Walnut Brownie1', 72.4, 53.9, 39.1],
        ['Walnut Brownie2', 72.4, 53.9, 39.1],
        ['Walnut Brownie3', 72.4, 53.9, 39.1],
        ['Walnut Brownie4', 72.4, 53.9, 39.1],
        ['Walnut Brownie5', 72.4, 53.9, 39.1],
        ['Walnut Brownie6', 72.4, 53.9, 39.1],
        ['1Walnut Brownie6', 72.4, 53.9, 39.1],
        ['2Walnut Brownie6', 72.4, 53.9, 39.1],
        ['3Walnut Brownie6', 72.4, 53.9, 39.1],
        ['4Walnut Brownie6', 72.4, 53.9, 39.1],
        ['5Walnut Brownie6', 72.4, 53.9, 39.1],
        ['6Walnut Brownie6', 72.4, 53.9, 39.1],
        ['7Walnut Brownie6', 72.4, 53.9, 39.1],
        ['8Walnut Brownie6', 72.4, 53.9, 39.1],
        ['9Walnut Brownie6', 72.4, 53.9, 39.1],
        ['10Walnut Brownie6', 72.4, 53.9, 39.1],
      ],
    }]
    setOptionObj({...optionObj, type, [type]: optionObj[type] || option})
  }
  const chartImgArr = [
    {title: '柱状图', imgSrc: ic_bar, type: 'bar', option: barOption},
    {title: '折线图', imgSrc: ic_line, type: 'line', option: lineOption},
    {title: '饼图', imgSrc: ic_pie, type: 'pie', option: pieOption},
    {title: '散点图', imgSrc: ic_scatter, type: 'scatter', option: scatterOption}
  ]
  return <div className="add-chart-container">
    <div className="left-content">
      <div className="dimensions">
        <div className="title">维度</div>
        <Search
          placeholder="input search text"
          onSearch={(value) => console.log(value)}
        />
        <ul className="ul-content">
          {
            coordinate.dimensions.map((item, index) =>
              <li className={`li-item ${coordinate.selectedDimensions.includes(item) ? 'active' : null}`}
                key={item}
                onClick={() => onChangeSelect('dimensions', item)}>
                {item}
              </li>)
          }
        </ul>
      </div>
      <div className="target">
        <div className="title">指标</div>
        <Search
          placeholder="input search text"
          onSearch={(value) => console.log(value)}
        />
        <ul className="ul-content">
          {
            coordinate.target.map((item, index) =>
              <li className={`li-item ${coordinate.selectedTarget.includes(item) ? 'active' : null}`}
                key={item}
                onClick={() => onChangeSelect('target', item)}>
                {item}
              </li>)
          }
        </ul>
      </div>
    </div>
    <div className={'center-content'}>
      <div className="edit-btn">
        <Button type="primary" onClick={() => setEditType('attributes')}>选择图表</Button>
        <Button type="primary" onClick={() => setEditType('analyze')}>图表分析</Button>
      </div>
      {
        editType === 'attributes' ? <div className="edit-content">
          <div className="chart-ic-content">
            {
              chartImgArr.map((item) => <div className={`chart-ic-item ${optionObj.type === item.type ? 'active' : null}`} key={item.type} title={item.title} onClick={() => getOption(item.type, item.option)}>
                <img src={item.imgSrc} alt='' />
              </div>)
            }
          </div>
          <div className='edit-bottom'>
            {optionObj[optionObj.type] ?  <ChartConfig type={optionObj.type} option={optionObj[optionObj.type]} setOption={(option) => setOptionObj({...optionObj, [optionObj.type]: option})}/>
              : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'请先选择图表'}/>}
          </div>
        </div> : <div className="edit-content"><ChartAnalyze/></div>
      }
    </div>
    <div className='right-content'>
      <div className="axis-select">
        <div className="select-content">
          <span className="title">维度: </span>
          <Select
            allowClear
            value={coordinate.selectedDimensions}
            mode="tags"
            className="select"
            placeholder="请选择维度"
            onChange={(value) => setCoordinate({...coordinate, selectedDimensions: value})}>
            {
              coordinate.dimensions.map((item) => <Option key={item}>{item}</Option>)
            }
          </Select>
        </div>
        <div className="select-content">
          <span className="title">指标: </span>
          <Select
            allowClear
            value={coordinate.selectedTarget}
            mode="tags"
            className="select"
            placeholder="请选择指标"
            onChange={(value) => setCoordinate({...coordinate, selectedTarget: value})}>
            {
              coordinate.target.map((item) => <Option key={item}>{item}</Option>)
            }
          </Select>
        </div>
      </div>
      <div className="chart-content" id={Id}>
        <div className="top-edit-content">
          <Button type="primary" onClick={() => fullScreenOk(document.getElementById(Id))}>预览</Button>
          <Button type="primary">保存</Button>
        </div>
        <div className="bottom-chart">
          {optionObj[optionObj.type] ? <BaseChart option={optionObj[optionObj.type]}/> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无图表'}/>}
        </div>
        <div className='bottom-checkbox'>
          <Checkbox onChange={(e) => console.log(e.target.checked)}>查看全部数据</Checkbox>
        </div>
      </div>
    </div>
  </div>
}
