import SelectChart from '../pages/board/SelectChart';
import Board from '../pages/board/Board';
import Release from '../pages/board/Release';

export default {
    menus: [
        { key: '/addChart', title: '添加图表', icon: 'mobile', component: SelectChart },
        { key: '/addBoard', title: '添加仪表盘', icon: 'mobile', component: Board },
        { key: '/release', title: '发布链接', icon: 'mobile', component: Release },
    ],
};
