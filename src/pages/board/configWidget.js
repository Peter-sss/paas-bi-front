import React, { useState } from 'react';
import { Input, Popover, InputNumber  } from 'antd';
import {colorGroup} from './config'

// input组件(如标题)
export  function InputEle ({title, value, onChange}) {
  return <div className="panel-item">
    <div className="title">{title}</div>
    <Input placeholder={`请输入${title}`} className='item-input' value={value} onChange={onChange}/>
  </div>
}

// 颜色设置组件(唯一)
export function ColorEle ({value, onChange}) {
  const [visible, setVisible] = useState(false)
  const groupPick = () => colorGroup.map((cg, i) => (
    <ul key={i} onClick={() => {onChange && onChange(cg); setVisible(false)}}>
      {cg.map((c) => <li style={{ backgroundColor: c }} key={c}/>)}
    </ul>
  ));
  return (
    <div className="panel-item color-group">
      <div className="title">颜色</div>
      <Popover trigger={'click'}
        visible={visible}
        placement="bottom"
        content={groupPick()}
        onVisibleChange={(bool) => setVisible(bool)}
        getPopupContainer={() => document.getElementsByClassName('color-group')[0]}>
        <ul className="box">
          {
            (value || colorGroup[0]).map((v) => <li style={{ backgroundColor: v }} key={v} />)
          }
        </ul>
      </Popover>
    </div>
  );
}

// inputNumber组件(如柱宽)
export  function InputNumberEle ({title, value, onChange, expandProps = {}}) {
  return <div className="panel-item">
    <div className="title">{title}</div>
    <InputNumber
      value={parseFloat(value)}
      onChange={(num) => {if (typeof (num) === 'number') {onChange(num)}}}
      {...expandProps} />
  </div>
}

