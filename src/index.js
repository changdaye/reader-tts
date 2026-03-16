const fs = require('fs');
const path = require('path');
const markdownit = require('markdown-it');
const say = require('say');
const { installMacOSContextMenu } = require('./context-menu');

// Initialize markdown parser
const md = markdownit();

/**
 * Reads a Markdown file and uses TTS to read it aloud
 * @param {string} filePath - Path to the markdown file to read
 * @param {Object} options - Options for reading
 * @param {number} options.speed - Reading speed (default 1.0)
 * @param {string} options.voice - Voice name to use (empty string for system default)
 * @param {number} options.volume - Volume level (0.0 to 1.0)
 * @param {boolean} options.quiet - Whether to suppress status messages
 * @param {boolean} options.installRightClick - Flag to install context menu instead
 */
async function readMdFileAloud(filePath, options = {}) {
  // Check if we should install right-click context menu
  if (options.installRightClick) {
    installMacOSContextMenu();
    return Promise.resolve();
  }

  // Default options  
  const opts = {
    speed: options.speed || 1.0,
    voice: options.voice || '',
    volume: options.volume || 1.0,
    quiet: options.quiet || false
  };

  // Normalize the path and check if filepath is provided and valid
  if (!filePath) {
    console.error('Error: No file path provided');
    process.exit(1);
  }

  // Resolve the full file path
  const fullPath = path.resolve(filePath);

  // Check if file exists (we now use lstat to also recognize symlinks)
  let stats;
  try {
    stats = fs.lstatSync(fullPath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`Error: File does not exist: ${fullPath}`);
    } else {
      console.error(`Error: Could not access file: ${err.message}`);
    }
    process.exit(1);
  }
  
  // Check if path points to a file (not a directory)
  if (stats.isDirectory()) {
    console.error(`Error: Path is a directory, not a file: ${fullPath}`);
    process.exit(1);
  }

  // Check if it's a Markdown file
  const ext = path.extname(fullPath).toLowerCase();
  if (ext !== '.md' && ext !== '.markdown') {
    console.error(`Error: Not a markdown file: ${fullPath}`);
    console.log('Supported extensions: .md, .markdown');
    process.exit(1);
  }

  // Read the markdown file
  let markdownText;
  try {
    markdownText = fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    console.error(`Error: Could not read file: ${err.message}`);
    if (err.code === 'EACCES') {
      console.log('Make sure you have read permissions for this file.');
    } else if (err.code === 'EMFILE' || err.code === 'ENFILE') {
      console.log('Too many open files. System limit reached.');
    }
    process.exit(1);
  }

  // Check for empty file
  if (markdownText === '') {
    if (!opts.quiet) {
      console.log(`Warning: File is empty: ${fullPath}`);
    }
    if (!opts.quiet) {
      console.log('Playback completed (no text found).');
    }
    return Promise.resolve();
  }

  if (!opts.quiet) {
    console.log(`Reading file: ${fullPath}`);
    console.log(`Speed: ${opts.speed}x${opts.voice ? ', Voice: ' + opts.voice : ''}${opts.volume !== 1.0 ? ', Volume: ' + opts.volume : ''}`);
    console.log('');
  }

  // Convert markdown to plain text
  const plainText = extractPlainText(markdownText);

  if (plainText === '') {
    if (!opts.quiet) {
      console.log(`Warning: The markdown file has no readable text content.`);
      console.log('Playback completed (no text found).');
    }
    return Promise.resolve();
  }

  if (!opts.quiet) {
    console.log(`Text length: ${plainText.length} characters`);
    console.log('Starting playback...');
    console.log('');
  }

  // Try to speak the text
  return new Promise((resolve, reject) => {
    say.speak(plainText, opts.voice, opts.speed, opts.volume, (err) => {
      if (err) {
        console.error(`TTS Error: ${err.message}`);
        // Some TTS errors might be due to unsupported voice or other platform-specific issues
        if (err.message.toLowerCase().includes('voice')) {
          console.log('Voice may not be supported on this system. Using system default...');
          say.speak(plainText, null, opts.speed, opts.volume, secondaryErr => {
            if (secondaryErr) {
              console.error(`Secondary TTS Attempt Failed: ${secondaryErr.message}`);
              reject(secondaryErr);
              process.exit(1);
            } else {
              if (!opts.quiet) {
                console.log('\nBackup playback completed.');
              }
              resolve();
            }
          });
        } else {
          reject(err);
          process.exit(1);
        }
      } else {
        if (!opts.quiet) {
          console.log('\nPlayback completed.');
        }
        resolve();
      }
    });
  });
}

/**
 * Extract plain text from markdown by converting to HTML first then extracting text
 * @param {string} markdownText - Raw markdown text
 * @return {string} Plain text extracted from markdown
 */
function extractPlainText(markdownText) {
  // Convert markdown to HTML
  const html = md.render(markdownText);
  
  // Remove HTML tags to extract plain text
  const plainText = html.replace(/<[^>]*>/g, '');
  
  // Replace multiple whitespaces with single space
  let cleanedText = plainText.replace(/\s+/g, ' ');
  
  // Remove extra newlines created by removed HTML elements and trim
  cleanedText = cleanedText.replace(/\n/g, ' ').trim();
  
  return cleanedText;
}

// Export the function for command-line usage and module usage
module.exports = { readMdFileAloud, extractPlainText };

// If this file is run directly (not imported) parse the arguments
if (require.main === module) {
  // For manual testing if run directly
  console.log('This module should be used via the reader-tts command line tool.');
}