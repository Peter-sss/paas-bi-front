import React, { useState, useEffect } from 'react';
import { Button, Select, Empty } from 'antd';
import './index.less';
import ChartConfig from './ChartConfig';
import BaseChart from '../../components/charts/BaseChart';
import Map from './Map';
import Model from './Model';
import { barOption, lineOption, pieOption, scatterOption } from './config';
import { randomString, fullScreen, isFullScreen } from '../../utils/index';
const { Option } = Select;
const Id = randomString();

export default function SelectChart() {
    const [coordinate, setCoordinate] = useState({
        dimensions: [],
        target: [],
        selectedDimensions: [],
        selectedTarget: [],
    });
    const [optionObj, setOptionObj] = useState({});
    useEffect(() => {
        setCoordinate((coordinate) => ({
            ...coordinate,
            dimensions: ['日期', '姓名'],
            target: ['年龄', '销售额', '往年销售额'],
        }));
    }, []);
    const fullScreenOk = (ele) => {
        if (!isFullScreen()) {
            fullScreen(true, ele || document.body);
        } else {
            fullScreen(false);
        }
    };
    const onChangeSelect = (type, item) => {
        if (type === 'dimensions') {
            let bool = coordinate.selectedDimensions.includes(item);
            setCoordinate({
                ...coordinate,
                selectedDimensions: bool
                    ? coordinate.selectedDimensions.filter((it) => it !== item)
                    : [...coordinate.selectedDimensions, item],
            });
        }
        if (type === 'target') {
            let bool = coordinate.selectedTarget.includes(item);
            setCoordinate({
                ...coordinate,
                selectedTarget: bool
                    ? coordinate.selectedTarget.filter((it) => it !== item)
                    : [...coordinate.selectedTarget, item],
            });
        }
    };
    const getOption = (type, option) => {
        if (option) {
            let { selectedDimensions } = coordinate;
            if (selectedDimensions.includes('姓名')) {
                option.dataset = [
                    {
                        // 提供一份数据。
                        source: [
                            ['product', '2015', '2016', '2017'],
                            ['Latte', 93.3, 55.8, 63.7],
                            ['Tea', 23.1, 73.4, 55.1],
                            ['Cocoa', 26.4, 85.2, 22.5],
                            ['Brownie', 19.4, 56.9, 39.1],
                            ['Brownie1', 72.4, 234.9, 39.1],
                            ['Brownie2', 72.4, 153.9, 39.1],
                            ['Brownie3', 272.4, 53.9, 39.1],
                            ['Brownie4', 372.4, 253.9, 39.1],
                            ['Brownie5', 72.4, 153.9, 39.1],
                            ['Brownie6', 72.4, 53.9, 39.1],
                            ['Brownie7', 172.4, 53.9, 39.1],
                            ['Brownie8', 72.4, 53.9, 39.1],
                            ['Brownie9', 72.4, 253.9, 39.1],
                            ['Brownie10', 72.4, 53.9, 39.1],
                            ['Brownie11', 272.4, 53.9, 139.1],
                            ['Brownie12', 272.4, 53.9, 39.1],
                            ['Brownie13', 72.4, 53.9, 239.1],
                            ['Brownie14', 72.4, 243.9, 39.1],
                            ['Brownie15', 172.4, 53.9, 39.1],
                            ['Brownie16', 72.4, 253.9, 39.1],
                        ],
                    },
                ];
            } else {
                option.dataset = [
                    {
                        // 提供一份数据。
                        source: [
                            ['product', '2015', '2016', '2017'],
                            ['Latte', 43.3, 85.8, 93.7],
                            ['Tea', 83.1, 73.4, 55.1],
                            ['Cocoa', 86.4, 65.2, 82.5],
                            ['Brownie', 72.4, 53.9, 39.1],
                            ['Brownie1', 72.4, 53.9, 39.1],
                            ['Brownie2', 72.4, 53.9, 39.1],
                            ['Brownie3', 72.4, 53.9, 39.1],
                            ['Brownie4', 72.4, 53.9, 39.1],
                            ['Brownie5', 72.4, 53.9, 39.1],
                            ['Brownie6', 72.4, 53.9, 39.1],
                            ['Brownie7', 72.4, 53.9, 39.1],
                            ['Brownie8', 72.4, 53.9, 39.1],
                            ['Brownie9', 72.4, 53.9, 39.1],
                            ['Brownie10', 72.4, 53.9, 39.1],
                            ['Brownie11', 72.4, 53.9, 39.1],
                            ['Brownie12', 72.4, 53.9, 39.1],
                            ['Brownie13', 72.4, 53.9, 39.1],
                            ['Brownie14', 72.4, 53.9, 39.1],
                            ['Brownie15', 72.4, 53.9, 39.1],
                            ['Brownie16', 72.4, 53.9, 39.1],
                        ],
                    },
                ];
            }
        }
        setOptionObj({ ...optionObj, type, [type]: optionObj[type] || option });
    };
    const chartImgArr = [
        { title: '柱状图', type: 'bar', option: barOption },
        { title: '折线图', type: 'line', option: lineOption },
        { title: '饼图', type: 'pie', option: pieOption },
        { title: '散点图', type: 'scatter', option: scatterOption },
        { title: '地图', type: 'map' },
        { title: '3D模型', type: 'model' },
    ];
    const onSave = () => {
        let biData = JSON.parse(window.localStorage.getItem('biData')) || {};
        let name =
            chartImgArr.find((item) => item.type === optionObj.type)?.title + '-' + randomString();
        biData[name] = {
            name,
            type: optionObj.type,
            data: optionObj[optionObj.type],
        };
        localStorage.setItem('biData', JSON.stringify(biData));
    };
    return (
        <div className="add-chart-container">
            <div className="left-content">
                <div className="top-title">数据源</div>
                <div className="dimensions">
                    <div className="title">维度(X)</div>
                    <ul className="ul-content">
                        {coordinate.dimensions.map((item, index) => (
                            <li
                                className={`li-item ${
                                    coordinate.selectedDimensions.includes(item) ? 'active' : null
                                }`}
                                key={item}
                                onClick={() => onChangeSelect('dimensions', item)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="target">
                    <div className="title">指标(Y)</div>
                    <ul className="ul-content">
                        {coordinate.target.map((item, index) => (
                            <li
                                className={`li-item ${
                                    coordinate.selectedTarget.includes(item) ? 'active' : null
                                }`}
                                key={item}
                                onClick={() => onChangeSelect('target', item)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="center-content">
                <div className="axis-select">
                    <div className="select-content">
                        <span className="title">维度(X): </span>
                        <Select
                            allowClear
                            value={coordinate.selectedDimensions}
                            mode="tags"
                            className="select"
                            placeholder="请选择维度"
                            onChange={(value) =>
                                setCoordinate({ ...coordinate, selectedDimensions: value })
                            }
                        >
                            {coordinate.dimensions.map((item) => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className="select-content">
                        <span className="title">指标(Y): </span>
                        <Select
                            allowClear
                            value={coordinate.selectedTarget}
                            mode="tags"
                            className="select"
                            placeholder="请选择指标"
                            onChange={(value) =>
                                setCoordinate({ ...coordinate, selectedTarget: value })
                            }
                        >
                            {coordinate.target.map((item) => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="chart-content" id={Id}>
                    <div className="top-edit-content">
                        <Button
                            type="primary"
                            onClick={() => fullScreenOk(document.getElementById(Id))}
                        >
                            预览
                        </Button>
                        <Button type="primary" onClick={onSave}>
                            保存
                        </Button>
                    </div>
                    <div className="bottom-chart">
                        {optionObj.type === 'map' && <Map />}
                        {optionObj.type === 'model' && <Model />}
                        {!['map', 'model'].includes(optionObj.type) && optionObj[optionObj.type] ? (
                            <BaseChart option={optionObj[optionObj.type]} />
                        ) : (
                            !['map', 'model'].includes(optionObj.type) && (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={'暂无图表'}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className="right-content">
                <div className="edit-content">
                    <div className="chart-ic-content">
                        {chartImgArr.map((item) => (
                            <div
                                className={`chart-ic-item ${
                                    optionObj.type === item.type ? 'active' : null
                                }`}
                                key={item.type}
                                title={item.title}
                                onClick={() => getOption(item.type, item.option)}
                            >
                                <div>{item.title}</div>
                            </div>
                        ))}
                    </div>
                    <div className="edit-bottom">
                        {optionObj[optionObj.type] ? (
                            <ChartConfig
                                type={optionObj.type}
                                option={optionObj[optionObj.type]}
                                setOption={(option) =>
                                    setOptionObj({ ...optionObj, [optionObj.type]: option })
                                }
                            />
                        ) : (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={'请先选择图表'}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
