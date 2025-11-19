export function Button(props: { children: React.ReactNode }) {
  return (
    <button className="px-8 py-4 text-xl rounded-2xl bg-button-background text-button-foreground">
      {props.children}
    </button>
  );
}
