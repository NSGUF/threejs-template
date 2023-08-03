
let isDev = process.env.npm_lifecycle_event === 'docs:dev';
export default [
    { text: '常见效果', link: '/components/bulb', activeMatch: '^/components/' },
    { text: '常见动作', link: '/action/rotate', activeMatch: '^/action/' },
    { text: '模板页面', link: isDev ? '/template/' : '/template/index-pro' },
    { text: '规范和资料', link: '/specification/' },
    { text: '常见问题', link: '/fqa/unwork', activeMatch: '^/fqa/' },
    { text: '性能', link: '/performance/' }
];

