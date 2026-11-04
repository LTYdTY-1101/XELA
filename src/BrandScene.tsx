import {AbsoluteFill,Img,staticFile,spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {Background,motion,Settings} from './shared';
import {GlassRing} from './GlassRing';
export const BrandScene=(p:Settings)=>{const f=useCurrentFrame();const {fps}=useVideoConfig();const drop=spring({frame:f-11,fps,durationInFrames:19,config:{damping:12,stiffness:220,mass:.8}});const float=f<45?motion(f,30,34,0,1)*Math.sin((f-30)/8)*4:Math.sin(14/8)*4+Math.sin((f-45)/(2*fps)*Math.PI*2)*3;return <AbsoluteFill style={{overflow:'hidden',backgroundColor:p.backgroundColor}}>
 <AbsoluteFill style={{opacity:motion(f,0,7,0,1)}}><Background {...p}/></AbsoluteFill>
 <GlassRing frame={f}/>
 <div style={{position:'absolute',inset:0,translate:`0 ${-970*(1-drop)+float}px`,opacity:f<11?0:1}}>
  <div style={{position:'absolute',left:510,top:286,width:900}}>
   <div style={{height:153,overflow:'hidden'}}>
    <Img src={staticFile('xela/xela-logo.png')} style={{width:900}}/>
   </div>
   <div style={{fontFamily:'Arial,sans-serif',fontSize:43,fontWeight:600,textAlign:'center',letterSpacing:.5,color:'#050508',marginTop:30}}>DESIGN SYSTEM FOR FIGMA</div>
  </div>
  <div style={{position:'absolute',left:0,top:550,width:'100%',textAlign:'center',fontFamily:'PingFang SC, sans-serif',fontSize:43,fontWeight:500,letterSpacing:5,color:'#080912'}}>一套设计，贯穿每个场景。</div>
 </div>
</AbsoluteFill>};
