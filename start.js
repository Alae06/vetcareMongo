const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure MongoDB URI is set in the backend .env file
const envPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(envPath)) {
  console.error('Error: .env file missing in backend folder. Please create it first.');
  process.exit(1);
}

// Function to start a process
function startProcess(command, args, name, cwd) {
  console.log(`Starting ${name}...`);
  
  const proc = spawn(command, args, {
    cwd: cwd,
    shell: true,
    stdio: 'pipe'
  });
  
  proc.stdout.on('data', (data) => {
    console.log(`[${name}] ${data.toString().trim()}`);
  });
  
  proc.stderr.on('data', (data) => {
    console.error(`[${name}] ${data.toString().trim()}`);
  });
  
  proc.on('close', (code) => {
    console.log(`[${name}] process exited with code ${code}`);
  });
  
  return proc;
}

// Start backend
const backendProcess = startProcess(
  'node',
  ['server.js'],
  'Backend',
  path.join(__dirname, 'backend')
);

// Start frontend using development server
const frontendProcess = startProcess(
  'npm',
  ['start'],
  'Frontend',
  path.join(__dirname, 'frontend')
);

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down all processes...');
  backendProcess.kill();
  frontendProcess.kill();
  process.exit(0);
}); 