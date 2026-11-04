import {AbsoluteFill,Easing,Img,staticFile,useCurrentFrame,interpolate} from 'remotion';
import {Background,motion,Settings} from './shared';
export const Cursor=({frame}:{frame:number})=>
<svg width="105" height="127" viewBox="0 0 105 127" style={{overflow:'visible',filter:'drop-shadow(5px 12px 7px #24297148)',scale:1-motion(frame,74,77,0,.12)+motion(frame,77,81,0,.12)}}>
<defs>
<linearGradient id="cursor" x1="0" y1="0" x2="1" y2="1">
<stop stopColor="#d8f6ff"/>
<stop offset=".3" stopColor="#94a6ff"/>
<stop offset=".6" stopColor="#7758f6"/>
<stop offset="1" stopColor="#3549d9"/>
</linearGradient>
</defs>
<path d="M8 6 L13 94 L36 75 L54 113 Q59 120 66 115 L76 110 Q81 107 77 100 L59 66 L88 63Z" fill="#3447b6" transform="translate(3 6)"/>
<path d="M8 6 L13 94 L36 75 L54 113 Q59 120 66 115 L76 110 Q81 107 77 100 L59 66 L88 63Z" fill="url(#cursor)" stroke="#e0e5ff" strokeWidth="2"/>
<path d="M13 16 L17 83 L37 66 L80 61" fill="none" stroke="#ffffff80" strokeWidth="2"/>
</svg>;

// The board is shared by the incoming transition and the second shot: identical scale and placement.
export const OrdersBoard=({frame:f,hideSelected=false}:{frame:number;hideSelected?:boolean})=>{
 const smooth=Easing.bezier(.32,0,.68,1);
 const browseY=interpolate(f,[8,62],[404,908],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:smooth});
 const cy=f<=64?browseY:interpolate(f,[64,73],[908,684],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:smooth});
 const cx=motion(f,8,62,1030,980);
 const lift=motion(f,79,89,0,1);
 const merge=interpolate(f,[77,113],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <div style={{position:'absolute',left:240,top:28,width:1440,height:1024}}>
 <div style={{position:'absolute',inset:0,borderRadius:28,overflow:'hidden',boxShadow:'0 35px 90px #4a5f9e2b',opacity:1-motion(f,78,101,0,1)}}>
<Img src={staticFile('orders-updated.png')} style={{width:1440,height:1024}}/>
<div style={{position:'absolute',left:112,top:374,width:1310,height:558,background:'#fff'}}/>
</div>
 {[0,1,2,3,4,5,6,7,8,9].map(i=>{
 const selected=i===5;const distance=(cy-(404+i*56))/53;
 if(selected&&hideSelected)return null;
 const focus=f>=8&&f<=74?Math.exp(-distance*distance)*motion(f,6,10,0,1)*(1-motion(f,72,76,0,1)):0;
 return <div key={i} data-row={i} style={{position:'absolute',left:120-(selected?lift*30:0),top:376+i*56-(selected?merge*218:0),width:1296+(selected?lift*60:0),height:56,overflow:'hidden',opacity:selected?1:1-motion(f,78,101,0,1),borderRadius:focus>.1||selected&&lift>0?14:0,background:'#fff',boxShadow:focus>.01||selected&&lift>0?`0 ${6+focus*12+lift*(selected?18:0)}px ${focus*26+lift*(selected?32:0)}px #252a4428`:'none',scale:1+focus*.115+(selected?merge*3.6:0),transformOrigin:selected?'12% 50%':'50% 50%',zIndex:selected&&f>=75?30:Math.round(focus*20)+1}}>
 <Img src={staticFile('orders-updated.png')} style={{position:'absolute',left:-120,top:-(376+i*56),width:1440,height:1024}}/>
 {(i===2||i===7)&&<div style={{position:'absolute',left:12,top:12,width:32,height:32,background:'#fff',display:'grid',placeItems:'center'}}>
<div style={{width:21,height:21,border:'2px solid #e7e7eb',borderRadius:8}}/>
</div>}
 {selected&&f>=77&&<div style={{position:'absolute',left:16,top:16,width:24,height:24,borderRadius:14,background:'#202438',color:'white',textAlign:'center',fontSize:17}}>✓</div>}
 </div>})}
 {f>76&&<div style={{position:'absolute',left:cx-12,top:cy-12,width:60,height:60,border:'2px solid #737583',borderRadius:'50%',opacity:motion(f,76,86,.5,0),scale:motion(f,76,86,.3,2),zIndex:40}}/>}
 <div style={{position:'absolute',left:cx,top:cy,zIndex:50,rotate:'-8deg',opacity:motion(f,3,10,0,1)*(1-motion(f,80,89,0,1))}}>
<Cursor frame={f}/>
</div>
 </div>;
};
export const OrdersScene=(p:Settings & {hideSelected?:boolean})=>{const f=useCurrentFrame();return <AbsoluteFill style={{overflow:'hidden',isolation:'isolate'}}>
<Background {...p}/>
<div style={{position:'absolute',inset:0}}>
<OrdersBoard frame={f} hideSelected={p.hideSelected}/>
</div>
</AbsoluteFill>};
