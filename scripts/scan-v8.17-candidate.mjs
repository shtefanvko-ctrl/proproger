import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const candidate=path.resolve(process.argv[2]||'.');
const src=fs.existsSync(path.join(candidate,'src'))?path.join(candidate,'src'):candidate;
const manifestPath=fs.existsSync(path.join(src,'manifest.json'))?path.join(src,'manifest.json'):path.join(candidate,'manifest.json');
if(!fs.existsSync(manifestPath)){
  console.error(JSON.stringify({status:'NOT_CANDIDATE',reason:'manifest.json missing',candidate},null,2));
  process.exit(2);
}
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const required=[
  'content.js','background.js','project_brain.js','product_brain.js','decision_gate.js',
  'branch_recovery.js','auto_completion.js','worker_scheduler.js','file_locks.js','file_lock_client.js',
  'visual_brain.js','reference_set.js','screen_interpreter.js','visual_task_engine.js','visual_audit.js'
];
const missing=required.filter(file=>!fs.existsSync(path.join(src,file)));
const textFiles=[];
function walk(dir){
 for(const e of fs.readdirSync(dir,{withFileTypes:true})){
  if(e.name==='.git'||e.name==='node_modules')continue;
  const p=path.join(dir,e.name);
  if(e.isDirectory())walk(p);
  else if(/\.(js|mjs|txt|md|json)$/i.test(e.name)&&fs.statSync(p).size<2_000_000)textFiles.push(p);
 }
}
walk(candidate);
let goalClosureEvidence=[];
for(const file of textFiles){
 const content=fs.readFileSync(file,'utf8');
 if(/GOAL_CLOSURE_TEST|goal closure|goal_closure/i.test(content))goalClosureEvidence.push(path.relative(candidate,file));
}
let gitHead=null,containsExpectedCommit=false;
if(fs.existsSync(path.join(candidate,'.git'))){
 const head=spawnSync('git',['-C',candidate,'rev-parse','HEAD'],{encoding:'utf8'});
 if(head.status===0)gitHead=head.stdout.trim();
 const expected=spawnSync('git',['-C',candidate,'cat-file','-e','ec7894a^{commit}']);
 containsExpectedCommit=expected.status===0;
}
const hashes={};
for(const file of required){
 const p=path.join(src,file);
 if(fs.existsSync(p))hashes['src/'+file]=createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}
const result={
 status:manifest.version==='8.17.0'&&missing.length===0&&goalClosureEvidence.length>0?'CANDIDATE':'NOT_VERIFIED',
 candidate,
 manifestVersion:manifest.version||null,
 gitHead,
 containsExpectedCommit,
 expectedHistoricalCommit:'ec7894a',
 missing,
 goalClosureEvidence:[...new Set(goalClosureEvidence)].sort(),
 hashes
};
console.log(JSON.stringify(result,null,2));
if(result.status!=='CANDIDATE')process.exit(3);
