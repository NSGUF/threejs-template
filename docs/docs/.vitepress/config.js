import { defineConfig } from 'vitepress';
import { demoBlockPlugin } from 'vitepress-theme-demoblock';
import nav from './configs/nav';
import sidebar from './configs/sidebar';

export default defineConfig({
    // lang: 'en-US',
    title: '3D 文档',
    description: '基于 ThreeJS 的3D文档',
    lastUpdated: true,
    cleanUrls: 'without-subfolders',
    base: process.env.BASE || '/',
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
    ],

    markdown: {
        headers: {
            level: [0, 0]
        },

        // options for markdown-it-anchor
        anchor: { permalink: false },

        // options for markdown-it-toc
        toc: { includeLevel: [1, 2] },

        // light: #f9fafb, dark: --vp-code-block-bg
        theme: { light: 'github-light', dark: 'github-dark' },

        config: (md) => {
            md.use(demoBlockPlugin, {
                cssPreprocessor: 'less'
            });
        }
    },

    themeConfig: {
        outlineTitle: '本页目录',
        lastUpdatedText: '上次更新',
        logo: '/logo.svg',

        // algolia: {
        //     appId: 'X51HWTCQJJ',
        //     apiKey: 'ca20f15eb8a667898b65d13f4213ae3d',
        //     indexName: 'three-demo'
        // },

        // nav
        nav,

        // sidebar
        sidebar,

        editLink: {
            pattern: 'http://mq.code.sangfor.org/14716/three-demo/edit/master/docs/docs/:path',
            text: '在 GitLab 上编辑此页'
        },

        socialLinks: [
            { icon: 'github', link: 'http://mq.code.sangfor.org/14716/three-demo' }
        ],
        docFooter: {
            prev: '上一章',
            next: '下一章'
        },
        footer: {
            copyright: 'Copyright © 2022-present NSGUF'
        }
    }
});
