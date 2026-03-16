# CLI 版 MD-TTS 阅读器使用教程

## 概述

CLI 版 MD-TTS 阅读器是一个命令行工具，可以让您直接在终端中朗读 Markdown 文件，无需打开浏览器。此工具支持多种参数和自定义选项，同时还可以集成到 macOS 右键菜单中。

## 安装

### 方法一：使用 NPM 全局安装
```bash
npm install -g reader-tts
```

### 方法二：从源代码安装
```bash
# 下载源码
git clone https://github.com/your-repo/reader-tts.git
cd reader-tts
npm install -g .
```

## 基本用法

### 朗读 Markdown 文件
```bash
reader-tts your-file.md
```

### 所有参数说明

- `reader-tts [文件路径] [选项]`

#### 选项：
- `-s, --speed [数值]`：设置朗读速度（默认为 1.0）- 解决了"2倍速度太慢"的问题，您可以设置更高的速度
- `-r, --rate [数值]`：另一种指定速度的方法
- `-v, --voice [声音名称]`：选择特定的声音
- `--volume [数值]`：设置音量大小（0.0 到 1.0，默认为 1.0）
- `--quiet`：静音模式（只播放朗读，不在终端输出任何信息）
- `--install-right-click`：安装 macOS 右键菜单集成
- `-h, --help`：显示帮助信息
- `-V, --version`：显示版本信息

### 使用示例

1. **基本朗读**
   ```bash
   reader-tts my-document.md
   ```

2. **快速朗读（解决"2倍太慢"问题）**
   ```bash
   reader-tts my-document.md --speed 3.0
   ```
   *注：您可以设置超过2.0的参数，如3.0、4.0来获得更快的朗读速度*

3. **调节音量**
   ```bash
   reader-tts my-document.md --volume 0.8
   ```

4. **同时设置速度和音量**
   ```bash
   reader-tts my-document.md --speed 2.5 --volume 0.7
   ```

5. **静音模式（不显示状态信息）**
   ```bash
   reader-tts my-document.md --quiet
   ```

6. **指定特定声音**
   ```bash
   reader-tts my-document.md --voice "Alex" --speed 1.5
   ```

7. **查看所有选项**
   ```bash
   reader-tts --help
   ```

## macOS 右键菜单集成

您可以将此工具集成到 macOS 文件资源管理器（Finder）的右键菜单中：

### 设置步骤：

1. 在终端中执行：
   ```bash
   reader-tts --install-right-click
   ```

2. 根据终端输出的说明进行手动设置：

   - 打开 macOS 自带的「自动化工具」（Automator）应用程序
   - 创建新文档，选择「快速操作」（从前曾用名「服务」）
   - 选择「工作流程接收」为「文件或文件夹」，在「Finder」中使用
   - 从左侧动作库中找到「运行 Shell 脚本」并将其拖到工作区
   - 配置脚本：
     - Shell 设为：`/bin/bash`
     - 传递输入为：「作为参数」
     - 输入脚本：`for f in "$@"; do reader-tts "$f"; done`
   - 保存为「朗读文档」

3. 现在在任意 `.md` 或 `.markdown` 文件上右键单击，应该能看到「朗读文档」选项

### 替代方法（使用 AppleScript）：
如果 Automator 方案不工作，您可以：

1. 打开「脚本编辑器」（也是预装应用）
2. 粘贴以下代码：
   ```applescript
   on run {input, parameters}
     repeat with aFile in input
       set filePath to POSIX path of (aFile as string)
       do shell script "reader-tts \"" & filePath & "\""
     end repeat
     return input
   end run
   ```
3. 导出为应用程序
4. 移至 `~/Library/Services/`
5. 在「系统偏好设置」>「键盘」>「快捷键」>「服务」中启用

## 技术细节

### TTS 引擎说明
工具使用 `say` 包，该包封装了系统的 TTS 功能：
- macOS：内置的 `say` 命令
- Linux：系统提供的 `espeak` 或 `festival`
- Windows：SAPI（系统音频编程接口）

### 支持的 Markdown 特性
- 标题（h1-h6）
- 段落文本
- 强调和斜体文本
- 列表（有序和无序）
- 代码块和内联代码（会被跳过，但在转换时考虑上下文）
- 引用块
- 以及其他标准 Markdown 元素

### 错误处理
- 如果文件不存在：显示 "文件不存在" 错误
- 如果不是 Markdown 文件：显示 "非 Markdown 文件" 错误
- 如果是文件夹路径：显示错误提示
- 如果权限不足：显示相应错误消息
- 如果指定的声音不可用：自动回退到系统默认声音

## 常见问题

1. **无法找到 `reader-tts` 命令？**
   - 确保已成功使用 `npm install -g reader-tts` 安装
   - 检查您的 PATH 环境变量是否包含了 NPM 的全局包路径

2. **声音没有播放？**  
   - 检查系统是否有可用的声音驱动
   - 确认您的系统支持文本转语音功能
   - 尝试使用不同的声音名称（使用 `--voice` 参数）

3. **2x 速度仍然感觉太慢？**
   - 您可以尝试更高数值：`--speed 3.0`, `--speed 4.0` 或更高

4. **如何知道有什么声音可以选择？**
   - 您可以通过查找您的操作系统的 TTS 文档来了解可用的声音列表
   - 或者使用系统的语音测试功能来浏览和尝试

## 卸载

如果您不再需要此工具，可以使用：
```bash
npm uninstall -g reader-tts
```

## 支持格式

- `.md`：标准 Markdown 文件
- `.markdown`：扩展 Markdown 文件

## 更新

要更新到最新版本，请使用：
```bash
npm update -g reader-tts
```

祝您好用！此工具旨在让您的 Markdown 阅读体验更加便捷高效。