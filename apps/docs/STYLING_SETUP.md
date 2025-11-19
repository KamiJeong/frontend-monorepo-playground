# UI Component Styling Setup

`apps/docs`에서 `packages/ui`의 Tailwind CSS 스타일을 사용하는 방법입니다.

## 설정 요약

### 1. 필요한 패키지 설치 ✅

`apps/docs/package.json`에 다음 의존성이 포함되어 있습니다:

```json
{
  "dependencies": {
    "@playground/tailwind-config": "workspace:^*",
    "@playground/ui": "workspace:^*"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "tailwindcss": "^4.1.17"
  }
}
```

### 2. Tailwind 설정 파일 생성 ✅

`apps/docs/tailwind.config.ts` 파일을 생성하여 `packages/ui`의 컴포넌트를 스캔하도록 설정했습니다:

```typescript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // UI 패키지의 컴포넌트도 스캔하도록 설정
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
};
```

### 3. Vite 설정 ✅

`apps/docs/vite.config.ts`에 Tailwind CSS 플러그인이 설정되어 있습니다:

```typescript
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // ...
});
```

### 4. Storybook 설정 ✅

**a. `.storybook/main.ts`**: Tailwind CSS 플러그인 추가

```typescript
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  // ...
  viteFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(tailwindcss());
    return config;
  },
};
```

**b. `.storybook/preview.ts`**: UI 패키지의 globals.css import

```typescript
import '@playground/ui/globals.css';
```

### 5. TypeScript 설정 ✅

`tsconfig.node.json`에 Tailwind config 파일 포함:

```json
{
  "include": ["vite.config.ts", "tailwind.config.ts", ".storybook"]
}
```

## 사용 방법

### 1. UI 컴포넌트 import

```typescript
import { Button } from '@playground/ui/button';
```

### 2. Story 파일 작성

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@playground/ui/button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};
```

### 3. Storybook 실행

```bash
yarn storybook
```

브라우저에서 `http://localhost:6006`으로 접속하여 스타일이 적용된 컴포넌트를 확인할 수 있습니다.

## 주요 포인트

1. **Content 경로**: Tailwind가 `packages/ui`의 파일들을 스캔하도록 `content` 배열에 경로를 추가해야 합니다.

2. **CSS Import**: Storybook의 `preview.ts`에서 `@playground/ui/globals.css`를 import하여 모든 디자인 토큰과 base 스타일을 로드합니다.

3. **Vite 플러그인**: Vite와 Storybook 둘 다 `@tailwindcss/vite` 플러그인을 사용하여 Tailwind를 처리합니다.

4. **Workspace Protocol**: `package.json`에서 `workspace:^*` 프로토콜을 사용하여 모노레포 내 패키지를 참조합니다.

## 문제 해결

### 스타일이 적용되지 않는 경우

1. Storybook 서버를 재시작합니다
2. `node_modules`를 삭제하고 `yarn install` 재실행
3. Tailwind config의 `content` 경로가 올바른지 확인

### TypeScript 에러

- `tsconfig.node.json`에 필요한 파일들이 포함되어 있는지 확인
- `moduleResolution`이 `bundler`로 설정되어 있는지 확인

