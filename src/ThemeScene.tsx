import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {Background,motion,Settings} from './shared';
import {FullBoard} from './SceneElements';
import {DashboardStage,ModeSwitch} from './DashboardStage';
import {Cursor} from './OrdersScene';
export const ThemeScene=(p:Settings)=>{const f=useCurrentFrame();const sweep=motion(f,11,19,0,1);const retreat=0;return <AbsoluteFill style={{overflow:'hidden'}}>
 <AbsoluteFill style={{backgroundColor:p.backgroundColor}}/>
 <AbsoluteFill style={{opacity:1-motion(f,50,59,0,1)}}><Background {...p}/></AbsoluteFill>
 <AbsoluteFill style={{background:'#111321',clipPath:`inset(0 ${100-sweep*100}% 0 0)`,opacity:.92*(1-motion(f,50,59,0,1))}}/>
 <div style={{position:'absolute',inset:0,transformOrigin:'50% 50%',scale:motion(f,50,59,1,.04),translate:`0 ${motion(f,50,59,0,-9.2)}px`,opacity:1-motion(f,52,59,0,1)}}>
 <DashboardStage pan={1} retreat={retreat}>
  <FullBoard src="dashboard-light.png"/>
  <div style={{position:'absolute',inset:0,clipPath:`inset(0 ${100-sweep*100}% 0 0)`}}><FullBoard src="dashboard-dark.png"/></div>
 </DashboardStage>
 </div>
 <ModeSwitch progress={motion(f,10,19,0,1)} opacity={1-motion(f,50,59,0,1)}/>
 <div style={{position:'absolute',left:motion(f,0,7,1190,994),top:motion(f,0,7,198,76),opacity:1-motion(f,20,27,0,1),zIndex:9,scale:.83}}><Cursor frame={f+65}/></div>
 {f>=11&&f<20&&<div style={{position:'absolute',left:-500+sweep*2400,top:-80,width:400,height:1240,rotate:'-14deg',background:'linear-gradient(90deg,transparent,#a6a5ff60,transparent)',filter:'blur(32px)',opacity:Math.sin(sweep*Math.PI)}}/>}
</AbsoluteFill>};
