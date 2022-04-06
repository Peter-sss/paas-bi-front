import Loadable from 'react-loadable';
import Loading from '../components/widget/Loading';
import Overflow from '../pages/overflow/Overflow';
import Cssmodule from '../components/cssmodule';
import SelectChart from '../pages/board/SelectChart';
import Board from '../pages/board/Board';

const WysiwygBundle = Loadable({
  // 按需加载富文本配置
  loader: () => import('../components/ui/Wysiwyg'),
  loading: Loading,
});


export default {
  menus: [
    // 菜单相关路由
    { key: '/dashboard', title: '首页', icon: 'mobile', component: Overflow },
    {
      key: '/ui',
      title: 'UI',
      icon: 'scan',
      subs: [
        { key: '/ui/wysiwyg', title: '富文本', component: WysiwygBundle },
      ],
    },
    {
      key: '/cssModule',
      title: 'cssModule',
      icon: 'star',
      component: Cssmodule,
    },
    { key: '/haha', title: '哈哈', icon: 'mobile', component: Overflow },
    { key: '/addChart', title: '添加图表', icon: 'mobile', component: SelectChart },
    { key: '/addBoard', title: '添加仪表盘', icon: 'mobile', component: Board },
  ],
  others: [{ key: '/hehe', title: '呵呵', icon: 'mobile', component: Overflow }], // 非菜单相关路由
};
