import{j as e,l as n,M as t,S as i,c as r,d as o,e as a,W as s}from"./three.module.18d565c0.js";import{V as l,R as d,C as c}from"./vendor.63663422.js";import{j as h,D as m,H as u}from"./three_geometry.71b4f52c.js";import{s as p}from"./4d.47c83f64.js";import{n as v}from"./index.553d5c6b.js";var f=Object.defineProperty,w=Object.getOwnPropertyDescriptor,g=(e,n,t,i)=>{for(var r,o=i>1?void 0:i?w(n,t):n,a=e.length-1;a>=0;a--)(r=e[a])&&(o=(i?r(n,t,o):r(o))||o);return i&&o&&f(n,t,o),o};let _=class extends l{constructor(){super(...arguments),this.pre=new Date}mounted(){this.init([this.center=this.initCenter()]),this.animate()}getHedronPoint(i,r=30,o=0){const a=h(i,r,o);return this.pointMaterial=new e({uniforms:{u_time:{value:.3},u_amplitude:{value:17},u_frequency:{value:3},alphaTest:{value:1},pointTexture:{value:(new n).load(m)}},vertexShader:p+"\n                precision highp float;\n\n                varying vec3 vNormal;\n                attribute float size;\n\n                uniform float u_time;\n                uniform float u_amplitude;\n                uniform float u_frequency;\n\n                void main () {\n                    vNormal = normalMatrix * normalize(normal);\n                    gl_PointSize = size;\n\n                    float distortion = snoise(vec4(normal * u_frequency, u_time)) * u_amplitude;\n                    vec3 newPosition = position + (normal * distortion);\n\n                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);\n                }",fragmentShader:"\n                varying vec3 vNormal;\n\n                uniform sampler2D pointTexture;\n                uniform float alphaTest;\n\n                void main(void) {\n                    vec3 viewNv  = normalize(vNormal);\n                    vec3 nvColor = viewNv * 0.5 + 0.5;\n                    gl_FragColor  = vec4(nvColor, 1.0);\n\n                    gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );\n                    if ( gl_FragColor.a < alphaTest ) discard;\n                }\n            ",transparent:!0}),new t(a,this.pointMaterial)}initCenter(){return this.getHedronPoint(u.Icosahedron,150,60)}init(e){let n=window.innerWidth/window.innerHeight,t=this.container;this.scene=new i,e.forEach((e=>{"function"==typeof e?this.scene.add(e()):this.scene.add(e)})),this.camera=new r(60,n,1,1e4),this.camera.position.set(600,0,1e3),this.camera.lookAt(this.scene.position);let l=new o(16777215);this.scene.add(l);const d=new a(1e3);this.scene.add(d),this.renderer=new s({antialias:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setClearColor(329011,1),t.appendChild(this.renderer.domElement),t.style.touchAction="none",window.addEventListener("resize",this.onWindowResize)}onWindowResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}animate(){requestAnimationFrame(this.animate);let e=new Date;this.pointMaterial.uniforms.u_time.value+=5e-4*(Number(e)-Number(this.pre)),this.pre=e,this.renderer.render(this.scene,this.camera)}};g([d()],_.prototype,"container",2),_=g([c],_);const x={};var C=v(_,(function(){var e=this.$createElement;return(this._self._c||e)("div",{ref:"container",staticClass:"index"})}),[],!1,P,null,null,null);function P(e){for(let n in x)this[n]=x[n]}var j=function(){return C.exports}();export{j as default};