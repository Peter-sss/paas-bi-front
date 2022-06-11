import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';
import { resizeDiv, throttle } from '../../utils';

export default function BaseChart(props) {
    const [myChart, setMyChart] = useState(null);
    const charRef = useRef(null);
    const { option } = props;
    const onResize = useCallback(() => {
        myChart.resize();
    }, [myChart]);
    useEffect(() => {
        if (!myChart) {
            setMyChart(echarts.init(charRef.current));
        } else {
            myChart.setOption(option, true);
            myChart.resize();
        }
    }, [myChart, option]);
    useEffect(() => {
        if (!myChart) {
            return;
        }
        // window.addEventListener('resize', throttle(onResize, 100));
        resizeDiv(charRef.current, throttle(onResize, 100));
        return () => {
            // window.removeEventListener('resize', throttle(onResize, 100))
        };
    }, [myChart, onResize]);
    return <div ref={charRef} style={{ height: '100%' }} />;
}
