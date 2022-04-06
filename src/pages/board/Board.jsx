import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import {Button, Icon, Popover} from 'antd';
import './index.less'
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {fullScreen, isFullScreen, generateImage} from '../../utils/index'

const ResponsiveGridLayout = WidthProvider(Responsive);
export const DEF_Col = 32 * 2 * 2;

export default class Board extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isFullScreen: false,
      selectWidgetKey: null,
      popoverVisible: {},
    }
    this.onLayoutChange = (layout, layouts) => {
      console.log(layout, layouts);
    }
    this.fullScreenOk = (ele) => {
      this.setState({isFullScreen: !isFullScreen()})
      if (!isFullScreen()) {
        fullScreen(true, ele || document.body)
      } else {
        fullScreen(false)
      }
    }

    this.onPopover = (item, visible) => {
      this.setState({
        popoverVisible: Object.assign(this.state.popoverVisible, {[item]: visible})
      })
    };
    this.generateDOM = () => {
      const layouts = {lg: [
        {i: 'a', x: 10, y: 0, w: 64, h: 32},
        {i: 'b', x: 1, y: 2, w: 3, h: 32},
        {i: 'c', x: 4, y: 0, w: 1, h: 32}
      ]};
      const content = (item) => (
        <div>
          <div className="popover-item" onClick={() => this.onPopover(item.i, false)}>编辑</div>
          <div className="popover-item" onClick={() => this.onPopover(item.i, false)}>导出</div>
          <div style={{color: 'red'}} className="popover-item" onClick={() => this.onPopover(item.i, false)}>删除</div>
        </div>
      )
      return layouts.lg.map((item) => <div
        key={item.i}
        className={`bi-board-widget ${this.state.selectWidgetKey === item.i ? 'widget-selected' : null}`}
        onClick={(e) => {e.stopPropagation(); this.setState({selectWidgetKey: item.i})}}
      >

        <Popover placement="bottom"
          content={content(item)}
          trigger="click"
          overlayClassName="bi-select-popover"
          visible={this.state.popoverVisible[item.i]}
          onVisibleChange={(visible) => {
            this.onPopover(item.i, visible);
          }}
        >
          <div className='widget-edit-btn'>
            <Icon type="ellipsis" />
          </div>
        </Popover>

        {item.i}
      </div>)
    }
  }
  render () {
    const layouts = {lg: [
      {i: 'a', x: 10, y: 0, w: 64, h: 32},
      {i: 'b', x: 1, y: 2, w: 3, h: 32},
      {i: 'c', x: 4, y: 0, w: 1, h: 32}
    ]};
    return (
      <div className='bi-board-container' id="bi-board-container">
        <div className="edit-content">
          <div className="title">仪表盘1</div>
          <div className="edit-btn-content">
            <Button type="primary">添加图表组件</Button>
            <Button type="primary" onClick={() => this.fullScreenOk(document.getElementById('bi-board-container'))}>预览</Button>
            <Button type="primary">保存</Button>
            <Button type="primary" onClick={() => generateImage(document.getElementsByClassName('generate-layout-image')[0])}>导出</Button>
          </div>
        </div>
        <div className={`board-layout-content ${!this.state.isFullScreen ? 'back-color' : null}`} id="board-layout-content" onClick={() => this.setState({selectWidgetKey: 'd'})}>
          <ResponsiveGridLayout
            autoSize
            className='generate-layout-image'
            compactType={null}
            preventCollision
            margin={[0, 0]}
            layouts={layouts}
            breakpoints={{ lg: 1200 }}
            cols={{ lg: DEF_Col }}
            rowHeight={10}
            onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
          >
            {this.generateDOM()}
          </ResponsiveGridLayout>
        </div>
      </div>
    );
  }
}
