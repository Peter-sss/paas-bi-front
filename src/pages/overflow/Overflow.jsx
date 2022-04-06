import React, {useState, useEffect} from 'react';
export default function Overflow () {
  const [num, setNum] = useState(0)
  useEffect(() => {
    console.log('已经初始化了hook', num);
  }, [num])
  return <div className="address-book">Overflow {num}</div>
}
