export function Button(props: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="px-6 py-3 text-base rounded-2xl bg-button-background text-button-foreground cursor-pointer"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
