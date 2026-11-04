import {AbsoluteFill,Img,staticFile,useCurrentFrame} from 'remotion';
import {Background,motion,Settings} from './shared';
import {OrdersBoard} from './OrdersScene';
// Stable per-page seeds: independent slow, smooth currents with no runtime randomness.
const drift=(id:string,f:number)=>{
 const seed=Number(id.split('-')[1]);
 const phase=(seed*2.399963)%6.283185;
 const xPeriod=148+(seed*37)%87;
 const yPeriod=163+(seed*53)%101;
 return {
  x:Math.sin(f/xPeriod*Math.PI*2+phase)*(10+(seed*7)%15),
  y:Math.sin(f/yPeriod*Math.PI*2+phase*1.31)*(8+(seed*11)%13),
  scale:1+Math.sin(f/(190+(seed%5)*17)*Math.PI*2+phase)*.007,
 };
};
const Layer=({id,x,y,w,h,depth=1}:{id:string;x:number;y:number;w:number;h:number;depth?:number})=>{
 const f=useCurrentFrame();const d=drift(id,f);
 if(id==='14-4444'&&f>=54)return null;
 return <div data-layer={id} style={{position:'absolute',left:x,top:y,width:w,height:h,translate:`${d.x}px ${d.y}px`,scale:d.scale,filter:`drop-shadow(0 ${10+depth*7}px ${18+depth*8}px #26378024)`}}>
  <Img src={staticFile(`xela/raw-${id}.png`)} style={{width:'100%',height:'100%',borderRadius:10}}/>
 </div>;
};
export const OpeningScene=(p:Settings)=>{const f=useCurrentFrame();const d=drift('14-4444',54);return <AbsoluteFill style={{overflow:'hidden'}}>
<Background {...p}/>
<div style={{opacity:1-motion(f,60,74,0,1)}}>
<div style={{position:'absolute',left:112,top:452,width:550}}>
<Img src={staticFile('xela/xela-logo.png')} style={{width:550}}/>
<div style={{marginTop:66,display:'grid',gap:23,fontFamily:'Arial, sans-serif',fontSize:26,fontWeight:600,color:'#363447'}}>{['250+ Components','Desktop & Mobile','Responsive Design','30+ UI Scenes','10 Popular Categories'].map(t=>
<div key={t} style={{display:'flex',gap:18,alignItems:'center'}}>
<span style={{background:'#0545ff',color:'white',borderRadius:'50%',width:24,height:24,fontSize:17,textAlign:'center',lineHeight:'24px'}}>✓</span>{t}</div>)}</div>
</div>
<Img src={staticFile('xela/14-4454.png')} style={{position:'absolute',left:115,top:102,width:150}}/>
<div style={{position:'absolute',left:180,top:-70,width:1400,height:1700,transformOrigin:'0 0',transform:'perspective(2600px) rotateY(-3deg) rotateZ(-23.34deg)',scale:1.30}}>
<Layer id="14-4442" x={383} y={165} w={349} h={200} depth={.4}/>
<Layer id="14-4443" x={349} y={945} w={844} h={600} depth={.55}/>
<Layer id="14-4444" x={312} y={329} w={844} h={600} depth={1}/>
<Layer id="14-4445" x={184} y={-34} w={220} h={400} depth={1.2}/>
<Layer id="14-4449" x={542} y={1253} w={844} h={600} depth={.7}/>
<Layer id="14-4447" x={1066} y={580} w={220} h={659} depth={1.5}/>
<Layer id="14-4448" x={850} y={797} w={257} h={200} depth={2}/>
<Layer id="14-4446" x={239} y={1124} w={234} h={319} depth={2.3}/>
</div>
</div>
{f>=54&&<div data-transition="selected-page-zoom" style={{position:'absolute',left:motion(f,54,74,180+1.30*(.91814*(312+d.x)+.39626*(329+d.y)),240),top:motion(f,54,74,-70+1.30*(-.39626*(312+d.x)+.91814*(329+d.y)),28),width:1440,height:1024,transformOrigin:'0 0',scale:motion(f,54,74,844*1.30*d.scale/1440,1),rotate:`${motion(f,54,74,-23.34,0)}deg`,borderRadius:18,boxShadow:'0 35px 90px #4a5f9e2b',overflow:'hidden'}}>
 <Img src={staticFile('xela/raw-14-4444.png')} style={{position:'absolute',inset:0,width:1440,height:1024,opacity:1-motion(f,57,68,0,1)}}/>
 <div style={{position:'absolute',inset:0,opacity:motion(f,57,68,0,1)}}>
  <div style={{position:'absolute',left:-240,top:-28,width:1920,height:1080}}>
   <OrdersBoard frame={0}/>
  </div>
 </div>
</div>}
</AbsoluteFill>};
