# reader-tts

## Languages: [中文](README.md) | [한국어](README.ko.md) | [English](README.en.md)

A command-line tool to read Markdown files aloud using Text-to-Speech (TTS). Allows you to read Markdown files directly from the terminal without opening a browser.

## Features

- Read Markdown files aloud using Text-to-Speech
- Adjustable reading speed (faster than 2x for when 2x is too slow)  
- Volume control
- Quiet mode option
- Support for .md and .markdown extensions
- Error handling and validation 
- macOS Finder integration option

## Installation

```bash
npm install -g reader-tts
```

## Usage

Basic usage:
```bash
# Basic usage
reader-tts myfile.md

# With custom speed (default: 1.0)
reader-tts myfile.md --speed 1.5

# With volume control (0.0 to 1.0, default: 1.0) 
reader-tts myfile.md --volume 0.8

# With quiet mode (suppress status messages)
reader-tts myfile.md --quiet

# All options combined
reader-tts myfile.md --speed 2.0 --volume 0.7 --quiet

# Install right-click context menu (macOS)
reader-tts --install-right-click
```

## Parameters

- `[file]`: Path to the markdown file (required unless using --install-right-click)
- `-s, --speed [speed]`: Reading speed multiplier (default: 1.0)
- `-r, --rate [rate]`: Alternative speed parameter name (default: 1.0) 
- `-v, --voice [voice]`: Voice to use (uses system default if not specified)
- `--volume [volume]`: Volume level from 0.0 to 1.0 (default: 1.0)
- `--quiet`: Suppress status and metadata messages
- `--install-right-click`: Show instructions for macOS Finder integration
- `-h, --help`: Display help information
- `-V, --version`: Display version information

## macOS Finder Integration

To add a "Read with TTS" option to the right-click context menu in Finder:

1. Run: `reader-tts --install-right-click`
2. Follow the printed instructions to set up an Automator Quick Action 

## System Requirements

- Node.js 14.0+
- OS with Text-to-Speech capabilities
  - macOS: Built-in `say` command (native support)
  - Linux: `espeak` or `festival` (may need to be installed)
  - Windows: SAPI (System Audio Programming Interface)

## License

MIT License