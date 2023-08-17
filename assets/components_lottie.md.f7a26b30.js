import{V as i,_ as u,r as y,c as E,b as F,w as D,d as s,a as d,o as m,e as n}from"./app.2a831956.js";const{defineComponent:B}=i,A=B({name:"component-doc",components:{"render-demo-0":function(){const{resolveComponent:a,createVNode:l,openBlock:p,createElementBlock:o}=i,e={style:{height:"600px",width:"680px"}};function t(r,R){const C=a("rack");return p(),o("div",e,[l(C)])}return{render:t,...{}}}()}}),f=JSON.parse('{"title":"lottie","description":"","frontmatter":{},"headers":[],"relativePath":"components/lottie.md","lastUpdated":1692236508000}'),_=s("h1",{id:"lottie",tabindex:"-1"},"lottie",-1),h=s("blockquote",null,[s("p",null,"\u6548\u679C\u5C55\u793A\u4E3A\u4E0B\u9762demo\u4E2D\uFF0C\u670D\u52A1\u5668\u5E95\u90E8\u8F6C\u52A8")],-1),g=s("div",{class:"language-vue"},[s("pre",{"v-pre":"",class:"shiki vp-code-dark"},[s("code",null,[s("span",{class:"line"}),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"<"),s("span",{style:{color:"#7EE787"}},"template"),s("span",{style:{color:"#C9D1D9"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"    <"),s("span",{style:{color:"#7EE787"}},"div"),s("span",{style:{color:"#C9D1D9"}}," "),s("span",{style:{color:"#79C0FF"}},"style"),s("span",{style:{color:"#C9D1D9"}},"="),s("span",{style:{color:"#A5D6FF"}},'"height: 600px;width: 680px;"'),s("span",{style:{color:"#C9D1D9"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"        <"),s("span",{style:{color:"#7EE787"}},"rack"),s("span",{style:{color:"#C9D1D9"}}," />")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"    </"),s("span",{style:{color:"#7EE787"}},"div"),s("span",{style:{color:"#C9D1D9"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"</"),s("span",{style:{color:"#7EE787"}},"template"),s("span",{style:{color:"#C9D1D9"}},">")]),n(`
`),s("span",{class:"line"})])]),s("pre",{"v-pre":"",class:"shiki vp-code-light"},[s("code",null,[s("span",{class:"line"}),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"<"),s("span",{style:{color:"#116329"}},"template"),s("span",{style:{color:"#24292F"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"    <"),s("span",{style:{color:"#116329"}},"div"),s("span",{style:{color:"#24292F"}}," "),s("span",{style:{color:"#0550AE"}},"style"),s("span",{style:{color:"#24292F"}},"="),s("span",{style:{color:"#0A3069"}},'"height: 600px;width: 680px;"'),s("span",{style:{color:"#24292F"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"        <"),s("span",{style:{color:"#116329"}},"rack"),s("span",{style:{color:"#24292F"}}," />")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"    </"),s("span",{style:{color:"#116329"}},"div"),s("span",{style:{color:"#24292F"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"</"),s("span",{style:{color:"#116329"}},"template"),s("span",{style:{color:"#24292F"}},">")]),n(`
`),s("span",{class:"line"})])])],-1),k=d(`<div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki vp-code-dark"><code><span class="line"></span>
<span class="line"><span style="color:#8B949E;">// \u6DFB\u52A0url\u540E\u7F00\u662F\u83B7\u53D6url\u5730\u5740\u7684\u610F\u601D</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> Round </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;./img/round.json?url&#39;</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8B949E;">/**</span></span>
<span class="line"><span style="color:#8B949E;"> * \u5E95\u90E8\u5706\u5708</span></span>
<span class="line"><span style="color:#8B949E;"> * </span><span style="color:#FF7B72;">@return</span><span style="color:#8B949E;"> </span><span style="color:#FFA657;">{{animate: animate}}</span><span style="color:#8B949E;"> \u5F53\u524D\u7269\u4F53\u9700\u8981\u5168\u5C40\u5904\u7406\u7684\u52A8\u753B</span></span>
<span class="line"><span style="color:#8B949E;"> */</span></span>
<span class="line"><span style="color:#FF7B72;">function</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">createRound</span><span style="color:#C9D1D9;"> () {</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">let</span><span style="color:#C9D1D9;"> backPlane;</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">let</span><span style="color:#C9D1D9;"> group </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.</span><span style="color:#D2A8FF;">Group</span><span style="color:#C9D1D9;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#8B949E;">// three\u4F7F\u7528lottie\u7684\u8981\u6C42</span></span>
<span class="line"><span style="color:#C9D1D9;">    window.bodymovin </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> lottie;</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">LottieLoader</span><span style="color:#C9D1D9;">().</span><span style="color:#D2A8FF;">load</span><span style="color:#C9D1D9;">(Round, </span><span style="color:#FFA657;">texture</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=&gt;</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">        texture.animation.</span><span style="color:#D2A8FF;">play</span><span style="color:#C9D1D9;">();</span></span>
<span class="line"><span style="color:#C9D1D9;">        </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">geometry</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.</span><span style="color:#D2A8FF;">CircleGeometry</span><span style="color:#C9D1D9;">(</span><span style="color:#79C0FF;">110</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">110</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">1</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">50</span><span style="color:#C9D1D9;">);</span></span>
<span class="line"><span style="color:#C9D1D9;">        </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">material</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.</span><span style="color:#D2A8FF;">MeshStandardMaterial</span><span style="color:#C9D1D9;">({</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">            </span><span style="color:#8B949E;">// transparent\u8BBE\u7F6E\u4E3Atrue\uFF0C\u5F00\u542F\u900F\u660E\uFF0C\u5426\u5219opacity\u4E0D\u8D77\u4F5C\u7528</span></span>
<span class="line"><span style="color:#C9D1D9;">            transparent: </span><span style="color:#79C0FF;">true</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">            opacity: </span><span style="color:#79C0FF;">0.45</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">            color: </span><span style="color:#79C0FF;">THREE_JS_COLOR</span><span style="color:#C9D1D9;">.</span><span style="color:#79C0FF;">ROUND</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">            emissive: </span><span style="color:#79C0FF;">THREE_JS_COLOR</span><span style="color:#C9D1D9;">.</span><span style="color:#79C0FF;">ROUND</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">            depthWrite: </span><span style="color:#79C0FF;">false</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">            map: texture</span></span>
<span class="line"><span style="color:#C9D1D9;">        });</span></span>
<span class="line"><span style="color:#C9D1D9;">        backPlane </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.</span><span style="color:#D2A8FF;">Mesh</span><span style="color:#C9D1D9;">(geometry, material);</span></span>
<span class="line"><span style="color:#C9D1D9;">        geometry.</span><span style="color:#D2A8FF;">rotateX</span><span style="color:#C9D1D9;">(</span><span style="color:#FF7B72;">-</span><span style="color:#C9D1D9;">Math.</span><span style="color:#79C0FF;">PI</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">/</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">2</span><span style="color:#C9D1D9;">);</span></span>
<span class="line"><span style="color:#C9D1D9;">        group.</span><span style="color:#D2A8FF;">add</span><span style="color:#C9D1D9;">(backPlane);</span></span>
<span class="line"><span style="color:#C9D1D9;">        app.scene.</span><span style="color:#D2A8FF;">add</span><span style="color:#C9D1D9;">(group);</span></span>
<span class="line"><span style="color:#C9D1D9;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">function</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">animate</span><span style="color:#C9D1D9;"> () {</span></span>
<span class="line"><span style="color:#C9D1D9;">        </span><span style="color:#FF7B72;">if</span><span style="color:#C9D1D9;"> (backPlane) {</span></span>
<span class="line"><span style="color:#C9D1D9;">            backPlane.rotation.y </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">-new</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">Date</span><span style="color:#C9D1D9;">() </span><span style="color:#FF7B72;">*</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">0.0003</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">        }</span></span>
<span class="line"><span style="color:#C9D1D9;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">return</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">        animate</span></span>
<span class="line"><span style="color:#C9D1D9;">    };</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"></span>
<span class="line"><span style="color:#6E7781;">// \u6DFB\u52A0url\u540E\u7F00\u662F\u83B7\u53D6url\u5730\u5740\u7684\u610F\u601D</span></span>
<span class="line"><span style="color:#CF222E;">import</span><span style="color:#24292F;"> Round </span><span style="color:#CF222E;">from</span><span style="color:#24292F;"> </span><span style="color:#0A3069;">&#39;./img/round.json?url&#39;</span><span style="color:#24292F;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6E7781;">/**</span></span>
<span class="line"><span style="color:#6E7781;"> * \u5E95\u90E8\u5706\u5708</span></span>
<span class="line"><span style="color:#6E7781;"> * </span><span style="color:#CF222E;">@return</span><span style="color:#6E7781;"> </span><span style="color:#953800;">{{animate: animate}}</span><span style="color:#6E7781;"> \u5F53\u524D\u7269\u4F53\u9700\u8981\u5168\u5C40\u5904\u7406\u7684\u52A8\u753B</span></span>
<span class="line"><span style="color:#6E7781;"> */</span></span>
<span class="line"><span style="color:#CF222E;">function</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">createRound</span><span style="color:#24292F;"> () {</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">let</span><span style="color:#24292F;"> backPlane;</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">let</span><span style="color:#24292F;"> group </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.</span><span style="color:#8250DF;">Group</span><span style="color:#24292F;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#6E7781;">// three\u4F7F\u7528lottie\u7684\u8981\u6C42</span></span>
<span class="line"><span style="color:#24292F;">    window.bodymovin </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> lottie;</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">LottieLoader</span><span style="color:#24292F;">().</span><span style="color:#8250DF;">load</span><span style="color:#24292F;">(Round, </span><span style="color:#953800;">texture</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=&gt;</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">        texture.animation.</span><span style="color:#8250DF;">play</span><span style="color:#24292F;">();</span></span>
<span class="line"><span style="color:#24292F;">        </span><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">geometry</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.</span><span style="color:#8250DF;">CircleGeometry</span><span style="color:#24292F;">(</span><span style="color:#0550AE;">110</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">110</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">1</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">50</span><span style="color:#24292F;">);</span></span>
<span class="line"><span style="color:#24292F;">        </span><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">material</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.</span><span style="color:#8250DF;">MeshStandardMaterial</span><span style="color:#24292F;">({</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">            </span><span style="color:#6E7781;">// transparent\u8BBE\u7F6E\u4E3Atrue\uFF0C\u5F00\u542F\u900F\u660E\uFF0C\u5426\u5219opacity\u4E0D\u8D77\u4F5C\u7528</span></span>
<span class="line"><span style="color:#24292F;">            transparent: </span><span style="color:#0550AE;">true</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">            opacity: </span><span style="color:#0550AE;">0.45</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">            color: </span><span style="color:#0550AE;">THREE_JS_COLOR</span><span style="color:#24292F;">.</span><span style="color:#0550AE;">ROUND</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">            emissive: </span><span style="color:#0550AE;">THREE_JS_COLOR</span><span style="color:#24292F;">.</span><span style="color:#0550AE;">ROUND</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">            depthWrite: </span><span style="color:#0550AE;">false</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">            map: texture</span></span>
<span class="line"><span style="color:#24292F;">        });</span></span>
<span class="line"><span style="color:#24292F;">        backPlane </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.</span><span style="color:#8250DF;">Mesh</span><span style="color:#24292F;">(geometry, material);</span></span>
<span class="line"><span style="color:#24292F;">        geometry.</span><span style="color:#8250DF;">rotateX</span><span style="color:#24292F;">(</span><span style="color:#CF222E;">-</span><span style="color:#24292F;">Math.</span><span style="color:#0550AE;">PI</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">/</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">2</span><span style="color:#24292F;">);</span></span>
<span class="line"><span style="color:#24292F;">        group.</span><span style="color:#8250DF;">add</span><span style="color:#24292F;">(backPlane);</span></span>
<span class="line"><span style="color:#24292F;">        app.scene.</span><span style="color:#8250DF;">add</span><span style="color:#24292F;">(group);</span></span>
<span class="line"><span style="color:#24292F;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">function</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">animate</span><span style="color:#24292F;"> () {</span></span>
<span class="line"><span style="color:#24292F;">        </span><span style="color:#CF222E;">if</span><span style="color:#24292F;"> (backPlane) {</span></span>
<span class="line"><span style="color:#24292F;">            backPlane.rotation.y </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">-new</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">Date</span><span style="color:#24292F;">() </span><span style="color:#CF222E;">*</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">0.0003</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">        }</span></span>
<span class="line"><span style="color:#24292F;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">return</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">        animate</span></span>
<span class="line"><span style="color:#24292F;">    };</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"></span></code></pre></div>`,1);function v(a,l,p,o,e,t){const c=y("render-demo-0"),r=y("demo");return m(),E("div",null,[_,h,F(r,{customClass:"undefined",sourceCode:`
<template>
    <div style="height: 600px;width: 680px;">
        <rack />
    </div>
</template>
`},{highlight:D(()=>[g]),default:D(()=>[F(c)]),_:1}),k])}const w=u(A,[["render",v]]);export{f as __pageData,w as default};
