/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import Cssmodule from './cssmodule';

const WysiwygBundle = Loadable({
  // 按需加载富文本配置
  loader: () => import('./ui/Wysiwyg'),
  loading: Loading,
});

export default {
  WysiwygBundle,
  Cssmodule,
};
