import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const sourceArg=process.argv[2]||process.env.PROPROGER_SOURCE_DIR;
if(!sourceArg){
  console.error('Usage: node scripts/verify-recovered-source.mjs <unpacked-source-root>');
  process.exit(2);
}
const source=path.resolve(sourceArg);
const pins=JSON.parse(fs.readFileSync(new URL('../recovery/v8.16.0-critical-files.json',import.meta.url),'utf8'));

for(const item of pins.files){
  const candidate=path.join(source,item.path);
  if(!fs.existsSync(candidate))throw new Error('missing: '+item.path);
  const bytes=fs.readFileSync(candidate);
  const hash=createHash('sha256').update(bytes).digest('hex');
  if(bytes.length!==item.size)throw new Error(`size mismatch: ${item.path}`);
  if(hash!==item.sha256)throw new Error(`sha256 mismatch: ${item.path}`);
}

const manifest=JSON.parse(fs.readFileSync(path.join(source,'src','manifest.json'),'utf8'));
if(manifest.version!=='8.16.0')throw new Error('expected recovered manifest version 8.16.0');

const js=fs.readdirSync(path.join(source,'src')).filter(x=>x.endsWith('.js'));
for(const file of js){
  const r=spawnSync(process.execPath,['--check',path.join(source,'src',file)],{stdio:'inherit'});
  if(r.status!==0)throw new Error('syntax failed: '+file);
}
for(const test of ['core-smoke.mjs','extended-core.mjs','static-contract.mjs']){
  const file=path.join(source,'tests',test);
  if(!fs.existsSync(file))continue;
  const r=spawnSync(process.execPath,[file],{cwd:source,stdio:'inherit'});
  if(r.status!==0)throw new Error('test failed: '+test);
}
console.log(`PROPROGER recovered v8.16.0 verification: PASS (${pins.files.length} pinned files, ${js.length} JS syntax checks)`);
