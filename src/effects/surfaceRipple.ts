import {createEffect,type InteractivitySchema} from 'remotion';

type Params={progress:number};
type State={gl:WebGL2RenderingContext;program:WebGLProgram;vao:WebGLVertexArrayObject;texture:WebGLTexture;progress:WebGLUniformLocation|null;resolution:WebGLUniformLocation|null;source:WebGLUniformLocation|null};
const vertex=`#version 300 es
out vec2 uv;
void main(){
 vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));
 uv=p;gl_Position=vec4(p*2.0-1.0,0.0,1.0);
}`;
const fragment=`#version 300 es
precision highp float;
in vec2 uv;
out vec4 color;
uniform sampler2D sourceImage;
uniform vec2 resolution;
uniform float progress;
void main(){
 // Work in original artboard pixels so circular ripples stay circular.
 vec2 page=vec2(uv.x,1.0-uv.y)*vec2(1440.0,1024.0);
 vec2 delta=page-vec2(237.0,244.0);
 float distanceFromImpact=length(delta);
 vec2 direction=delta/max(distanceFromImpact,1.0);
 float front=progress*1700.0;
 float trail=front-distanceFromImpact;
 // A finite wave packet: undisturbed water ahead, several receding crests behind.
 float envelope=exp(-pow((trail-155.0)/245.0,2.0))*smoothstep(-30.0,45.0,trail);
 float phase=trail*0.052;
 float impact=smoothstep(0.0,0.07,progress);
 float wave=(sin(phase)+0.22*sin(phase*1.9))*envelope*impact;
 float displacement=wave*31.0*(1.0-progress*0.35);
 vec2 refracted=page+direction*displacement;
 vec2 sampleUv=vec2(refracted.x/1440.0,1.0-refracted.y/1024.0);
 color=texture(sourceImage,clamp(sampleUv,vec2(0.0),vec2(1.0)));
 // The exported PNG contains dark pixels outside its rounded page corners.
 // Mask in source coordinates so refraction cannot pull those pixels into the page.
 vec2 corner=abs(refracted-vec2(720.0,512.0))-vec2(692.0,484.0);
 float edgeDistance=length(max(corner,vec2(0.0)))+min(max(corner.x,corner.y),0.0)-28.0;
 color*=1.0-smoothstep(-1.0,1.0,edgeDistance);
 // Soft water-surface shading follows the same wave, with no graphic ring overlay.
 color.rgb=min(color.rgb*(1.0+cos(phase)*envelope*impact*0.055),vec3(color.a));
 // The page dissolves as a whole while the outgoing wave still deforms its content.
 float fade=1.0-smoothstep(0.28,1.0,progress);
 color*=fade;
}`;
const schema={progress:{type:'number',min:0,max:1,step:0.01,default:0,hiddenFromList:false,description:'Impact to complete water-surface dissolve'}} as const satisfies InteractivitySchema;
const compile=(gl:WebGL2RenderingContext,type:number,source:string)=>{
 const shader=gl.createShader(type);if(!shader)throw new Error('Cannot create surface ripple shader');
 gl.shaderSource(shader,source);gl.compileShader(shader);
 if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){const error=gl.getShaderInfoLog(shader);gl.deleteShader(shader);throw new Error(`Surface ripple shader: ${error}`)}
 return shader;
};
export const surfaceRipple=createEffect<Params,State>({
 type:'com.xela.surface-ripple',label:'Water surface ripple',documentationLink:null,backend:'webgl2',schema,
 calculateKey:({progress})=>`surface-ripple-${progress}`,
 validateParams:({progress})=>{if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Ripple progress must be between 0 and 1')},
 setup:target=>{
  const gl=target.getContext('webgl2',{alpha:true,premultipliedAlpha:true,preserveDrawingBuffer:true});
  if(!gl)throw new Error('Water surface ripple requires WebGL2');
  const vs=compile(gl,gl.VERTEX_SHADER,vertex);const fs=compile(gl,gl.FRAGMENT_SHADER,fragment);
  const program=gl.createProgram();const vao=gl.createVertexArray();const texture=gl.createTexture();
  if(!program||!vao||!texture)throw new Error('Cannot allocate surface ripple resources');
  gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(`Surface ripple link: ${gl.getProgramInfoLog(program)}`);
  gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  return {gl,program,vao,texture,progress:gl.getUniformLocation(program,'progress'),resolution:gl.getUniformLocation(program,'resolution'),source:gl.getUniformLocation(program,'sourceImage')};
 },
 apply:({source,width,height,params,state,flipSourceY})=>{
  const {gl}=state;gl.viewport(0,0,width,height);gl.disable(gl.BLEND);gl.disable(gl.SCISSOR_TEST);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,flipSourceY);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,state.texture);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source as TexImageSource);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.useProgram(state.program);
  gl.uniform1i(state.source,0);gl.uniform1f(state.progress,params.progress);gl.uniform2f(state.resolution,width,height);
  gl.bindVertexArray(state.vao);gl.drawArrays(gl.TRIANGLES,0,3);
 },
 cleanup:({gl,texture,program,vao})=>{gl.deleteTexture(texture);gl.deleteProgram(program);gl.deleteVertexArray(vao)},
});
