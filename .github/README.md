# 저장소 설정

이 디렉토리는 브랜치 룰셋, 이슈 템플릿, 풀 리퀘스트 템플릿을 포함한 GitHub 저장소 설정 파일들을 포함하고 있습니다.

## 브랜치 전략

이 저장소는 **Gitflow** 브랜치 모델을 따릅니다:

### 보호된 브랜치

- **`main`**: 프로덕션 배포 가능한 코드
  - PR에 최소 1개의 승인 필요
  - 선형 히스토리 필요
  - 직접 푸시 불가 (PR만 가능)
  - 강제 푸시 불가
  - 삭제 불가

- **`develop`**: 기능 통합 브랜치
  - PR에 최소 1개의 승인 필요
  - Copilot 코드 리뷰 필요 (※ Copilot 리뷰는 별도의 룰셋 규칙이 아니라, 필수 상태 체크(Required status check)로 적용됩니다)
  - 필수 상태 체크(Required status checks) 통과 필요
  - 선형 히스토리 필요
  - 직접 푸시 불가 (PR만 가능)
  - 강제 푸시 불가
  - 삭제 불가

### 작업 브랜치

- **`feature/*`** 또는 **`features/*`**: 새로운 기능
  - 분기 시작: `develop`
  - 병합 대상: `develop`
- **`hotfix/*`**: 긴급 수정
  - 분기 시작: `main`
  - 병합 대상: `main`과 `develop` 모두
- **`release/*`**: 릴리스 준비
  - 분기 시작: `develop`
  - 병합 대상: `main`과 `develop` 모두

## 브랜치 룰셋

룰셋은 `.github/rulesets/` 디렉토리에 저장되어 있습니다:

- `main-branch-protection.json`: main 브랜치 보호 규칙
- `develop-branch-protection.json`: develop 브랜치 보호 규칙
- `gitflow-branches.json`: feature, hotfix, release 브랜치 규칙

**참고**: 이 룰셋 파일들은 참조 문서입니다. 저장소에 적용하려면 GitHub UI를 통해 설정해야 합니다:
`Settings > Rules > Rulesets`

## 이슈 템플릿

`.github/ISSUE_TEMPLATE/`에서 사용 가능한 이슈 템플릿:

- **버그 리포트** (`bug_report.md`): 버그 및 이슈 보고용
- **기능 요청** (`feature_request.md`): 새로운 기능 제안용

## 풀 리퀘스트 템플릿

PR 템플릿 (`.github/PULL_REQUEST_TEMPLATE.md`)은 모든 풀 리퀘스트에 대한 표준화된 형식을 제공하여 다음을 보장합니다:

- 변경사항의 명확한 설명
- 적절한 분류
- 관련 이슈 링크
- 테스트 확인
- 검토 체크리스트

## 사용법

### Feature 브랜치 생성

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Hotfix 브랜치 생성

```bash
git checkout main
git pull origin main
git checkout -b hotfix/your-fix-name
```

### Release 브랜치 생성

```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0
```

## 참고 자료

- [GitHub 브랜치 보호 규칙](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub 룰셋](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [Gitflow 워크플로우](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
