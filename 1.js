#!/usr/bin/env node
const { execSync } = require('child_process');

console.log(`
 █████   █████                                 ███       ███████████                              ████████  █████ █████ 
░░███   ░░███                                 ░░░███    ░░███░░░░░███                            ███░░░░███░░███ ░░███  
 ░███    ░███   ██████  █████ █████             ░░░███   ░███    ░███  ██████    █████   ██████ ░███   ░░░  ░███  ░███ █
 ░███████████  ███░░███░░███ ░░███  ██████████    ░░░███ ░██████████  ░░░░░███  ███░░   ███░░███░█████████  ░███████████
 ░███░░░░░███ ░███████  ░░░█████░  ░░░░░░░░░░      ███░  ░███░░░░░███  ███████ ░░█████ ░███████ ░███░░░░███ ░░░░░░░███░█
 ░███    ░███ ░███░░░    ███░░░███               ███░    ░███    ░███ ███░░███  ░░░░███░███░░░  ░███   ░███       ░███░ 
 █████   █████░░██████  █████ █████            ███░      ███████████ ░░████████ ██████ ░░██████ ░░████████        █████ 
░░░░░   ░░░░░  ░░░░░░  ░░░░░ ░░░░░            ░░░       ░░░░░░░░░░░   ░░░░░░░░ ░░░░░░   ░░░░░░   ░░░░░░░░        ░░░░░  
`);

let Clipboard;
try {
  Clipboard = execSync('powershell -noprofile -command "Get-Clipboard -Raw"', {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
} catch (e) {
  process.exit(1);
}

const Hex = (Clipboard || '').replace(/[^0-9a-fA-F]/g, '');
if (!Hex || Hex.length % 2 !== 0) {
  process.exit(2);
}

const Base64 = Buffer.from(Hex, 'hex')
  .toString('base64')
  .replace(/\+/g, '!')
  .replace(/\//g, '?')
  .replace(/=/g, '');

console.log(
  Array.from({ length: 14 }, (_, i) =>
    (Base64.slice(i * 8, i * 8 + 8) || '').padEnd(8, 'A')
  ).join('\n')
);
