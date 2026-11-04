import {AbsoluteFill,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {OrdersScene} from './OrdersScene';
import {CalendarBoard} from './ScheduleScene';
import type {Settings} from './shared';

const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const progress=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});

// One continuous surface starts with the selected row's exact bounds. Its box
// expands and rotates into the calendar; the calendar content unfolds inside it.
// At local frame 113 it matches ScheduleScene frame 23 exactly. The task clock
// stays before zero throughout unfolding, then starts after the surface lands.
const SelectedRowToCalendar=({frame:f}:{frame:number})=>{
 const zoom=progress(f,77,85);
 const evolve=progress(f,85,113);
 const rowZoom=lerp(1,1.28,zoom);
 const startWidth=1296*1.28;
 const startHeight=56*1.28;
 const width=f<=85?1296*rowZoom:lerp(startWidth,1440*1.18,evolve);
 const height=f<=85?56*rowZoom:lerp(startHeight,1024*1.18,evolve);
 // Preserve the clicked row's original 12%/50% zoom anchor, then move its
 // upper left corner along a continuous line to the approved calendar pose.
 const left=f<=85?360-1296*.12*(rowZoom-1):lerp(360-1296*.12*.28,90,evolve);
 const top=f<=85?684-28*(rowZoom-1)-zoom*42:lerp(684-28*.28-42,430,evolve);
 const rowScale=f<=85?rowZoom:lerp(1.28,2.6,evolve);
 const radius=f<=85?14*zoom*rowZoom:lerp(14*1.28,28*1.18,evolve);
 const shadowScale=f<=85?rowZoom:lerp(1.28,1.18,evolve);
 return <div data-row-calendar-morph style={{position:'absolute',left,top,width,height,background:'#fff',borderRadius:radius,overflow:'hidden',transformOrigin:'0 0',rotate:`${-15*evolve}deg`,boxShadow:`0 ${32*shadowScale}px ${85*shadowScale}px #263b772b`,zIndex:60}}>
  <div style={{position:'absolute',left:0,top:0,width:1440,height:1024,transformOrigin:'0 0',scale:`${width/1440} ${height/1024}`,opacity:evolve}}>
   <CalendarBoard frame={f-114} unframed/>
  </div>
  <div style={{position:'absolute',left:0,top:evolve*height*.16,width:1296,height:56,overflow:'hidden',transformOrigin:'0 0',scale:rowScale,opacity:1-evolve}}>
   <Img src={staticFile('orders-updated.png')} style={{position:'absolute',left:-120,top:-656,width:1440,height:1024}}/>
   <div style={{position:'absolute',left:16,top:16,width:24,height:24,borderRadius:14,background:'#202438',color:'white',textAlign:'center',fontSize:17}}>✓</div>
  </div>
 </div>;
};

export const OrdersTransitionScene=(p:Settings)=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{overflow:'hidden',isolation:'isolate'}}>
  <OrdersScene {...p} hideSelected={f>=77}/>
  {f>=77&&<SelectedRowToCalendar frame={f}/>}
 </AbsoluteFill>;
};
