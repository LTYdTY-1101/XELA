import React from 'react';
import {Img,staticFile} from 'remotion';
export const shadow='0 32px 85px #263b772b';
// Each crop is an independent design layer; coordinates remain in original artboard pixels.
export const Crop=({src,x,y,w,h,style={}}:{src:string;x:number;y:number;w:number;h:number;style?:React.CSSProperties})=>
<div style={{position:'absolute',left:x,top:y,width:w,height:h,overflow:'hidden',...style}}>
 <Img src={staticFile(src)} style={{position:'absolute',left:-x,top:-y,width:1440,height:1024,maxWidth:'none'}}/>
</div>;
export const FullBoard=({src,style={}}:{src:string;style?:React.CSSProperties})=>
<div style={{position:'absolute',left:240,top:28,width:1440,height:1024,borderRadius:28,overflow:'hidden',boxShadow:shadow,...style}}>
 <Img src={staticFile(src)} style={{width:1440,height:1024}}/>
</div>;
