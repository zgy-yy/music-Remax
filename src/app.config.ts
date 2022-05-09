import {AppConfig} from "remax/wechat";

const config: AppConfig = {
    pages: ['pages/index/index', 'pages/temp/index', 'pages/playlist_detail/index'],
    requiredBackgroundModes: ['audio'],
    window: {
        navigationBarTitleText: ' Wechat',
    },
    // tabBar: {
    //     color: 'red',
    //     selectedColor: 'green',
    //     backgroundColor: '#fff',
    //     list: [{
    //         pagePath: 'pages/index/index',
    //         text: '首页'
    //     },
    //         {
    //             pagePath: 'pages/temp/index',
    //             text: 'temp'
    //         }]
    // }
};

export default config;
