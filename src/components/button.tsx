export function Button(props: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="px-8 py-4 text-xl rounded-2xl bg-button-background text-button-foreground"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
