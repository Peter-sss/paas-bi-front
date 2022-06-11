import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { Button, Icon, Popover, Modal } from 'antd';
import './index.less';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { randomString, fullScreen, isFullScreen, generateImage } from '../../utils/index';
import BaseChart from '../../components/charts/BaseChart';
import Map from './Map';
import Model from './Model';

const ResponsiveGridLayout = WidthProvider(Responsive);
export const DEF_Col = 32 * 2 * 2;

// const layouts = {
//     lg: [
//         { i: 'a', x: 10, y: 0, w: 64, h: 32 },
//         { i: 'b', x: 1, y: 2, w: 3, h: 32 },
//         { i: 'c', x: 4, y: 0, w: 1, h: 32 },
//     ],
// };

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullScreen: false,
            selectWidgetKey: null,
            popoverVisible: {},
            modalVisible: false,
            chartData: {},
            layouts: {
                lg: [],
            },
            maxY: 0,
        };
        this.onLayoutChange = (layout, layouts) => {
            console.log('呵呵', layout, layouts);
            let maxy = 0;
            layout.map((item) => {
                if (item.y > maxy) {
                    maxy = item.y;
                }
            });
            this.setState({ layouts, maxy });
        };
        this.fullScreenOk = (ele) => {
            this.setState({ isFullScreen: !isFullScreen() });
            if (!isFullScreen()) {
                fullScreen(true, ele || document.body);
            } else {
                fullScreen(false);
            }
        };

        this.onDel = (item) => {
            let { layouts } = this.state;
            layouts.lg = layouts.lg.filter((d) => d.i !== item.i);
            this.setState({ layouts });
            this.onPopover(item.i, false);
        };

        this.onPopover = (item, visible) => {
            this.setState({
                popoverVisible: Object.assign(this.state.popoverVisible, { [item]: visible }),
            });
        };

        this.onSelectChart = (item) => {
            let { layouts, maxY } = this.state;
            let currentLayouts = {
                lg: [
                    ...layouts.lg,
                    { i: item.name + '__' + randomString(), x: 0, y: maxY, w: 64, h: 32 },
                ],
            };
            this.setState({
                chartData: item,
                modalVisible: false,
                layouts: currentLayouts,
            });
        };

        this.onProportion = () => {
            let proportion = JSON.parse(localStorage.getItem('biBoardProportion'));
            localStorage.setItem('biBoardProportion', JSON.stringify(!proportion));
        };
        this.onRelease = () => {
            let { layouts } = this.state;
            let { history } = this.props;
            localStorage.setItem('biBoardLayouts', JSON.stringify(layouts));
            history.push('/release');
        };
        this.dataBack = () => {
            let layouts = JSON.parse(localStorage.getItem('biBoardLayouts')) || { lg: [] };
            this.setState({ layouts });
        };
    }
    render() {
        const { release } = this.props;
        let { layouts } = this.state;
        if (release) {
            layouts = JSON.parse(localStorage.getItem('biBoardLayouts')) || { lg: [] };
        }
        let biData = JSON.parse(localStorage.getItem('biData')) || {};
        const generateDOM = () => {
            const content = (item) => (
                <div>
                    <div
                        style={{ color: 'red' }}
                        className="popover-item"
                        onClick={() => this.onDel(item)}
                    >
                        删除
                    </div>
                </div>
            );
            return layouts.lg.map((item) => {
                let nameArr = item.i.split('__');
                let data = biData[nameArr[0]] || {};
                return (
                    <div
                        key={item.i}
                        className={
                            !release &&
                            `bi-board-widget ${
                                this.state.selectWidgetKey === item.i ? 'widget-selected' : null
                            }`
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                            this.setState({ selectWidgetKey: item.i });
                        }}
                    >
                        {!release && (
                            <Popover
                                placement="bottom"
                                content={content(item)}
                                trigger="click"
                                overlayClassName="bi-select-popover"
                                visible={this.state.popoverVisible[item.i]}
                                onVisibleChange={(visible) => {
                                    this.onPopover(item.i, visible);
                                }}
                            >
                                <div className="widget-edit-btn">
                                    <Icon type="ellipsis" />
                                </div>
                            </Popover>
                        )}
                        {['bar', 'line', 'pie', 'scatter'].includes(data.type) && (
                            <BaseChart option={data.data} />
                        )}
                        {data.type === 'map' && <Map />}
                        {data.type === 'model' && <Model />}
                    </div>
                );
            });
        };
        return (
            <div className="bi-board-container" id="bi-board-container">
                {!release && (
                    <div className="edit-content">
                        <div className="title">仪表盘1</div>
                        <div className="edit-btn-content">
                            <Button
                                type="primary"
                                onClick={() => this.setState({ modalVisible: true })}
                            >
                                添加图表组件
                            </Button>
                            <Button type="primary" onClick={this.dataBack}>
                                数据回显在编辑
                            </Button>
                            <Button
                                type="primary"
                                onClick={() =>
                                    this.fullScreenOk(document.getElementById('bi-board-container'))
                                }
                            >
                                预览
                            </Button>
                            <Button
                                type="primary"
                                onClick={() =>
                                    generateImage(
                                        document.getElementsByClassName('generate-layout-image')[0]
                                    )
                                }
                            >
                                缩率图
                            </Button>
                            <Button type="primary" onClick={this.onProportion}>
                                16: 9
                            </Button>
                            <Button type="primary" onClick={this.onRelease}>
                                生成链接
                            </Button>
                        </div>
                    </div>
                )}
                <div
                    className={`board-layout-content ${
                        !release && !this.state.isFullScreen ? 'back-color' : null
                    }`}
                    id="board-layout-content"
                    onClick={() => this.setState({ selectWidgetKey: 'd' })}
                >
                    <ResponsiveGridLayout
                        autoSize
                        className="generate-layout-image"
                        compactType={null}
                        isDraggable={!release}
                        isResizable={!release}
                        preventCollision
                        margin={[0, 0]}
                        layouts={layouts}
                        breakpoints={{ lg: 1200 }}
                        cols={{ lg: DEF_Col }}
                        rowHeight={10}
                        onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
                    >
                        {generateDOM()}
                    </ResponsiveGridLayout>
                </div>
                <Modal
                    visible={this.state.modalVisible}
                    title="图表选择"
                    footer={null}
                    onCancel={() => this.setState({ modalVisible: false })}
                >
                    {Object.values(biData).map((item) => {
                        return (
                            <div
                                key={item.name}
                                className="board-chart-select"
                                onClick={() => this.onSelectChart(item)}
                            >
                                {item.name}
                            </div>
                        );
                    })}
                </Modal>
            </div>
        );
    }
}
