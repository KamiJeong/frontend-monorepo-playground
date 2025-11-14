# 저장소 룰셋 적용 방법

이 디렉토리의 룰셋 JSON 파일들은 설정 템플릿으로 사용됩니다. GitHub 저장소에 적용하려면 다음 단계를 따르세요:

## GitHub UI를 통한 룰셋 적용

1. **저장소 설정으로 이동**
   - GitHub에서 저장소로 이동
   - **Settings** 탭 클릭
   - 왼쪽 사이드바에서 **Rules** → **Rulesets** 선택

2. **Main 브랜치 룰셋 생성**
   - **New ruleset** → **New branch ruleset** 클릭
   - 이름: `Main Branch Protection`
   - 시행 상태: **Active**
   - 대상 브랜치: "Include by pattern" 필드에 `main` 추가
   - `main-branch-protection.json`의 규칙 추가:
     - ✅ 삭제 제한
     - ✅ 선형 히스토리 필요
     - ✅ 병합 전 풀 리퀘스트 필요 (1개 승인 필요)
     - ✅ 강제 푸시 차단
   - **Create** 클릭

3. **Develop 브랜치 룰셋 생성**
   - **New ruleset** → **New branch ruleset** 클릭
   - 이름: `Develop Branch Protection`
   - 시행 상태: **Active**
   - 대상 브랜치: "Include by pattern" 필드에 `develop` 추가
   - `develop-branch-protection.json`의 규칙 추가:
     - ✅ 삭제 제한
     - ✅ 선형 히스토리 필요
     - ✅ 병합 전 풀 리퀘스트 필요 (1개 승인 필요)
     - ✅ Copilot 코드 리뷰 규칙 적용
     - ✅ 상태 확인: 'github-copilot/code-review' 통과 필요
     - ✅ 강제 푸시 차단
   - **Create** 클릭

4. **Gitflow 브랜치 룰셋 생성**
   - **New ruleset** → **New branch ruleset** 클릭
   - 이름: `Gitflow Branches`
   - 시행 상태: **Active**
   - 대상 브랜치: 패턴 추가:
     - `hotfix/*`
     - `feature/*`
     - `features/*`
     - `release/*`
   - 이 룰셋은 fetch/merge를 통한 브랜치 생성은 제한되며, 기존 브랜치의 업데이트만 허용합니다
   - **Create** 클릭

## 대안: GitHub API 사용

GitHub REST API를 사용하여 프로그래밍 방식으로 룰셋을 적용할 수도 있습니다. 이 디렉토리의 JSON 파일들을 API 요청의 페이로드로 사용할 수 있습니다.

`curl`을 사용한 예시:

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/rulesets \
  -d @main-branch-protection.json
```

## 검증

룰셋 생성 후 활성 상태인지 확인:
1. **Settings** → **Rules** → **Rulesets**로 이동
2. "Active" 상태로 나열된 세 개의 룰셋이 표시되어야 합니다
3. 각 룰셋을 클릭하여 설정된 규칙을 검토하세요

## 참고사항

- 룰셋을 생성하고 수정하려면 저장소 관리자 권한이 필요합니다
- 룰셋은 생성 즉시 효력이 발생합니다
- 시행 상태를 "Disabled"로 변경하여 일시적으로 룰셋을 비활성화할 수 있습니다
- 특정 사용자나 팀이 규칙을 우회해야 하는 경우 bypass actors를 설정하는 것을 고려하세요

## 참고 자료

- [GitHub 룰셋 문서](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [GitHub REST API - 룰셋](https://docs.github.com/en/rest/repos/rules)
