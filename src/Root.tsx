import {CylinderText} from './cylinder-text.element';
import {Audio} from '@remotion/media';
import {AbsoluteFill,Composition,Folder,Freeze,interpolate,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {z} from 'zod';
import {OpeningScene} from './OpeningScene';
import {OrdersTransitionScene as OrdersScene} from './OrdersTransitionScene';
import {ScheduleScene} from './ScheduleScene';
import {MobileScene} from './MobileScene';
import {ProjectsScene} from './ProjectsScene';
import {DataScene} from './DataScene';
import {ThemeScene} from './ThemeScene';
import {BrandScene} from './BrandScene';
import {Background,Settings} from './shared';
const schema=z.object({backgroundImage:z.string().describe('public 中的文件名或图片 URL；默认 background.png'),backgroundFit:z.enum(['cover','contain']),backgroundColor:z.string(),showCaptions:z.boolean()});
const XELA=(p:Settings)=>{const {fps}=useVideoConfig();const f=useCurrentFrame();return <>
 <Background {...p}/>
 <Audio name="配乐 · Pop Track 03 / Lily J" src={staticFile('audio/mixkit-pop-track-03-lily-j.mp3')} durationInFrames={22*fps} premountFor={fps} volume={interpolate(f,[0,.3*fps,20*fps,22*fps-1],[0,.5,.5,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}/>
 <Sequence name="01 · 悬浮全貌" from={0} durationInFrames={2.5*fps} premountFor={fps}>
<OpeningScene {...p}/>
</Sequence>
 <Sequence name="02 · 列表聚焦" from={2.5*fps} durationInFrames={3.8*fps} premountFor={fps}>
<OrdersScene {...p}/>
</Sequence>
 <Sequence name="03 · 日程展开" from={5.5*fps} durationInFrames={2.5*fps} premountFor={fps}>
<AbsoluteFill style={{visibility:f<189?'hidden':'visible'}}><ScheduleScene {...p}/></AbsoluteFill>
</Sequence>
 <Sequence name="04 · 从桌面到掌心" from={8*fps} durationInFrames={2.5*fps} premountFor={fps}>
<MobileScene {...p}/>
</Sequence>
 <Sequence name="05 · 项目聚焦" from={10*fps} durationInFrames={3*fps} premountFor={fps}>
<ProjectsScene {...p}/>
</Sequence>
 <Sequence name="06 · 数据动起来" from={12.5*fps} durationInFrames={4*fps} premountFor={fps}>
<DataScene {...p}/>
</Sequence>
 <Sequence name="07 · 深浅切换" from={16.5*fps} durationInFrames={2*fps} premountFor={fps}>
<ThemeScene {...p}/>
</Sequence>
 <Sequence name="08 · 品牌收尾" from={18.5*fps} durationInFrames={3.5*fps} premountFor={fps}>
<BrandScene {...p}/>
</Sequence>
</>};
const BrandLoop=(p:Settings)=>{const f=useCurrentFrame();const {fps}=useVideoConfig();return <Freeze frame={1.5*fps+f}><BrandScene {...p}/></Freeze>};
export const Root=()=> <>
 <Composition id="XELA-Opening" component={XELA} schema={schema} width={1920} height={1080} fps={30} durationInFrames={660} defaultProps={{backgroundImage:'background.png',backgroundFit:'cover' as const,backgroundColor:'#edf0fa',showCaptions:false}}/>
 <Folder name="Scenes">
  <Composition id="Shot-01" component={OpeningScene} schema={schema} width={1920} height={1080} fps={30} durationInFrames={75} defaultProps={{backgroundImage:'background.png',backgroundFit:'cover' as const,backgroundColor:'#edf0fa',showCaptions:false}}/>
  <Composition id="Shot-02" component={OrdersScene} schema={schema} width={1920} height={1080} fps={30} durationInFrames={114} defaultProps={{backgroundImage:'background.png',backgroundFit:'cover' as const,backgroundColor:'#edf0fa',showCaptions:false}}/>
  <Composition id="Shot-03" component={ScheduleScene} schema={schema} width={1920} height={1080} fps={30} durationInFrames={75} defaultProps={{backgroundImage:'background.png',backgroundFit:'cover' as const,backgroundColor:'#edf0fa',showCaptions:false}}/>
  <Composition id="Shot-04" component={MobileScene} schema={schema} width={1920} height={1080} fps={30} durationInFrames={75} defaultProps={{backgroundImage:'background.png',backgroundFit:'cover' as const,backgroundColor:'#edf0fa',showCaptions:false}}/>
  <Composition id="Shot-05" component={ProjectsScene} schema={schema} width={1920} height={1080} fps={30} durationInFrames={90} defaultProps={{backgroundImage:'background.png',backgroundFit:'cover' as const,backgroundColor:'#edf0fa',showCaptions:false}}/>
  <Composition id="Shot-06" component={DataScene} schema={schema} width={1920} height={1080} fps={30} durationInFrames={120} defaultProps={{backgroundImage:'background.png',backgroundFit:'cover' as const,backgroundColor:'#edf0fa',showCaptions:false}}/>
  <Composition id="Shot-07" component={ThemeScene} schema={schema} width={1920} height={1080} fps={30} durationInFrames={60} defaultProps={{backgroundImage:'background.png',backgroundFit:'cover' as const,backgroundColor:'#edf0fa',showCaptions:false}}/>
  <Composition id="Shot-08" component={BrandScene} schema={schema} width={1920} height={1080} fps={30} durationInFrames={105} defaultProps={{backgroundImage:'background.png',backgroundFit:'cover' as const,backgroundColor:'#edf0fa',showCaptions:false}}/>
  <Composition id="Ending-Loop" component={BrandLoop} schema={schema} width={1920} height={1080} fps={30} durationInFrames={60} defaultProps={{backgroundImage:'background.png',backgroundFit:'cover' as const,backgroundColor:'#edf0fa',showCaptions:false}}/>
 </Folder>
 <Folder name="Reference">
  <Composition id="Cylinder-Reference" component={CylinderText} width={1920} height={1080} fps={30} durationInFrames={180}/>
 </Folder>
</>;
