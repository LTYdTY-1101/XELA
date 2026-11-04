import React from 'react';
import {motion} from './shared';
export const DashboardStage=({children,pan=0,retreat=0}:{children:React.ReactNode;pan?:number;retreat?:number})=><div style={{position:'absolute',inset:0,transformOrigin:'50% 50%',scale:(1+.18*pan)*(1-retreat)+.78*retreat,translate:`0 ${230*pan*(1-retreat)}px`}}>{children}</div>;
export const ModeSwitch=({progress=0,opacity=1}:{progress?:number;opacity?:number})=><div style={{position:'absolute',left:960,top:58,translate:'-50% 0',width:150,height:64,borderRadius:36,background:progress>.3?'#003CFF':'#e4e7ef',border:'1px solid #ffffffbd',boxShadow:'0 12px 38px #333b6b2b',opacity}}>
 <div style={{position:'absolute',left:18,top:19,fontSize:24,color:progress>.3?'#e7e6ff':'#777c90',lineHeight:'26px'}}>☀</div>
 <div style={{position:'absolute',right:19,top:18,fontSize:25,color:progress>.3?'#d7d7fa':'#8d91a1',lineHeight:'26px'}}>☾</div>
 <div style={{position:'absolute',left:8+progress*86,top:8,width:48,height:48,borderRadius:'50%',background:'linear-gradient(145deg,#fff,#f0f2fc)',boxShadow:'0 3px 10px #383e6a30'}}/>
</div>;
