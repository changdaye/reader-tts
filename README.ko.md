# reader-tts

## 언어: [中文](README.md) | [한국어](README.ko.md) | [English](README.en.md)

터미널에서 직접 마크다운 파일을 음성으로 읽어주는 명령줄 도구. 브라우저를 열지 않고 마크다운 파일을 바로 음성 출력할 수 있습니다.

## 기능

- 마크다운 파일을 음성으로 텍스트 읽기
- 조절 가능한 재생 속도 (2배속보다 빠른 속도 가능)
- 볼륨 조절
- 정숙 모드 옵션 
- .md 및 .markdown 확장자 지원
- 오류 처리 및 유효성 검사
- macOS 파인더 통합 옵션

## 설치

```bash
npm install -g reader-tts
```

## 사용법

기본 사용법:
```bash
# 기본 사용
reader-tts myfile.md

# 속도 지정 (기본값: 1.0)
reader-tts myfile.md --speed 1.5

# 볼륨 조절 (0.0 부터 1.0 까지, 기본값: 1.0) 
reader-tts myfile.md --volume 0.8

# 정숙 모드 (상태 메시지 표시 안함)
reader-tts myfile.md --quiet

# 모든 옵션 조합
reader-tts myfile.md --speed 2.0 --volume 0.7 --quiet

# macOS 파인더 통합 설치
reader-tts --install-right-click
```

## 파라미터

- `[file]`: 마크다운 파일 경로 (옵션 --install-right-click 사용 시 제외)
- `-s, --speed [speed]`: 재생 속도 배수 (기본값: 1.0)
- `-r, --rate [rate]`: 대체 속도 파라미터 이름 (기본값: 1.0)
- `-v, --voice [voice]`: 사용할 목소리 (지정하지 않으면 시스템 기본값 사용)
- `--volume [volume]`: 0.0 에서 1.0 범위의 볼륨 레벨 (기본값: 1.0)
- `--quiet`: 상태 및 메타데이터 메시지 표시 안함
- `--install-right-click`: macOS 파인더 통합을 위한 지침 표시
- `-h, --help`: 도움말 정보 표시
- `-V, --version`: 버전 정보 표시

## macOS 파인더 통합

파인더에서 오른쪽 클릭 컨텍스트 메뉴에 "Read with TTS" 옵션 추가:

1. 실행: `reader-tts --install-right-click`
2. 자동 생성되는 지침에 따라 자동화 퀵 액션 설정 

## 시스템 요구사항

- Node.js 14.0 이상 
- TTS(Tex-to-Speech) 기능이 있는 운영체제
  - macOS: 기본 `say` 명령 (내장 지원)
  - 리눅스: `espeak` 또는 `festival` (별도 설치 필요 가능)
  - 윈도우즈: SAPI(시스템 오디오 프로그래밍 인터페이스)

## 라이선스

MIT License