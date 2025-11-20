import Link from "next/link";

export function NavigationLink(props: {
  children?: React.ReactNode;
  href: string;
  className?: string;
  disabled?: boolean;
}) {
  if (props.disabled)
    return <span className={props.className}>{props.children}</span>;
  return (
    <Link href={props.href} className={props.className}>
      {props.children}
    </Link>
  );
}
