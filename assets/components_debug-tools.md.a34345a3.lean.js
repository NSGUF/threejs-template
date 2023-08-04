import{V as D,_ as u,r as y,c as d,b as F,w as i,d as s,a as E,o as m,e as n}from"./app.62f1b0cb.js";const{defineComponent:h}=D,_=h({name:"component-doc",components:{"render-demo-0":function(){const{resolveComponent:a,createVNode:l,openBlock:o,createElementBlock:p}=D,e={style:{height:"600px",width:"900px"}};function c(r,x){const C=a("rack-list");return o(),p("div",e,[l(C)])}return{render:c,...{}}}()}}),b=JSON.parse('{"title":"\u8C03\u8BD5\u7EC4\u4EF6","description":"","frontmatter":{},"headers":[],"relativePath":"components/debug-tools.md","lastUpdated":1691138245000}'),B=s("h1",{id:"\u8C03\u8BD5\u7EC4\u4EF6",tabindex:"-1"},"\u8C03\u8BD5\u7EC4\u4EF6",-1),v=s("blockquote",null,[s("p",null,"\u6548\u679C\u5C55\u793A\u4E3A\u4E0B\u9762demo\u4E2D\uFF0C\u53F3\u4E0A\u89D2\u7684\u7F16\u8F91\u533A\u57DF")],-1),g=s("div",{class:"language-vue"},[s("pre",{"v-pre":"",class:"shiki vp-code-dark"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"<"),s("span",{style:{color:"#7EE787"}},"template"),s("span",{style:{color:"#C9D1D9"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"    <"),s("span",{style:{color:"#7EE787"}},"div"),s("span",{style:{color:"#C9D1D9"}}," "),s("span",{style:{color:"#79C0FF"}},"style"),s("span",{style:{color:"#C9D1D9"}},"="),s("span",{style:{color:"#A5D6FF"}},'"height: 600px;width: 900px;"'),s("span",{style:{color:"#C9D1D9"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"        <"),s("span",{style:{color:"#7EE787"}},"rack-list"),s("span",{style:{color:"#C9D1D9"}}," />")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"    </"),s("span",{style:{color:"#7EE787"}},"div"),s("span",{style:{color:"#C9D1D9"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"</"),s("span",{style:{color:"#7EE787"}},"template"),s("span",{style:{color:"#C9D1D9"}},">")]),n(`
`),s("span",{class:"line"})])]),s("pre",{"v-pre":"",class:"shiki vp-code-light"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"<"),s("span",{style:{color:"#116329"}},"template"),s("span",{style:{color:"#24292F"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"    <"),s("span",{style:{color:"#116329"}},"div"),s("span",{style:{color:"#24292F"}}," "),s("span",{style:{color:"#0550AE"}},"style"),s("span",{style:{color:"#24292F"}},"="),s("span",{style:{color:"#0A3069"}},'"height: 600px;width: 900px;"'),s("span",{style:{color:"#24292F"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"        <"),s("span",{style:{color:"#116329"}},"rack-list"),s("span",{style:{color:"#24292F"}}," />")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"    </"),s("span",{style:{color:"#116329"}},"div"),s("span",{style:{color:"#24292F"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"</"),s("span",{style:{color:"#116329"}},"template"),s("span",{style:{color:"#24292F"}},">")]),n(`
`),s("span",{class:"line"})])])],-1),A=E(`<div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki vp-code-dark"><code><span class="line"></span>
<span class="line"><span style="color:#8B949E;">/**</span></span>
<span class="line"><span style="color:#8B949E;"> * gui\u914D\u7F6E \u7528\u6237\u8C03\u8BD5\u989C\u8272</span></span>
<span class="line"><span style="color:#8B949E;"> * </span><span style="color:#FF7B72;">@param</span><span style="color:#8B949E;"> </span><span style="color:#C9D1D9;">app</span></span>
<span class="line"><span style="color:#8B949E;"> * </span><span style="color:#FF7B72;">@param</span><span style="color:#8B949E;"> </span><span style="color:#C9D1D9;">mesh</span></span>
<span class="line"><span style="color:#8B949E;"> */</span></span>
<span class="line"><span style="color:#FF7B72;">function</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">createGUI</span><span style="color:#C9D1D9;"> (</span><span style="color:#FFA657;">app</span><span style="color:#C9D1D9;">, </span><span style="color:#FFA657;">mesh</span><span style="color:#C9D1D9;">) {</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">if</span><span style="color:#C9D1D9;"> (</span><span style="color:#FF7B72;">!</span><span style="color:#C9D1D9;">isDev) {</span></span>
<span class="line"><span style="color:#C9D1D9;">        </span><span style="color:#FF7B72;">return</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">    }</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">let</span><span style="color:#C9D1D9;"> ambiColor </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;#0c0c0c&#39;</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">let</span><span style="color:#C9D1D9;"> controls </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">        color: ambiColor,</span></span>
<span class="line"><span style="color:#C9D1D9;">        emissive: ambiColor,</span></span>
<span class="line"><span style="color:#C9D1D9;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">    app.gui.</span><span style="color:#D2A8FF;">addColor</span><span style="color:#C9D1D9;">(controls, </span><span style="color:#A5D6FF;">&#39;color&#39;</span><span style="color:#C9D1D9;">).</span><span style="color:#D2A8FF;">onChange</span><span style="color:#C9D1D9;">(</span><span style="color:#FFA657;">e</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=&gt;</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">        mesh.material.color </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.</span><span style="color:#D2A8FF;">Color</span><span style="color:#C9D1D9;">(e);</span></span>
<span class="line"><span style="color:#C9D1D9;">    });</span></span>
<span class="line"><span style="color:#C9D1D9;">    app.gui.</span><span style="color:#D2A8FF;">addColor</span><span style="color:#C9D1D9;">(controls, </span><span style="color:#A5D6FF;">&#39;emissive&#39;</span><span style="color:#C9D1D9;">).</span><span style="color:#D2A8FF;">onChange</span><span style="color:#C9D1D9;">(</span><span style="color:#FFA657;">e</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=&gt;</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">        mesh.material.emissive </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.</span><span style="color:#D2A8FF;">Color</span><span style="color:#C9D1D9;">(e);</span></span>
<span class="line"><span style="color:#C9D1D9;">    });</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"></span>
<span class="line"><span style="color:#6E7781;">/**</span></span>
<span class="line"><span style="color:#6E7781;"> * gui\u914D\u7F6E \u7528\u6237\u8C03\u8BD5\u989C\u8272</span></span>
<span class="line"><span style="color:#6E7781;"> * </span><span style="color:#CF222E;">@param</span><span style="color:#6E7781;"> </span><span style="color:#24292F;">app</span></span>
<span class="line"><span style="color:#6E7781;"> * </span><span style="color:#CF222E;">@param</span><span style="color:#6E7781;"> </span><span style="color:#24292F;">mesh</span></span>
<span class="line"><span style="color:#6E7781;"> */</span></span>
<span class="line"><span style="color:#CF222E;">function</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">createGUI</span><span style="color:#24292F;"> (</span><span style="color:#953800;">app</span><span style="color:#24292F;">, </span><span style="color:#953800;">mesh</span><span style="color:#24292F;">) {</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">if</span><span style="color:#24292F;"> (</span><span style="color:#CF222E;">!</span><span style="color:#24292F;">isDev) {</span></span>
<span class="line"><span style="color:#24292F;">        </span><span style="color:#CF222E;">return</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">    }</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">let</span><span style="color:#24292F;"> ambiColor </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#0A3069;">&#39;#0c0c0c&#39;</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">let</span><span style="color:#24292F;"> controls </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">        color: ambiColor,</span></span>
<span class="line"><span style="color:#24292F;">        emissive: ambiColor,</span></span>
<span class="line"><span style="color:#24292F;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">    app.gui.</span><span style="color:#8250DF;">addColor</span><span style="color:#24292F;">(controls, </span><span style="color:#0A3069;">&#39;color&#39;</span><span style="color:#24292F;">).</span><span style="color:#8250DF;">onChange</span><span style="color:#24292F;">(</span><span style="color:#953800;">e</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=&gt;</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">        mesh.material.color </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.</span><span style="color:#8250DF;">Color</span><span style="color:#24292F;">(e);</span></span>
<span class="line"><span style="color:#24292F;">    });</span></span>
<span class="line"><span style="color:#24292F;">    app.gui.</span><span style="color:#8250DF;">addColor</span><span style="color:#24292F;">(controls, </span><span style="color:#0A3069;">&#39;emissive&#39;</span><span style="color:#24292F;">).</span><span style="color:#8250DF;">onChange</span><span style="color:#24292F;">(</span><span style="color:#953800;">e</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=&gt;</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">        mesh.material.emissive </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.</span><span style="color:#8250DF;">Color</span><span style="color:#24292F;">(e);</span></span>
<span class="line"><span style="color:#24292F;">    });</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"></span></code></pre></div>`,1);function k(a,l,o,p,e,c){const t=y("render-demo-0"),r=y("demo");return m(),d("div",null,[B,v,F(r,{customClass:"undefined",sourceCode:`<template>
    <div style="height: 600px;width: 900px;">
        <rack-list />
    </div>
</template>
`},{highlight:i(()=>[g]),default:i(()=>[F(t)]),_:1}),A])}const w=u(_,[["render",k]]);export{b as __pageData,w as default};
