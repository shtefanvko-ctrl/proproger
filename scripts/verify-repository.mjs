import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root=process.cwd();
const branch=process.env.GITHUB_REF_NAME||process.env.BRANCH_NAME||'local';
const required=['README.md','docs/VERSION_PROVENANCE.md','docs/RECOVERY_AUDIT.md'];
for(const file of required){if(!fs.existsSync(path.join(root,file)))throw new Error('missing repository control file: '+file)}
const provenance=fs.readFileSync(path.join(root,'docs/VERSION_PROVENANCE.md'),'utf8');
if(!provenance.includes('360de14'))throw new Error('authentic v8.8.1.2 provenance missing');
if(!provenance.includes('ec7894a'))throw new Error('verified v8.17.0 provenance missing');

const manifestPath=path.join(root,'src','manifest.json');
if(!fs.existsSync(manifestPath)){
  console.log('PROPROGER repository controls: PASS (documentation/migration tree; source tree not present)');
  process.exit(0);
}
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
if(branch==='main'&&manifest.version==='8.16.0')throw new Error('recovered v8.16.0 must not be promoted to main as latest');
if(branch==='recovered/v8.16.0'&&manifest.version!=='8.16.0')throw new Error('recovered/v8.16.0 branch must contain v8.16.0 manifest');
const js=fs.readdirSync(path.join(root,'src')).filter(x=>x.endsWith('.js')).sort();
for(const file of js){
  const r=spawnSync(process.execPath,['--check',path.join(root,'src',file)],{stdio:'inherit'});
  if(r.status!==0)throw new Error('syntax check failed: '+file);
}
if(fs.existsSync(path.join(root,'tests','core-smoke.mjs'))){
  const r=spawnSync(process.execPath,[path.join(root,'tests','core-smoke.mjs')],{stdio:'inherit'});
  if(r.status!==0)throw new Error('core smoke failed');
}
console.log(`PROPROGER source verification: PASS branch=${branch} version=${manifest.version} js=${js.length}`);
