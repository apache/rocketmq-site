import React from 'react'

export const features = [{
    title: '订阅邮件组，参与社区的讨论',
    description: (
        <>
            
        </>
    ),
    
}, {
    title: 'GitHub 上协作，期待您的加入',
    description: (
        <> </>
    ),
},
{
    title: '关注技术博客，参与线上下活动',
    description: (
        <> </>
    ),
}]

export const logos = [{
/**
 * Page 1
 */
    img: 'xmly.jpeg',
    alt: '喜马拉雅',
    url: ''
}, {
    img: 'xhs.png',
    alt: '小红书',
    url: 'https://netflix.com/'
}, {
    img: 'xiaomi.png',
    alt: '小米',
    url: 'https://www.microsoft.com/'
}, {
    img: 'dingding.jpeg',
    alt: '钉钉',
    url: 'https://www.mozilla.org/'
}, {
    img: 'douyin.png',
    alt: 'Buoyant',
    url: 'https://buoyant.io/'
}, {
    img: 'guangda.png',
    alt: 'SAP',
    url: 'https://www.sap.com/'
},
/**
 * Page 2
 */
{
    img: 'tongcheng.jpeg',
    alt: 'Hilton',
    url: 'https://www.hilton.com/'
}, {
    img: 'huawei.jpeg',
    alt: 'Charles Schwab',
    url: 'https://www.schwab.com/'
}, {
    img: 'shansong.png',
    alt: 'JW Player',
    url: 'https://www.jwplayer.com/'
}, {
    img: 'bbva.png',
    alt: 'BBVA',
    url: 'https://www.bbva.com/'
}, {
    img: 'gopro.png',
    alt: 'GoPro',
    url: 'https://gopro.com/'
}, {
    img: 'algolia.png',
    alt: 'Algolia',
    url: 'https://www.algolia.com/'
},
/**
 * Page 3
 */

/**
 * Page 4
 */
]

export const LHIntregrationExample = `
await browser.emulateDevice('iPhone X')
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cacheEnabled: true,
    formFactor: 'mobile'
})

// open application under test
await browser.url('https://localhost:3000')

expect(await browser.getMetrics().firstMeaningfulPaint)
    .toBeBelow(2500)

const pwaCheckResult = await browser.checkPWA()
expect(pwaCheckResult.passed).toBe(true)
`

export const SetupExample = `
$ npm install --save-dev @wdio/cli
$ npx wdio config --yes
$ npx wdio run
`

export const ReactIntegration = `
await browser.url('https://ahfarmer.github.io/calculator/');
const appWrapper = await browser.$('div#root')

await browser.react$('t', {
    props: { name: '7' }
}).click()
await browser.react$('t', {
    props: { name: 'x' }
}).click()
await browser.react$('t', {
    props: { name: '6' }
}).click()
await browser.react$('t', {
    props: { name: '=' }
}).click()

// prints "42"
console.log(await $('.component-display').getText());`
