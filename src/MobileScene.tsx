import {AbsoluteFill,Img,staticFile,useCurrentFrame} from 'remotion';
import {Background,motion,Settings} from './shared';
export const PHONE_TOP=59.4;
export const PhoneSurface=({frame:f,contentOpacity=1}:{frame:number;contentOpacity?:number})=>{const scroll=motion(f,14,53,0,430);return <div style={{position:'relative',width:384,height:890,padding:10,boxSizing:'border-box',background:'linear-gradient(130deg,#fff,#c5cdf9 45%,#f9faff)',border:'1px solid #ffffffd9',borderRadius:39,boxShadow:'12px 30px 70px #293f7840, inset -2px -2px 2px #8c9dcc60'}}>
 <div style={{position:'relative',width:360,height:866,borderRadius:29,overflow:'hidden',background:'#fff',border:'1px solid #e0e4f2'}}>
  <div style={{position:'absolute',left:0,top:0,width:360,height:119,overflow:'hidden',zIndex:4}}>
   <Img src={staticFile('mobile.png')} style={{width:360,height:1080}}/>
  </div>
  <div style={{position:'absolute',left:0,top:119,width:360,height:747,overflow:'hidden',opacity:contentOpacity}}>
   <Img src={staticFile('mobile-content-absolute.png')} style={{position:'absolute',left:0,top:-64-scroll,width:360,height:1492}}/>
   <div style={{position:'absolute',left:0,top:289-scroll,width:249,height:1,background:'#5976ff'}}/>
  </div>
 </div>
</div>};
// Magnification uses a top anchor so the existing top gap stays exactly 59.4px.
export const Phone=({frame:f,reveal=1,scale=1,magnification=1}:{frame:number;reveal?:number;scale?:number;magnification?:number})=><div style={{position:'absolute',left:960,top:PHONE_TOP,translate:'-50% 0',width:384,height:890,transformOrigin:'50% 0',scale:scale*magnification*(1.08-(1-reveal)*.11)}}>
 <PhoneSurface frame={f}/>
</div>;
export const MobileScene=(p:Settings)=>{const f=useCurrentFrame();return <AbsoluteFill style={{overflow:'hidden'}}>
 <Background {...p}/>
 <div style={{position:'absolute',inset:0,opacity:1-motion(f,60,74,0,1)}}>
  <Phone frame={f} magnification={1.25}/>
 </div>
</AbsoluteFill>};
