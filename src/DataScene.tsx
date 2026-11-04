import {AbsoluteFill,Easing,Img,interpolate,staticFile,spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {Background,motion,Settings} from './shared';
import {Crop,FullBoard,shadow} from './SceneElements';
import {DashboardStage,ModeSwitch} from './DashboardStage';
const bars=[47.79,106.66,165.52,224.39,283.26,342.12,400.99,459.86,518.72,577.59].map((x,i)=>({x:752+x,y:279+[96.8,108,108,108,52,52.8,108,96.8,52,52][i],h:[44.8,33.6,33.6,33.6,89.6,89.6,35.2,46.4,89.6,89.6][i]})).concat([72.15,131.01,189.88,248.75,307.61,366.48,425.35,484.21,543.08,601.95].map((x,i)=>({x:752+x,y:279+[108,85.6,63.2,29.6,85.6,96.8,108,40.8,63.2,29.6][i],h:[33.6,56,78.4,112,56,45.6,35.2,102.4,78.4,112][i]})));
const liftFor=(f:number)=>motion(f,0,8,0,1)*(1-motion(f,60,70,0,1));
const Panel=({frame:f,x,w,children}:{frame:number;x:number;w:number;children:React.ReactNode})=>{const lift=liftFor(f);return <div style={{position:'absolute',left:x,top:136,width:w,height:336,zIndex:4,transformOrigin:'50% 50%',scale:1+lift*.23,translate:`${lift*(x===312?-236:-86)}px ${-lift*68+Math.sin(f/16)*lift*4}px`,boxShadow:lift>0?`0 ${lift*30}px ${lift*65}px #313f7740`:'none',borderRadius:16,background:'white'}}>
 <Crop src="dashboard-light.png" x={x} y={136} w={w} h={336} style={{left:0,top:0,borderRadius:16}}/>
 <div style={{position:'absolute',left:-x,top:-136,width:1440,height:1024,pointerEvents:'none'}}>{children}</div>
</div>};
export const DataBoard=({frame:f}:{frame:number})=><div style={{position:'absolute',left:240,top:28,width:1440,height:1024,fontFamily:'Arial,sans-serif',color:'#201d2d'}}>
 <FullBoard src="dashboard-light.png" style={{left:0,top:0,boxShadow:shadow}}/>
 <div style={{position:'absolute',left:312,top:136,width:1104,height:336,borderRadius:16,background:'#f7f8fb'}}/>
 <Panel frame={f} x={312} w={400}>
  <div style={{position:'absolute',left:326,top:249,width:181,height:175,background:'white'}}/>
  <Crop src="dashboard-light.png" x={326} y={249} w={181} h={175} style={{maskImage:`conic-gradient(from 0deg at 98px 83px,black ${Math.min(1,spring({frame:f-4,fps:30,durationInFrames:25,config:{damping:14,stiffness:220,mass:.6}}))*360}deg,transparent 0deg)`}}/>
  <div style={{position:'absolute',left:402,top:313,width:45,height:39,background:'white',textAlign:'center',borderRadius:10,fontSize:18,fontWeight:600,paddingTop:1}}>{Math.floor(motion(f,5,29,0,2846))}<div style={{fontSize:12,fontWeight:400,color:'#9b99a5',marginTop:2}}>Total</div></div>
 </Panel>
 <Panel frame={f} x={720} w={696}>
  <div style={{position:'absolute',left:796,top:284,width:589,height:138,background:'white'}}/>
  {[285,319,353,387,421].map(y=><div key={y} style={{position:'absolute',left:796,top:y,width:587,height:1,background:'#f6f6f8'}}/>)}
  {bars.map((b,i)=><Crop key={i} src="dashboard-light.png" x={b.x-.5} y={b.y-.5} w={21.4} h={b.h+1} style={{transformOrigin:'50% 100%',scale:`1 ${spring({frame:f-6-(i%10)*.45,fps:30,durationInFrames:18,config:{damping:10,stiffness:260,mass:.7}})}`}}/>)}
  <div style={{position:'absolute',left:752,top:210,width:120,height:29,background:'white',fontWeight:700,fontSize:24}}>{Math.floor(motion(f,71,86,0,254852)).toLocaleString('en-US')}</div>
 </Panel>
 <div style={{position:'absolute',left:795,top:575,width:589,height:172,background:'white'}}/>
 {[576,618,661,703,745].map(y=><div key={y} style={{position:'absolute',left:795,top:y,width:587,height:1,background:'#f7f7f8'}}/>)}
 <div style={{position:'absolute',left:1025,top:541,width:187,height:58,background:'white'}}/>
 <div style={{position:'absolute',left:795,top:599,width:585,height:131,overflow:'hidden',clipPath:`inset(0 ${(1-motion(f,73,88,0,1))*100}% 0 0)`}}>
  <Img src={staticFile('chart-lines.svg')} style={{width:585,height:131}}/>
 </div>
 <Crop src="dashboard-light.png" x={1025} y={541} w={187} h={59} style={{opacity:motion(f,84,88,0,1)}}/>
 {[{x:403,n:279,label:false},{x:735,n:19000,label:true},{x:1066,n:683,label:false}].map((m,i)=>{const n=Math.floor(motion(f,71+i,84+i,0,m.n));return <div key={m.x} style={{position:'absolute',left:m.x,top:49,width:m.label?75:65,height:36,background:'white',fontSize:34,fontWeight:700,letterSpacing:-1}}>{m.label?(n>=1000?(n/1000).toFixed(n===19000?0:1)+'k':n):n}</div>})}
</div>;
export const DataScene=(p:Settings)=>{const raw=useCurrentFrame();const f=raw-24;const pan=motion(f,89,95,0,1);const entry=interpolate(raw,[0,20],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});return <AbsoluteFill style={{overflow:'hidden',opacity:entry}}>
 <Background {...p}/>
 <div style={{position:'absolute',inset:0,translate:`0 ${(1-entry)*24}px`,scale:.985+entry*.015,filter:`blur(${(1-entry)*3}px)`}}>
  <DashboardStage pan={pan}><DataBoard frame={Math.max(0,f)}/></DashboardStage>
 </div>
 <ModeSwitch opacity={motion(f,89,95,0,1)}/>
</AbsoluteFill>};
