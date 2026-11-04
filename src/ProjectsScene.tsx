import {AbsoluteFill,CanvasImage,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Background,motion,Settings} from './shared';
import {shadow} from './SceneElements';
import {Cursor} from './OrdersScene';
import {surfaceRipple} from './effects/surfaceRipple';

export const ProjectsScene=(p:Settings)=>{
 const raw=useCurrentFrame();const f=raw-15;const {fps}=useVideoConfig();
 const enter=spring({frame:raw,fps,config:{damping:18,stiffness:210,mass:.85}});
 const move=motion(f,3,52,0,1);
 const wave=interpolate(f,[55,74],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <AbsoluteFill style={{overflow:'hidden',opacity:motion(raw,0,7,0,1)}}>
  <Background {...p}/>
  <div style={{position:'absolute',left:240+move*190,top:28+move*160+(1-enter)*850,width:1440,height:1024,scale:1+move*.35,transformOrigin:'0 0'}}>
   <div style={{position:'absolute',inset:0,borderRadius:28,overflow:'hidden',boxShadow:shadow,opacity:1-motion(f,65,74,0,1)}}>
    <CanvasImage src={staticFile('projects.png')} width={1440} height={1024} style={{width:1440,height:1024}} effects={[surfaceRipple({progress:wave})]} premountFor={fps}/>
   </div>
   <div style={{position:'absolute',left:motion(f,12,44,840,231),top:motion(f,12,44,660,236),opacity:motion(f,10,18,0,1)*(1-motion(f,55,60,0,1)),zIndex:5,scale:.9}}>
    <Cursor frame={f+22}/>
   </div>
  </div>
 </AbsoluteFill>;
};
