import React from 'react';
import Board from './Board';
export default class Release extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let proportion = JSON.parse(localStorage.getItem('biBoardProportion'));
        return (
            <div className="bi-release">
                <div
                    className="bi-release-content"
                    style={{ height: proportion ? (9 / 16) * 100 + 'vw' : '100%' }}
                >
                    <Board release={true}></Board>
                </div>
            </div>
        );
    }
}
