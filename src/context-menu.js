/**
 * macOS Right-click context menu installer
 * This module handles the installation of the "Read with TTS" option in Finder context menu
 */

const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

/**
 * Install context menu service for macOS via a helper script
 * @returns {boolean} Success status
 */
function installMacOSContextMenu() {
  if (os.platform() !== 'darwin') {
    console.error('Right-click context menu installation is only supported on macOS');
    return false;
  }

  console.log('Setting up instructions for installing macOS Finder right-click menu integration...');
  console.log('');
  
  try {
    // Check if we can execute required commands
    execSync('which osascript', { stdio: 'pipe' });
    
    console.log('SUCCESS: Will now guide you through manual setup of Finder integration.');
    console.log('');
    console.log("To create a \"Read with TTS\" option for Markdown files in macOS Finder:");
    console.log('');
    console.log('1. Open the Automator app (pre-installed on all Macs)');
    console.log('2. Create a new document');
    console.log('3. Select "Quicks Action" (or "Quick Action", formerly "Service") as your document type');
    console.log('4. In the workflow setup area:');
    console.log('   - Change "Workflow receives current" to "files or folders"');
    console.log('   - Change "in" to "Finder"');
    console.log('5. In the actions library (on the left):');
    console.log('   - Find "Run Shell Script" and drag it to the workflow area');
    console.log('6. Configure the shell script action:');
    console.log('   - Set "Shell" to: /bin/bash');
    console.log('   - Set "Pass input" to: "as arguments"');
    console.log('   - Enter the script: for f in "$@"; do reader-tts "$f"; done');
    console.log('7. Save the workflow with the name "Read with TTS"');
    console.log('');
    console.log('After saving, the "Read with TTS" option will appear in your right-click context menu for MD files.');
    console.log('Note: You may need to allow Automator to control Finder in System Preferences if prompted.');
    console.log('');
    console.log('Alternatively, you can create an AppleScript script:'); 
    console.log('');
    console.log('1. Open Script Editor (also pre-installed)');
    console.log('2. Paste this code:');
    console.log('on run {input, parameters}');
    console.log('  repeat with aFile in input',
    '    set filePath to POSIX path of (aFile as string)',
    '    do shell script "reader-tts \\"" & filePath & "\\""',
    '  end repeat',
    '  return input',
    'end run', ' '); 
    console.log('');
    console.log('3. Export as Application');
    console.log('4. Move to ~/Library/Services/');
    console.log('5. Go to System Preferences > Keyboard > Shortcuts > Services to enable it');
      
    return true;
  } catch (error) {
    console.error(`System requirement check failed: ${error.message}`);
    return false;
  }
}

module.exports = {
  installMacOSContextMenu
};