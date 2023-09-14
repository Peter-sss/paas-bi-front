import { registerMicroApps, start } from 'qiankun'

const qianKunStart = (list) => {
  registerMicroApps(list, {
    beforeLoad: [app=> {console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)}],
    beforeMount: [app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
    }
    ],
    afterUnmount: [app=> {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
      // resetRouter();
    }
    ]
  })
  start({
    prefetch: true,
    singular: true
  })
}

export default qianKunStart
