interface Props {
  title?: string;
  right?: React.ReactNode;
  wordmark?: boolean;
  subtitle?: string;
}
export function TopBar({ title, right, wordmark, subtitle }: Props) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-bg/80 px-5 pb-2 pt-4 backdrop-blur-md border-b border-border/40">
      <div>
        {wordmark ? (
          <span className="text-xl font-extrabold tracking-tight text-primary">MINGLEY</span>
        ) : (
          <h1 className="text-lg font-extrabold text-primary">{title}</h1>
        )}
        {subtitle && <p className="text-xs text-secondary mt-0.5">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}
