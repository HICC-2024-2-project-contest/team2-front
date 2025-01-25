# 프로젝트 세팅 가이드

## 요구 사항
- Node.js 버전: `v22.13.1`

## 해야할 것것
1. 터미널을 열고 아래 명령어를 실행합니다:

- 1 vita 설치 
```bash
   npm install --save-dev vite
```

- 2 package.json에 기록된 모든 의존성이 설치 (아마 안해도 되겠지만 한번 더 해주는 것)
```bash
   npm install
```
- 3 eslint vscode 익스펜션 설치

-main 브랜치를 pull 해서 작업 후 브랜치 생성해 커밋 해주세요

- 자기 작업 페이지 미리보기
```bash
   npm run dev
```
url링크~~/ → Home 페이지
url링크~~/trade → Trade 페이지

### 아래 브렌치 관리신경 써주세요요

---

   # 📋 Git 버전 관리 및 파일 네이밍 규칙

## 🌲 Git 버전 관리 전략

효율적인 협업을 위해 다음과 같은 브랜치 전략과 워크플로우를 사용합니다.

### 브랜치 전략

- **`main`**: 배포 가능한 안정된 코드만 포함.
- **`develop`**: 개발 브랜치로, 기능 브랜치가 병합되는 브랜치.
- **`feature/기능명`**: 새로운 기능 개발 브랜치.
- **`bugfix/버그명`**: 버그 수정 브랜치.
- **`hotfix/긴급수정명`**: 프로덕션 환경의 긴급 수정 브랜치.

### Git 워크플로우

1. **작업 시작**\
   새로운 작업은 `develop` 브랜치에서 **`feature/기능명`** 브랜치를 생성하여 시작합니다:

   ```bash
   git checkout develop
   git checkout -b feature/기능명
   ```

2. **버그 수정**\
   버그는 **`bugfix/버그명`** 브랜치에서 수정하고, 작업 완료 후 `develop` 브랜치로 병합합니다:

   ```bash
   git checkout -b bugfix/버그명
   ```

3. **프로덕션 배포**\
   배포 가능한 코드는 `develop` 브랜치에서 테스트를 거친 후 `main` 브랜치로 병합합니다:

   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```

---

## 📁 파일 네이밍 규칙

일관된 파일 네이밍 규칙을 통해 가독성과 유지보수성을 높입니다.

### 일반 규칙

1. **소문자 사용**: 파일명은 항상 소문자로 작성합니다.
2. **카멜케이스 또는 케밥케이스**: 파일명에 여러 단어가 포함될 경우 아래 규칙을 따릅니다:
   - **카멜케이스**: `fileName.jsx` (React 컴포넌트 등)
   - **케밥케이스**: `file-name.js` (일반 파일 등)
3. **확장자 사용**:
   - **React 컴포넌트**: `ComponentName.jsx`
   - **CSS/SCSS 파일**: `component-name.module.css` 또는 `component-name.scss`

### 디렉토리 구조별 예시

- **React 컴포넌트**:\
  컴포넌트 이름과 동일한 파일명으로 작성합니다.\
  예: `Header.jsx`, `Button.module.css`

- **CSS/SCSS 파일**:\
  스타일 파일은 컴포넌트와 동일한 이름으로 작성하되 확장자를 명확히 구분합니다.\
  예: `button.module.css`, `global.scss`

- **API 파일**:\
  API 요청과 관련된 파일은 기능에 따라 이름을 작성합니다.\
  예: `api.js`, `auth-service.js`

- **테스트 파일**:\
  각 파일에 대응하는 테스트 파일은 동일한 이름에 `.test`를 붙여 작성합니다.\
  예: `header.test.jsx`, `button.test.js`



# 프로젝트 작성 규칙

## Component
1. 영어 대문자로 시작

## State
2. 스테이트 변경 함수는 set 붙이기
```bash
   let [count, setCount] = useState(0);