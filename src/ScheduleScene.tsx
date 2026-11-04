import {AbsoluteFill,spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {Background,motion,Settings} from './shared';
import {Crop,FullBoard,shadow} from './SceneElements';
import {PhoneSurface,PHONE_TOP} from './MobileScene';
const tasks=[{x:551,y:125,w:201},{x:551,y:205,w:248},{x:551,y:285,w:256},{x:551,y:365,w:377},{x:551,y:525,w:178},{x:745,y:525,w:285},{x:551,y:605,w:127},{x:551,y:765,w:322},{x:551,y:845,w:533},{x:551,y:925,w:179},{x:551,y:1005,w:425}];
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const mobileY=[169,269,369,469,717,641,817,893,1041,1157,1257];
export const CalendarBoard=({frame:f,morph=0,unframed=false}:{frame:number;morph?:number;unframed?:boolean})=>{const {fps}=useVideoConfig();return <div style={{position:'absolute',left:0,top:0,width:lerp(1440,384,morph),height:lerp(1024,890,morph),borderRadius:unframed?0:lerp(28,39,morph),overflow:'hidden',boxShadow:unframed?'none':shadow,background:'white'}}>
 <div style={{position:'absolute',inset:0,opacity:1-motion(morph,0,.72,0,1),translate:`${-morph*440}px 0px`}}>
  <FullBoard src="schedule.png" style={{left:0,top:0,boxShadow:'none'}}/>
  <div style={{position:'absolute',left:549,top:122,width:538,height:902,background:'white'}}/>
  {[0,1,2,3,4,5,6,7,8,9,10,11].map(i=><div key={i} style={{position:'absolute',left:549,top:119+80*i,width:538,borderTop:'2px dotted #e7e7eb'}}/>)}
  <div style={{position:'absolute',left:471,top:342,width:826,height:1,background:'#5976ff'}}/>
 </div>
 <div style={{position:'absolute',left:0,top:0,transformOrigin:'0 0',scale:`${lerp(1440,384,morph)/384} 1`,opacity:motion(morph,.36,1,0,1)}}><PhoneSurface frame={0} contentOpacity={motion(morph,.88,1,0,1)}/></div>
 {tasks.map((t,i)=>{const delay=3+(10-i)*1.1;const a=spring({frame:f-delay,fps,config:{damping:13,stiffness:310,mass:.65}});return <div key={i} style={{position:'absolute',left:lerp(t.x,26,morph),top:lerp(t.y,mobileY[i],morph),width:t.w,height:68,transformOrigin:'0 0',scale:`${lerp(1,328/t.w,morph)} 1`,translate:`${(1-a)*-75}px ${(1-a)*48}px`,opacity:motion(f,delay,delay+3,0,1)*(1-motion(morph,.86,1,0,1))}}>
  <Crop src="schedule.png" {...t} h={68} style={{left:0,top:0,borderRadius:16}}/>
 </div>})}
</div>};
export const ScheduleScene=(p:Settings)=>{const f=useCurrentFrame();const collapse=motion(f,54,74,0,1);return <AbsoluteFill style={{overflow:'hidden'}}>
 <Background {...p}/>
 <div style={{position:'absolute',left:lerp(90,700.8,collapse),top:lerp(430,PHONE_TOP,collapse),width:lerp(1440,384,collapse),height:lerp(1024,890,collapse),scale:lerp(1.18,1.35,collapse),transformOrigin:'0 0',transform:`rotateZ(${-15*(1-collapse)}deg)`}}>
  <CalendarBoard frame={f-24} morph={collapse}/>
 </div>
</AbsoluteFill>};
