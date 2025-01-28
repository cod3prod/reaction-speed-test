# Reaction Speed Test

**Human Benchmark 스타일의 반응 속도 테스트 구현**

## 🎯 **프로젝트 목적**

### **핵심 목표**

- **useRef를 활용한 상태 관리**: React에서 DOM 요소 및 상태의 참조를 활용하여 게임 로직 구현했습니다.
- **useImperativeHandle과 createPortal 활용**: 커스텀 모달 컴포넌트 제어 및 React Portal을 통해 모달 DOM 구조 외부에 렌더링합니다.

## 🔨 **기술 스택**

- **주요 기술**: Next.js 15
- **스타일링**: Tailwind CSS

## 📝 **핵심 학습 내용**

### 1. useRef를 활용한 상태 관리

`useRef`를 사용해 DOM 요소 및 타이머 상태를 관리하며, 게임 상태를 제어합니다

```tsx
const intervalRef = useRef<number | null>(null);
const timeoutRef = useRef<number | null>(null);
const dialogRef = useRef<ResultModalHandle | null>(null);

useEffect(() => {
  if (history.length === 5) {
    setIsWaiting(true);
    setCanClick(false);
    dialogRef.current?.open();
  }

  return () => {
    clearTimeout(timeoutRef.current!);
    clearInterval(intervalRef.current!);
  };
}, [history]);
```

### 2. useImperativeHandle과 createPortal 활용

`useImperativeHandle`을 통해 부모 컴포넌트에서 모달 열기 기능 제공하고 `createPortal`을 사용해 모달을 DOM 트리 외부로 렌더링합니다.

```tsx
const ResultModal = forwardRef<ResultModalHandle, { history: number[] }>(
  ({ history }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const result = history.reduce((prev, curr) => prev + curr, 0);

    const [portalComponent, setPortalComponent] = useState<HTMLElement | null>(
      null
    );

    useImperativeHandle(ref, () => ({
      open: () => dialogRef.current?.showModal(),
    }));

    useEffect(() => {
      setPortalComponent(document.body);
    }, []);

    if (!portalComponent) return null;

    return createPortal(
      <dialog
        ref={dialogRef}
        className="w-full max-w-[300px] rounded-lg p-6 bg-white shadow-lg text-center animate__animated animate__zoomIn"
      >
        <form method="dialog" className="space-y-4">
          <p className="text-lg font-bold">RESULT</p>
          <p className="text-xl">{`${result / 5} ms`}</p>
          <button
            onClick={() => dialogRef.current?.close()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition"
          >
            Close
          </button>
        </form>
      </dialog>,
      portalComponent
    );
  }
);

ResultModal.displayName = "ResultModal";

export default ResultModal;
```

## ⚙️ **프로젝트 설정**

```bash
# 패키지 설치
npm install

# 로컬 개발 환경 실행
npm run dev
```
