import{V as C,_ as E,r as y,c as u,b as F,w as D,d as s,a as A,o as d,e as n}from"./app.2a831956.js";const{defineComponent:B}=C,m=B({name:"component-doc",components:{"render-demo-0":function(){const{resolveComponent:a,createVNode:l,openBlock:o,createElementBlock:p}=C,e={style:{height:"600px",width:"900px"}};function t(r,b){const i=a("rack-list");return o(),p("div",e,[l(i)])}return{render:t,...{}}}()}}),R=JSON.parse('{"title":"\u6E10\u53D8\u5E73\u9762","description":"","frontmatter":{},"headers":[],"relativePath":"components/gradient-plane.md","lastUpdated":1692236508000}'),h=s("h1",{id:"\u6E10\u53D8\u5E73\u9762",tabindex:"-1"},"\u6E10\u53D8\u5E73\u9762",-1),g=s("blockquote",null,[s("p",null,"\u6548\u679C\u5C55\u793A\u4E3A\u4E0B\u9762demo\u4E2D\uFF0C\u670D\u52A1\u5668\u6700\u524D\u9762\u6E10\u53D8\u7684\u706F\uFF1B")],-1),_=s("div",{class:"language-vue"},[s("pre",{"v-pre":"",class:"shiki vp-code-dark"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"<"),s("span",{style:{color:"#7EE787"}},"template"),s("span",{style:{color:"#C9D1D9"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"    <"),s("span",{style:{color:"#7EE787"}},"div"),s("span",{style:{color:"#C9D1D9"}}," "),s("span",{style:{color:"#79C0FF"}},"style"),s("span",{style:{color:"#C9D1D9"}},"="),s("span",{style:{color:"#A5D6FF"}},'"height: 600px;width: 900px;"'),s("span",{style:{color:"#C9D1D9"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"        <"),s("span",{style:{color:"#7EE787"}},"rack-list"),s("span",{style:{color:"#C9D1D9"}}," />")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"    </"),s("span",{style:{color:"#7EE787"}},"div"),s("span",{style:{color:"#C9D1D9"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C9D1D9"}},"</"),s("span",{style:{color:"#7EE787"}},"template"),s("span",{style:{color:"#C9D1D9"}},">")]),n(`
`),s("span",{class:"line"})])]),s("pre",{"v-pre":"",class:"shiki vp-code-light"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"<"),s("span",{style:{color:"#116329"}},"template"),s("span",{style:{color:"#24292F"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"    <"),s("span",{style:{color:"#116329"}},"div"),s("span",{style:{color:"#24292F"}}," "),s("span",{style:{color:"#0550AE"}},"style"),s("span",{style:{color:"#24292F"}},"="),s("span",{style:{color:"#0A3069"}},'"height: 600px;width: 900px;"'),s("span",{style:{color:"#24292F"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"        <"),s("span",{style:{color:"#116329"}},"rack-list"),s("span",{style:{color:"#24292F"}}," />")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"    </"),s("span",{style:{color:"#116329"}},"div"),s("span",{style:{color:"#24292F"}},">")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292F"}},"</"),s("span",{style:{color:"#116329"}},"template"),s("span",{style:{color:"#24292F"}},">")]),n(`
`),s("span",{class:"line"})])])],-1),f=A(`<div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#8B949E;">/**</span></span>
<span class="line"><span style="color:#8B949E;"> * \u521B\u5EFA\u88AB\u4F7F\u7528\u8FC7\u9700\u8981\u5C55\u793A\u7684\u670D\u52A1\u5668\u4E0A\u7684\u706F</span></span>
<span class="line"><span style="color:#8B949E;"> * </span><span style="color:#FF7B72;">@param</span><span style="color:#8B949E;"> </span><span style="color:#C9D1D9;">h</span></span>
<span class="line"><span style="color:#8B949E;"> * </span><span style="color:#FF7B72;">@return</span><span style="color:#8B949E;"> </span><span style="color:#FFA657;">{Mesh&lt;BufferGeometry, MeshPhongMaterial&gt;}</span></span>
<span class="line"><span style="color:#8B949E;"> */</span></span>
<span class="line"><span style="color:#FF7B72;">function</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">createUsedLight</span><span style="color:#C9D1D9;"> (</span><span style="color:#FFA657;">h</span><span style="color:#C9D1D9;">) {</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">let</span><span style="color:#C9D1D9;"> boxGeometry </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.</span><span style="color:#D2A8FF;">PlaneGeometry</span><span style="color:#C9D1D9;">(</span><span style="color:#79C0FF;">24</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">3.5</span><span style="color:#C9D1D9;">);</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">positionAttribute</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> boxGeometry.</span><span style="color:#D2A8FF;">getAttribute</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;position&#39;</span><span style="color:#C9D1D9;">);</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">geometry</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.</span><span style="color:#D2A8FF;">BufferGeometry</span><span style="color:#C9D1D9;">();</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">vertices</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> positionAttribute.array;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#8B949E;">// \u914D\u7F6E</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">indices</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> [</span><span style="color:#79C0FF;">1</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">3</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">2</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">3</span><span style="color:#C9D1D9;">];</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">normals</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> [</span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">1</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">1</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">1</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">1</span><span style="color:#C9D1D9;">];</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">let</span><span style="color:#C9D1D9;"> leftColor </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> [</span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">247</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">/</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">255</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">1</span><span style="color:#C9D1D9;">];</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">let</span><span style="color:#C9D1D9;"> rightColor </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> [</span><span style="color:#79C0FF;">2</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">/</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">255</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">90</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">/</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">255</span><span style="color:#C9D1D9;">, </span><span style="color:#79C0FF;">180</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">/</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">255</span><span style="color:#C9D1D9;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#8B949E;">// \u5DE6\u4E0A/\u53F3\u4E0A/\u5DE6\u4E0B/\u53F3\u4E0B\u7684\u989C\u8272</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">colors</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> [</span></span>
<span class="line"><span style="color:#C9D1D9;">        </span><span style="color:#FF7B72;">...</span><span style="color:#C9D1D9;">leftColor,</span></span>
<span class="line"><span style="color:#C9D1D9;">        </span><span style="color:#FF7B72;">...</span><span style="color:#C9D1D9;">rightColor,</span></span>
<span class="line"><span style="color:#C9D1D9;">        </span><span style="color:#FF7B72;">...</span><span style="color:#C9D1D9;">leftColor,</span></span>
<span class="line"><span style="color:#C9D1D9;">        </span><span style="color:#FF7B72;">...</span><span style="color:#C9D1D9;">rightColor</span></span>
<span class="line"><span style="color:#C9D1D9;">    ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">    geometry.</span><span style="color:#D2A8FF;">setIndex</span><span style="color:#C9D1D9;">(indices);</span></span>
<span class="line"><span style="color:#C9D1D9;">    geometry.</span><span style="color:#D2A8FF;">setAttribute</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;position&#39;</span><span style="color:#C9D1D9;">, </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.</span><span style="color:#D2A8FF;">Float32BufferAttribute</span><span style="color:#C9D1D9;">(vertices, </span><span style="color:#79C0FF;">3</span><span style="color:#C9D1D9;">));</span></span>
<span class="line"><span style="color:#C9D1D9;">    geometry.</span><span style="color:#D2A8FF;">setAttribute</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;normal&#39;</span><span style="color:#C9D1D9;">, </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.</span><span style="color:#D2A8FF;">Float32BufferAttribute</span><span style="color:#C9D1D9;">(normals, </span><span style="color:#79C0FF;">3</span><span style="color:#C9D1D9;">));</span></span>
<span class="line"><span style="color:#C9D1D9;">    geometry.</span><span style="color:#D2A8FF;">setAttribute</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;color&#39;</span><span style="color:#C9D1D9;">, </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.</span><span style="color:#D2A8FF;">Float32BufferAttribute</span><span style="color:#C9D1D9;">(colors, </span><span style="color:#79C0FF;">3</span><span style="color:#C9D1D9;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">material</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.</span><span style="color:#D2A8FF;">MeshPhongMaterial</span><span style="color:#C9D1D9;">({</span></span>
<span class="line"><span style="color:#C9D1D9;">        side: </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.DoubleSide,</span></span>
<span class="line"><span style="color:#C9D1D9;">        vertexColors: </span><span style="color:#79C0FF;">true</span></span>
<span class="line"><span style="color:#C9D1D9;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">let</span><span style="color:#C9D1D9;"> mesh </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">new</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">THREE</span><span style="color:#C9D1D9;">.</span><span style="color:#D2A8FF;">Mesh</span><span style="color:#C9D1D9;">(geometry, material);</span></span>
<span class="line"><span style="color:#C9D1D9;">    mesh.position.</span><span style="color:#D2A8FF;">set</span><span style="color:#C9D1D9;">(</span><span style="color:#79C0FF;">0.5</span><span style="color:#C9D1D9;">, h, </span><span style="color:#79C0FF;">RACK_WIDTH</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">/</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">2</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">+</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">0.4</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">/</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">2</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">-</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">SERVER_MARGIN</span><span style="color:#C9D1D9;">);</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#FF7B72;">return</span><span style="color:#C9D1D9;"> mesh;</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"><span style="color:#6E7781;">/**</span></span>
<span class="line"><span style="color:#6E7781;"> * \u521B\u5EFA\u88AB\u4F7F\u7528\u8FC7\u9700\u8981\u5C55\u793A\u7684\u670D\u52A1\u5668\u4E0A\u7684\u706F</span></span>
<span class="line"><span style="color:#6E7781;"> * </span><span style="color:#CF222E;">@param</span><span style="color:#6E7781;"> </span><span style="color:#24292F;">h</span></span>
<span class="line"><span style="color:#6E7781;"> * </span><span style="color:#CF222E;">@return</span><span style="color:#6E7781;"> </span><span style="color:#953800;">{Mesh&lt;BufferGeometry, MeshPhongMaterial&gt;}</span></span>
<span class="line"><span style="color:#6E7781;"> */</span></span>
<span class="line"><span style="color:#CF222E;">function</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">createUsedLight</span><span style="color:#24292F;"> (</span><span style="color:#953800;">h</span><span style="color:#24292F;">) {</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">let</span><span style="color:#24292F;"> boxGeometry </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.</span><span style="color:#8250DF;">PlaneGeometry</span><span style="color:#24292F;">(</span><span style="color:#0550AE;">24</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">3.5</span><span style="color:#24292F;">);</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">positionAttribute</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> boxGeometry.</span><span style="color:#8250DF;">getAttribute</span><span style="color:#24292F;">(</span><span style="color:#0A3069;">&#39;position&#39;</span><span style="color:#24292F;">);</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">geometry</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.</span><span style="color:#8250DF;">BufferGeometry</span><span style="color:#24292F;">();</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">vertices</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> positionAttribute.array;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#6E7781;">// \u914D\u7F6E</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">indices</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> [</span><span style="color:#0550AE;">1</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">0</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">3</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">0</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">2</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">3</span><span style="color:#24292F;">];</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">normals</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> [</span><span style="color:#0550AE;">0</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">0</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">1</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">0</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">0</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">1</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">0</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">0</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">1</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">0</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">0</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">1</span><span style="color:#24292F;">];</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">let</span><span style="color:#24292F;"> leftColor </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> [</span><span style="color:#0550AE;">0</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">247</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">/</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">255</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">1</span><span style="color:#24292F;">];</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">let</span><span style="color:#24292F;"> rightColor </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> [</span><span style="color:#0550AE;">2</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">/</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">255</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">90</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">/</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">255</span><span style="color:#24292F;">, </span><span style="color:#0550AE;">180</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">/</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">255</span><span style="color:#24292F;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#6E7781;">// \u5DE6\u4E0A/\u53F3\u4E0A/\u5DE6\u4E0B/\u53F3\u4E0B\u7684\u989C\u8272</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">colors</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> [</span></span>
<span class="line"><span style="color:#24292F;">        </span><span style="color:#CF222E;">...</span><span style="color:#24292F;">leftColor,</span></span>
<span class="line"><span style="color:#24292F;">        </span><span style="color:#CF222E;">...</span><span style="color:#24292F;">rightColor,</span></span>
<span class="line"><span style="color:#24292F;">        </span><span style="color:#CF222E;">...</span><span style="color:#24292F;">leftColor,</span></span>
<span class="line"><span style="color:#24292F;">        </span><span style="color:#CF222E;">...</span><span style="color:#24292F;">rightColor</span></span>
<span class="line"><span style="color:#24292F;">    ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">    geometry.</span><span style="color:#8250DF;">setIndex</span><span style="color:#24292F;">(indices);</span></span>
<span class="line"><span style="color:#24292F;">    geometry.</span><span style="color:#8250DF;">setAttribute</span><span style="color:#24292F;">(</span><span style="color:#0A3069;">&#39;position&#39;</span><span style="color:#24292F;">, </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.</span><span style="color:#8250DF;">Float32BufferAttribute</span><span style="color:#24292F;">(vertices, </span><span style="color:#0550AE;">3</span><span style="color:#24292F;">));</span></span>
<span class="line"><span style="color:#24292F;">    geometry.</span><span style="color:#8250DF;">setAttribute</span><span style="color:#24292F;">(</span><span style="color:#0A3069;">&#39;normal&#39;</span><span style="color:#24292F;">, </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.</span><span style="color:#8250DF;">Float32BufferAttribute</span><span style="color:#24292F;">(normals, </span><span style="color:#0550AE;">3</span><span style="color:#24292F;">));</span></span>
<span class="line"><span style="color:#24292F;">    geometry.</span><span style="color:#8250DF;">setAttribute</span><span style="color:#24292F;">(</span><span style="color:#0A3069;">&#39;color&#39;</span><span style="color:#24292F;">, </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.</span><span style="color:#8250DF;">Float32BufferAttribute</span><span style="color:#24292F;">(colors, </span><span style="color:#0550AE;">3</span><span style="color:#24292F;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">material</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.</span><span style="color:#8250DF;">MeshPhongMaterial</span><span style="color:#24292F;">({</span></span>
<span class="line"><span style="color:#24292F;">        side: </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.DoubleSide,</span></span>
<span class="line"><span style="color:#24292F;">        vertexColors: </span><span style="color:#0550AE;">true</span></span>
<span class="line"><span style="color:#24292F;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">let</span><span style="color:#24292F;"> mesh </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">new</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">THREE</span><span style="color:#24292F;">.</span><span style="color:#8250DF;">Mesh</span><span style="color:#24292F;">(geometry, material);</span></span>
<span class="line"><span style="color:#24292F;">    mesh.position.</span><span style="color:#8250DF;">set</span><span style="color:#24292F;">(</span><span style="color:#0550AE;">0.5</span><span style="color:#24292F;">, h, </span><span style="color:#0550AE;">RACK_WIDTH</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">/</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">2</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">+</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">0.4</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">/</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">2</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">-</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">SERVER_MARGIN</span><span style="color:#24292F;">);</span></span>
<span class="line"><span style="color:#24292F;">    </span><span style="color:#CF222E;">return</span><span style="color:#24292F;"> mesh;</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"></span></code></pre></div>`,1);function v(a,l,o,p,e,t){const c=y("render-demo-0"),r=y("demo");return d(),u("div",null,[h,g,F(r,{customClass:"undefined",sourceCode:`<template>
    <div style="height: 600px;width: 900px;">
        <rack-list />
    </div>
</template>
`},{highlight:D(()=>[_]),default:D(()=>[F(c)]),_:1}),f])}const w=E(m,[["render",v]]);export{R as __pageData,w as default};