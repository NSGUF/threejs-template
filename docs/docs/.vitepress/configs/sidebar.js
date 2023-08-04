export default {
    '/fqa/': getFqaSidebar(),
    '/specification/': getSpecificationSidebar(),
    '/performance/': getPerformanceSidebar(),
    '/components/': getComponentsSidebar(),
    '/action/': getActionSidebar()
};

function getSpecificationSidebar () {
    return [
        {
            text: '规范',
            aside: false,
            items: [
                {
                    text: '规范',
                    link: '/specification/'
                }
            ]
        }
    ];
}

function getFqaSidebar () {
    return [
        {
            text: '常见问题',
            items: [
                {
                    text: '功能失效',
                    link: '/fqa/unwork'
                },
                {
                    text: '控制台报错',
                    link: '/fqa/error'
                },
                {
                    text: 'API被移除',
                    link: '/fqa/removed'
                }
            ]
        }
    ];
}

function getPerformanceSidebar () {
    return [
        {
            text: '性能',
            items: [
                {
                    text: '待添加',
                    link: '/performance/'
                }
            ]
        }
    ];
}

function getComponentsSidebar () {
    return [
        {
            text: '常见效果',
            items: [
                {
                    text: '呼吸灯',
                    link: '/components/bulb'
                },
                {
                    text: '随机生成多个呼吸灯',
                    link: '/components/more-bulb'
                },
                {
                    text: '机柜',
                    link: '/components/rack'
                },
                {
                    text: '门',
                    link: '/components/door'
                },
                {
                    text: '渐变平面',
                    link: '/components/gradient-plane'
                },
                {
                    text: 'lottie',
                    link: '/components/lottie'
                },
                {
                    text: '服务器支架',
                    link: '/components/bracket'
                },
                {
                    text: '调试组件（颜色，长度之类的封装）',
                    link: '/components/debug-tools'
                },
                {
                    text: '空心长方平面',
                    link: '/components/hollow-plane'
                },
                {
                    text: '地图',
                    link: '/components/map'
                }
            ]
        }
    ];
}

function getActionSidebar () {
    return [
        {
            text: '常见动作',
            items: [
                {
                    text: '旋转',
                    link: '/action/rotate'
                },
                {
                    text: '获取对应位置的3D对象',
                    link: '/action/click'
                },
                {
                    text: '获取物体的屏幕位置',
                    link: '/action/position'
                }
            ]
        }
    ];
}
