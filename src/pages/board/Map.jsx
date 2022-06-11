import React from 'react';
import './index.less';
import { resizeDiv, throttle } from '../../utils';
export default class BiMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            bigMap: null,
            point: null,
            bigPoint: null,
            left: 0,
            top: 0,
        };
        this.init = () => {
            // 小地图
            let BMap = window.BMap;
            if (!BMap) return;
            let map = new BMap.Map('biMap', {
                coordsType: 5, // coordsType指定输入输出的坐标类型，3为gcj02坐标，5为bd0ll坐标，默认为5。
                // 指定完成后API将以指定的坐标类型处理您传入的坐标
            }); // 创建地图实例
            let point = new BMap.Point(116.404, 39.915); // 创建点坐标
            map.centerAndZoom(point, 6); // 初始化地图，设置中心点坐标和地图级别
            map.setMapStyleV2({ styleId: '916837ac7e834ec3611fae9a9ccdb509' });
            map.disableScrollWheelZoom(); //禁止缩放
            map.disableDragging(); //禁止拖拽
            // resizeDiv(document.getElementById('biMap'), throttle(this.onResize, 100));
            map.addEventListener('click', (e) => {
                let { offsetX, offsetY, point } = e;
                console.log(e);
                document.getElementById('big-map').style.display = 'block';
                this.setState({
                    bigPoint: point,
                    left: offsetX - 100,
                    top: offsetY - 75,
                });
                this.state.bigMap.centerAndZoom(point, map.getZoom() + 1);
            });

            // 大地图
            let bigMap = new BMap.Map('big-map', {
                coordsType: 5, // coordsType指定输入输出的坐标类型，3为gcj02坐标，5为bd0ll坐标，默认为5。
                // 指定完成后API将以指定的坐标类型处理您传入的坐标
            }); // 创建地图实例
            bigMap.centerAndZoom(point, 7); // 初始化地图，设置中心点坐标和地图级别
            this.setState({
                map,
                bigMap,
                point,
                bigPoint: point,
            });
        };

        this.onResize = () => {
            let { map, bigMap, point, bigPoint } = this.state;
            if (map) {
                map.centerAndZoom(point, 6); // 初始化地图，设置中心点坐标和地图级别
                bigMap.centerAndZoom(bigPoint, 7); // 初始化地图，设置中心点坐标和地图级别
            }
        };
    }

    componentDidMount() {
        let that = this;
        this.init();
        resizeDiv(document.getElementById('biMap'), throttle(that.onResize, 100));
        // window.addEventListener('resize', throttle(this.onResize, 100));
    }

    componentWillUnmount() {
        // window.removeEventListener('resize', throttle(this.onResize, 100));
    }

    render() {
        const { left, top } = this.state;
        return (
            <div className="map-content">
                <div id="biMap"></div>
                <div id="big-map" style={{ left: left + 'px', top: top + 'px' }}></div>
            </div>
        );
    }
}
