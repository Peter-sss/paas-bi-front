import qianKunStart from './appRegister'

const getAppConfigs = () => {
  const microList = [
    {
      name: 'Calculate',
      entry: process.env.VUE_APP_QINKUN_CALCULATE_ACTIVE_URL,
      container: '#micro-container',
      activeRule: ['/secs', '/sbms', '/sebs', '/vpc', '/vpn', '/seip'],
      props: {
        userInfo: {
          name: 'haha'
        }
      }
    },
  ]
  qianKunStart(microList)
}
const microAppStart = () => {
  getAppConfigs()
}

export default microAppStart
