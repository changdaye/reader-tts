# reader-tts

## Languages: [中文](README.md) | [한국어](README.ko.md) | [English](README.en.md)

A command-line tool to read Markdown files aloud using Text-to-Speech (TTS). 可以让您无需打开浏览器直接从终端朗读 Markdown 文件。

## 目录
- [概述](#概述)
- [安装](#安装)
- [系统要求](#系统要求)
- [功能](#功能)
- [使用方法](#使用方法)
- [参数详解](#参数详解)
- [使用示例](#使用示例)
- [macOS 集成](#macOS-集成)
- [故障排除](#故障排除)
- [技术细节](#技术细节)
- [许可协议](#许可协议)

## 概述

reader-tts 是一个轻量级的命令行工具，可将 Markdown 文件转换为语音。它直接使用操作系统内置的文本转语音（TTS）功能，在终端中运行，具有快速且易于使用的接口。这款工具特别为那些希望通过语音听取 Markdown 内容而不想在浏览器中打开应用的人们所设计。

### 主要特点:
- 高效的命令行界面
- 支持速度控制（解决了“2倍速度太慢”的问题，支持更高的速度）
- 体积控制
- 语音种类选择
- 支持中英混合文档
- 静默模式选项
- 复杂的 Markdown 元素支持（标题、列表、代码块等）
- 集成式错误处理

## 系统要求

- Node.js v14.0 或更高版本
- 操作系统具备文本转语音（TTS）功能
  - macOS: 自动支持内置 `say` 命令
  - Linux: 需要 `espeak` 或 `festival`（可能会需要额外安装）
  - Windows: 系统音频编程接口（SAPI）

## 安装

### 推荐安装 - 从 npm 安装
最简单的安装方式是使用 npm 全局安装：

```bash
npm install -g reader-tts
```

### 从 GitHub Packages 安装
您也可从 GitHub Packages 中安装：

1. **首次使用前需要配置认证：**
   ```bash
   npm config set @changdaye:registry https://npm.pkg.github.com
   npm login --registry=https://npm.pkg.github.com
   ```

2. **从 GitHub Packages 安装：**
   ```bash
   npm install -g @changdaye/reader-tts
   ```
   
   或者使用 npx 运行（无需永久安装）：
   ```bash
   npx @changdaye/reader-tts your-file.md
   ```

3. **或者不登录直接安装（如果包是公共的）：**
   ```bash
   npm install -g @changdaye/reader-tts --registry https://npm.pkg.github.com
   ```

### 手动安装
如果需要手动安装该项目：

1. 克隆项目到本地
```bash
git clone https://github.com/changdaye/reader-tts.git
cd reader-tts
```

2. 安装项目依赖
```bash
npm install
```

3. 进行全局链接
```bash
npm link
```

### 验证安装
确保正确安装了该程序：

```bash
reader-tts --version
```

如果看到版本号，说明安装成功。

## 功能

- **智能文本解析**: 自动从 Markdown 文件解析纯文本内容，保留有意义的信息并移除格式。
- **高度可定制**: 控制语音播放的各种参数，如语速、音量、发音人等。
- **多速度支持**: 支持比2倍更快的速度（满足“2倍速度太慢”的需求），可以根据您喜好自定义。
- **多文件格式**: 支持 `.md` 和 `.markdown` 两种扩展名的文件。
- **右键菜单集成**: 支持在 macOS 的 Finder 中集成右键菜单。
- **错误处理**: 提供友好的错误提示和验证信息。

## 使用方法

### 基本使用
```bash
reader-tts <path-to-your-md-file>
```

例如：
```bash
reader-tts ./article.md
```

### 详细指令格式
```bash
reader-tts [options] [file]
```
选项:
```
- `file`: 必需参数，指定要朗读的 Markdown 文件路径
- `-s, --speed <speed>`: 朗读速度 (默认值: 1.0x)
- `-r, --rate <rate>`: 速率值的备选参数 (默认值: 1.0x)
- `-v, --voice <voice>`: 使用的语音 (若未指定则使用系统默认语音)
- `--volume <volume>`: 音量 (0.0 ~ 1.0, 默认: 1.0)
- `--quiet`: 隐藏信息输出
- `--install-right-click`: 在 macOS 中安装右键菜单选项
- `-h, --help`: 输出帮助信息
- `-V, --version`: 显示工具版本

## 参数详解

每个参数的功能和用途都有明确的定义，以使用户体验更佳。

### 速度控制

`--speed` 或 `-s`：控制朗读速度，默认值是 `1.0x`，表示正常语速。
- 低于 `1.0` 的值会减缓朗读速度：例如 `0.8` 表示 0.8 倍速
- 高于 `1.0` 的值加快朗读速度：`1.5` 表示 1.5 倍速
- **对于 2 倍速度太慢的需求，您可以设置 `--speed 3.0` 或更高，比如 `--speed 5.0`**

例如：
```bash
reader-tts README.md --speed 3.0	# 以3.0x高速率进行朗读
```

### 语音设置
`--voice` 或 `-v`：允许您选择特定的操作系统中可用语音。不同的操作系统提供不同的语音库。

查看可用语音的方式取决于您的操作系统。在 macOS 中可通过“系统偏好设置” > “辅助功能” > “语音” 查看或添加语音。

```bash
reader-tts README.md --voice "Alex"	# 使用名为 Alex 的语音朗读
```

### 音量级别
`--volume`：设定朗读音量，范围从 `0.0`（静音）到 `1.0`（最大音量），默认值是 `1.0`。
```bash
reader-tts README.md --volume 0.7	# 以70%的音量进行朗读
```

### 静默模式
`--quiet`：在该模式下，工具将不会输出任何状态信息，直接运行朗读。
```bash
reader-tts README.md --quiet	# 静默模式，直接朗读不输出信息
```

## 使用示例

以下是常用的命令示例，展示了此工具的灵活性。

### 基础示例
最简单的朗读命令，以默认语速进行：
```bash
reader-tts document.md
```

### 不同语速示例
提高速度以快速获取摘要，或者为熟悉的内容节省时间：
```bash
# 略微快一点
reader-tts document.md --speed 1.5

# 满足“2倍速度太慢”需求（高于2.0x速度）
reader-tts document.md --speed 3.5

# 更快速度（比如听重复或熟记内容）
reader-tts document.md --speed 5.0
```

### 音量和语速结合示例
同时调整多个参数：
```bash
reader-tts important-notes.md --speed 2.0 --volume 0.6
```

### 完全配置的示例
设置多个参数以获得最佳个人化体验：
```bash
reader-tts thesis.md --speed 1.8 --voice "Victoria" --volume 0.8 --quiet
```

## macOS 集成

此工具提供了与 macOS 系统的集成解决方案，允许您通过右键单击来轻松访问功能。使用以下命令可激活此项功能：

```bash
reader-tts --install-right-click
```

该命令将展示设置 macOS 右键菜单的具体说明。详细过程如下：

1. **使用 Automator 创建快速操作**：
   1. 打开 macOS 预装的“Automator”应用程序
   2. 选择“快速操作”模板并创建新的自动化
   3. 在右侧“资源库”中找到“运行 Shell 脚本”并将其拖到工作区
   4. 配置此脚本：
      - Shell 选择：`/bin/bash`
      - 将输入传递到：`作为参数`
      - 脚本内容填入如下命令：

      ```bash
      for f in "$@"; do reader-tts "$f"; done
      ```

      5. 保存工作流，并赋予其有意义的名称如“阅读为 TTS”

2. **使用脚本编辑器创建替代方案**（如果您不需要高级自动化）：
   1. 打开内建“脚本编辑器”应用
   2. 粘贴如下 AppleScript：

   ```applescript
   on run {input, parameters}
     repeat with aFile in input
       set filePath to POSIX path of (aFile as string)
       do shell script "reader-tts \"" & filePath & "\""
     end repeat
     return input
   end run
   ```

   3. 保存为“应用程序”
   4. 移动至 `~/Library/Services/`
   5. 在系统偏好设置 > 键盘 > 快捷键 > 服务 中启用

### 使用集成的右键选项
成功安装后，你可以在任意支持的 Markdown 文件上右键单击并选择对应的服务来迅速朗读它们。

## 故障排除

如果遇到任何问题，请参考以下解决方案：

- **找不到 `reader-tts` 命令**
  - 确认您已正确全局安装了该工具
  - 检查 `$PATH` 中是否包含 npm 全局包的目录
  - 尝试重新安装：`npm install -g reader-tts`

- **没有语音输出**
  - 确认您的系统是否支持 TTS 功能
  - 检查您是否有扬声器或耳机
  - 测试系统内置 TTS 是否可用（macOS 使用 `say hello`, Linux 使用 `espeak hello`）

- **特定语音不可用**
  - 使用 `--voice` 参数前，请确保您输入的语音名称是系统支持的
  - 在某些系统中，您可能需要额外下载语音包

- **空文件或文件格式错误**
  - 确认您传递的文件存在且不为空
  - 验证扩展名为 `.md` 或 `.markdown`

## 技术细节

该项目主要由几个模块组成：

- `bin/reader-tts`: 命令行入口点，处理参数解析
- `src/index.js`: 核心功能模块，负责文件解析和音频合成
- `src/context-menu.js`: 专门处理 macOS 集成的辅助函数
- `package.json`: 定义依赖项和命令入口

TTS 引擎是基于开源库 [`say`](https://github.com/Marak/say.js)，该库封装了各系统底层的 TTS 功能。
- macOS: 利用内置的 `say` 命令
- Linux: 访问 `festival` 或 `espeak` 库
- Windows: 使用 SAPI

Markdown 解析使用了高性能的 `markdown-it` 库，可处理大部分标准和非标准 Markdown 语法。

## 许可协议

Copyright (c) 2026 Opencode

此项目遵循 MIT 许可协议 — 参阅 [LICENSE](./LICENSE) 文件了解详细信息。

---