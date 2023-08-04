import{_ as s,c as n,o as a,a as p}from"./app.62f1b0cb.js";const d=JSON.parse('{"title":"\u89C4\u8303","description":"","frontmatter":{},"headers":[],"relativePath":"specification/index.md","lastUpdated":1691138245000}'),l={name:"specification/index.md"},o=p(`<h1 id="\u89C4\u8303" tabindex="-1">\u89C4\u8303</h1><h2 id="\u9632\u6B62\u5185\u5B58\u6CC4\u6F0F" tabindex="-1">\u9632\u6B62\u5185\u5B58\u6CC4\u6F0F</h2><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#8B949E;">// 1. \u6E05\u7A7A\u573A\u666F</span></span>
<span class="line"><span style="color:#C9D1D9;">app.scene?.</span><span style="color:#D2A8FF;">traverse</span><span style="color:#C9D1D9;">((</span><span style="color:#FFA657;">child</span><span style="color:#C9D1D9;">) </span><span style="color:#FF7B72;">=&gt;</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">if</span><span style="color:#C9D1D9;"> (child.material) {</span></span>
<span class="line"><span style="color:#C9D1D9;">        child.material.</span><span style="color:#D2A8FF;">dispose</span><span style="color:#C9D1D9;">();</span></span>
<span class="line"><span style="color:#C9D1D9;">    }</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">if</span><span style="color:#C9D1D9;"> (child.geometry) {</span></span>
<span class="line"><span style="color:#C9D1D9;">        child.geometry.</span><span style="color:#D2A8FF;">dispose</span><span style="color:#C9D1D9;">();</span></span>
<span class="line"><span style="color:#C9D1D9;">    }</span></span>
<span class="line"><span style="color:#C9D1D9;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">app.renderer.</span><span style="color:#D2A8FF;">forceContextLoss</span><span style="color:#C9D1D9;">();</span></span>
<span class="line"><span style="color:#C9D1D9;">app.renderer.</span><span style="color:#D2A8FF;">dispose</span><span style="color:#C9D1D9;">();</span></span>
<span class="line"><span style="color:#C9D1D9;">app.scene.</span><span style="color:#D2A8FF;">clear</span><span style="color:#C9D1D9;">();</span></span>
<span class="line"><span style="color:#C9D1D9;">app.scene </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">null</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">app.camera </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">null</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">app.controls </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">null</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">app.renderer.domElement </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">null</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">app.renderer </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">null</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8B949E;">// 2. \u6E05\u7406\u6240\u6709\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#8B949E;">// 3. \u6E05\u7406\u6240\u6709\u5B9A\u65F6\u5668</span></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"><span style="color:#6E7781;">// 1. \u6E05\u7A7A\u573A\u666F</span></span>
<span class="line"><span style="color:#24292F;">app.scene?.</span><span style="color:#8250DF;">traverse</span><span style="color:#24292F;">((</span><span style="color:#953800;">child</span><span style="color:#24292F;">) </span><span style="color:#CF222E;">=&gt;</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">if</span><span style="color:#24292F;"> (child.material) {</span></span>
<span class="line"><span style="color:#24292F;">        child.material.</span><span style="color:#8250DF;">dispose</span><span style="color:#24292F;">();</span></span>
<span class="line"><span style="color:#24292F;">    }</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">if</span><span style="color:#24292F;"> (child.geometry) {</span></span>
<span class="line"><span style="color:#24292F;">        child.geometry.</span><span style="color:#8250DF;">dispose</span><span style="color:#24292F;">();</span></span>
<span class="line"><span style="color:#24292F;">    }</span></span>
<span class="line"><span style="color:#24292F;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">app.renderer.</span><span style="color:#8250DF;">forceContextLoss</span><span style="color:#24292F;">();</span></span>
<span class="line"><span style="color:#24292F;">app.renderer.</span><span style="color:#8250DF;">dispose</span><span style="color:#24292F;">();</span></span>
<span class="line"><span style="color:#24292F;">app.scene.</span><span style="color:#8250DF;">clear</span><span style="color:#24292F;">();</span></span>
<span class="line"><span style="color:#24292F;">app.scene </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">null</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">app.camera </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">null</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">app.controls </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">null</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">app.renderer.domElement </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">null</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">app.renderer </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">null</span><span style="color:#24292F;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6E7781;">// 2. \u6E05\u7406\u6240\u6709\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#6E7781;">// 3. \u6E05\u7406\u6240\u6709\u5B9A\u65F6\u5668</span></span>
<span class="line"></span></code></pre></div><h2 id="\u5927\u5C0F\u5C4F\u5E55" tabindex="-1">\u5927\u5C0F\u5C4F\u5E55</h2><p>\u76F4\u63A5\u8BBE\u7F6Eresize\u4E8B\u4EF6\uFF0C\u5E76\u4E14\u5728\u91CC\u9762\u6839\u636E\u4E0D\u540C\u5C4F\u5E55\u7684\u8981\u6C42\uFF0C\u8BBE\u7F6E\u4E0D\u540C\u7684\u5BBD\u5EA6\u5373\u53EF</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#8B949E;">/**</span></span>
<span class="line"><span style="color:#8B949E;"> * \u83B7\u53D6\u6574\u4E2Acanvas\u7684\u5927\u5C0F</span></span>
<span class="line"><span style="color:#8B949E;"> * </span><span style="color:#FF7B72;">@return</span><span style="color:#8B949E;"> </span><span style="color:#FFA657;">{{width: number, height: number}}</span></span>
<span class="line"><span style="color:#8B949E;"> */</span></span>
<span class="line"><span style="color:#FF7B72;">function</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">getWH</span><span style="color:#C9D1D9;"> () {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#8B949E;">// \u5C0F\u5C4F\u7684\u7F29\u5C0F\u6BD4\u4F8B</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">SMALL_PROPORTION</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">0.8</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">return</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">isSmallScreen</span><span style="color:#C9D1D9;">() </span><span style="color:#FF7B72;">?</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">        width: w </span><span style="color:#FF7B72;">*</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">SMALL_PROPORTION</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">        height: h </span><span style="color:#FF7B72;">*</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">SMALL_PROPORTION</span></span>
<span class="line"><span style="color:#C9D1D9;">    } </span><span style="color:#FF7B72;">:</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">        width: w,</span></span>
<span class="line"><span style="color:#C9D1D9;">        height: h</span></span>
<span class="line"><span style="color:#C9D1D9;">    };</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> { </span><span style="color:#79C0FF;">width</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">height</span><span style="color:#C9D1D9;"> } </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">getWH</span><span style="color:#C9D1D9;">();</span></span>
<span class="line"><span style="color:#C9D1D9;">renderer.</span><span style="color:#D2A8FF;">setSize</span><span style="color:#C9D1D9;">(width, height);</span></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"><span style="color:#6E7781;">/**</span></span>
<span class="line"><span style="color:#6E7781;"> * \u83B7\u53D6\u6574\u4E2Acanvas\u7684\u5927\u5C0F</span></span>
<span class="line"><span style="color:#6E7781;"> * </span><span style="color:#CF222E;">@return</span><span style="color:#6E7781;"> </span><span style="color:#953800;">{{width: number, height: number}}</span></span>
<span class="line"><span style="color:#6E7781;"> */</span></span>
<span class="line"><span style="color:#CF222E;">function</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">getWH</span><span style="color:#24292F;"> () {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#6E7781;">// \u5C0F\u5C4F\u7684\u7F29\u5C0F\u6BD4\u4F8B</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">SMALL_PROPORTION</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">0.8</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">return</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">isSmallScreen</span><span style="color:#24292F;">() </span><span style="color:#CF222E;">?</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">        width: w </span><span style="color:#CF222E;">*</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">SMALL_PROPORTION</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">        height: h </span><span style="color:#CF222E;">*</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">SMALL_PROPORTION</span></span>
<span class="line"><span style="color:#24292F;">    } </span><span style="color:#CF222E;">:</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">        width: w,</span></span>
<span class="line"><span style="color:#24292F;">        height: h</span></span>
<span class="line"><span style="color:#24292F;">    };</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"><span style="color:#CF222E;">const</span><span style="color:#24292F;"> { </span><span style="color:#0550AE;">width</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">height</span><span style="color:#24292F;"> } </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">getWH</span><span style="color:#24292F;">();</span></span>
<span class="line"><span style="color:#24292F;">renderer.</span><span style="color:#8250DF;">setSize</span><span style="color:#24292F;">(width, height);</span></span>
<span class="line"></span></code></pre></div>`,6),e=[o];function c(t,r,y,i,F,D){return a(),n("div",null,e)}const h=s(l,[["render",c]]);export{d as __pageData,h as default};
