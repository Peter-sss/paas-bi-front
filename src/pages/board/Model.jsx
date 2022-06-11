import React from 'react';
import './index.less';
export default class BiModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <iframe
                id="iframe"
                src="http://180.168.170.198:8040/e/model-share/62a1e1ae9ed6cb6641668672"
            />
        );
    }
}
