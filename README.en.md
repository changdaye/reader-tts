# reader-tts

## Languages: [中文](README.md) | [한국어](README.ko.md) | [English](README.en.md)

A command-line tool to read Markdown files aloud using Text-to-Speech (TTS). Allows you to read Markdown files directly from the terminal without opening a browser.

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [System Requirements](#system-requirements)
- [Features](#features)
- [Usage](#usage)
- [Parameter Details](#parameter-details)
- [Examples](#examples)
- [macOS Integration](#macos-integration)
- [Troubleshooting](#troubleshooting)
- [Technical Details](#technical-details)
- [License](#license)

## Overview

reader-tts is a lightweight command-line tool that converts Markdown files to speech. It leverages the operating system's built-in text-to-speech (TTS) functionality and runs directly from the terminal with a fast and easy-to-use interface. This tool is specially designed for people who want to listen to Markdown content via speech without opening a browser application.

### Primary features:
- Efficient command-line interface
- Speed control support (Addresses the "2x speed is too slow" issue with faster options)
- Volume control
- Voice selection
- Support for mixed-language documents
- Silent mode option
- Complex Markdown element support (headers, lists, code blocks, etc.)
- Integrated error handling

## System Requirements

- Node.js v14.0 or higher
- Operating system with text-to-speech capability
  - macOS: Native support for built-in `say` command
  - Linux: Requires `espeak` or `festival` (may need additional installation)
  - Windows: System Audio Programming Interface (SAPI)

## Installation

### Recommended Installation Method
The easiest way to install is using npm globally:

```bash
npm install -g reader-tts
```

### Manual Installation
If you prefer to install the project manually:

1. Clone the project locally
```bash
git clone https://github.com/changdaye/reader-tts.git
cd reader-tts
```

2. Install project dependencies
```bash
npm install
```

3. Link globally
```bash
npm link
```

### Verify Installation
Ensure the program is installed correctly:

```bash
reader-tts --version
```

If you see the version number, the installation was successful.

## Features

- **Intelligent Text Parsing**: Automatically parses plain text content from Markdown files, preserving meaningful information while removing formatting.
- **Highly Customizable**: Control various parameters of speech playback such as speed, volume, speaker, etc.
- **Multiple Speed Support**: Supports speeds faster than 2x (addresses the need for "2x speed is too slow"), customizable according to preference.
- **Multiple File Formats**: Supports both `.md` and `.markdown` extensions.
- **Context Menu Integration**: Supports integration with right-click context menu in macOS.
- **Error Handling**: Provides friendly error notifications and validation.

## Usage

### Basic Usage
```bash
reader-tts <path-to-your-md-file>
```

For example:
```bash
reader-tts ./article.md
```

### Detailed Command Format
```bash
reader-tts [options] [file]
```

Options:
- `file`: Required parameter specifying the path to the Markdown file to be read
- `-s, --speed <speed>`: Reading speed (default: 1.0x)
- `-r, --rate <rate>`: Alternative parameter for rate value (default: 1.0x)
- `-v, --voice <voice>`: Voice to use (system default if not specified)
- `--volume <volume>`: Volume level (0.0 ~ 1.0, default: 1.0)
- `--quiet`: Hide information output
- `--install-right-click`: Install right-click option in macOS
- `-h, --help`: Output help information
- `-V, --version`: Show tool version

## Parameter Details

Each parameter has clear functionality and purposes to enhance user experience.

### Speed Control

`--speed` or `-s`: Controls reading speed, with a default value of `1.0x`, indicating normal speech pace.
- Values below `1.0` slow down reading: for example `0.8` indicates 0.8x speed
- Values above `1.0` accelerate reading: `1.5` indicates 1.5x speed
- **For "2x speed is too slow" requirement, you can set `--speed 3.0` or higher, e.g. `--speed 5.0`**

Example:
```bash
reader-tts README.md --speed 3.0  # Reading with 3.0x speed
```

### Voice Settings
`--voice` or `-v`: Allows you to select a specific voice available in your operating system. Different operating systems provide different voice libraries.

To check available voices depends on your OS. On macOS you can view or add voices via "System Preferences" > "Accessibility" > "Speech".

```bash
reader-tts README.md --voice "Alex"  # Using Alex voice to read
```

### Volume Level
`--volume`: Sets reading volume, ranging from `0.0` (mute) to `1.0` (max volume) with a default of `1.0`.
```bash
reader-tts README.md --volume 0.7  # Reading with 70% volume
```

### Quiet Mode
`--quiet`: In this mode, the tool will not output any status information, running speech directly.
```bash
reader-tts README.md --quiet  # Quiet mode, reading directly without outputting info
```

## Examples

Here are common command examples showing the flexibility of this tool.

### Basic Example
Simplest reading command, using default reading speed:
```bash
reader-tts document.md
```

### Different Speed Example
Increase speed by quickly getting an overview, or conserve time for familiar content:
```bash
# Slightly faster
reader-tts document.md --speed 1.5

# Meeting "2x speed too slow" requirement (faster than 2.0x)
reader-tts document.md --speed 3.5

# Faster speed (for listening to repetitive or memorized content)
reader-tts document.md --speed 5.0
```

### Volume and Speed Combination Example
Adjust multiple parameters simultaneously:
```bash
reader-tts important-notes.md --speed 2.0 --volume 0.6
```

### Fully Configured Example
Set multiple parameters for personalization experience:
```bash
reader-tts thesis.md --speed 1.8 --voice "Victoria" --volume 0.8 --quiet
```

## macOS Integration

This tool provides an integration solution with the macOS system, allowing easy access via right-click. Use the following command to activate this function:

```bash
reader-tts --install-right-click
```

This command will show the specific instructions for setting up the macOS right-click menu. Detailed steps are as follows:

1. **Creating a Quick Action Using Automator**:
   1. Open the pre-installed "Automator" application on macOS
   2. Select the "Quick Action" template and create new automation
   3. In the right "Library", find "Run Shell Script" and drag it to the workspace
   4. Configure this script:
      - Shell selector: `/bin/bash`
      - Pass input to: `as arguments`
      - Fill in the following command as script content:

      ```bash
      for f in "$@"; do reader-tts "$f"; done
      ```

      5. Save the workflow and assign it with a meaningful name such as "Read as TTS"

2. **Alternative Plan Using Script Editor** (if you don't need advanced automation):
   1. Open the built-in "Script Editor" application
   2. Paste the following AppleScript:

   ```applescript
   on run {input, parameters}
     repeat with aFile in input
       set filePath to POSIX path of (aFile as string)
       do shell script "reader-tts \"" & filePath & "\""
     end repeat
     return input
   end run
   ```

   3. Save as "Application"
   4. Move to `~/Library/Services/`
   5. Enable in System Preferences > Keyboard > Shortcuts > Services

### Using the Integrated Right-Click Option
After successful installation, you can right-click on any supported Markdown file and select the corresponding service to quickly read them.

## Troubleshooting

If you encounter any issues, refer to these solutions:

- **Can't find `reader-tts` command**
  - Confirm you correctly installed the tool globally
  - Check if npm global packages directory is in your `$PATH`
  - Try reinstalling: `npm install -g reader-tts`

- **No audio output**
  - Confirm your system supports TTS functionality
  - Check if you have speakers or headphones connected
  - Test system built-in TTS availability (macOS using `say hello`, Linux using `espeak hello`)

- **Specific voice unavailable**
  - Before using `--voice` parameter, verify that inputted voice name is supported by system
  - On some systems, you may need to download voice packs additionally

- **Empty file or wrong file format**
  - Confirm provided file exists and is not empty
  - Verify extension is `.md` or `.markdown`

## Technical Details

This project mainly consists of several modules:

- `bin/reader-tts`: Command-line entry point, handling parameter parsing
- `src/index.js`: Core functionality module, responsible for file parsing and audio synthesizing
- `src/context-menu.js`: Auxiliary functions specially handling macOS integration
- `package.json`: Defines dependencies and command entry

The TTS engine is based on open-source library [`say`](https://github.com/Marak/say.js), which wraps lower-level TTS functionality of each system.
- macOS: Uses built-in `say` command
- Linux: Accesses `festival` or `espeak` library
- Windows: Uses SAPI

Markdown parsing uses the high-performance `markdown-it` library capable of processing most standard and non-standard Markdown syntax.

## License

Copyright (c) 2026 Opencode

This project follows the MIT license - see the [LICENSE](./LICENSE) file for details.

---