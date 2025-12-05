import Link from "next/link";
import { useLocale } from "next-intl";
import { LinkToProps } from "@/types/LinkTo";


function LinkTo({ href, children, ...props }: LinkToProps) {
  const locale = useLocale();
  return (
    <Link {...props} href={href} locale={locale}>
      {children}
    </Link>
  );
}

export default LinkTo;
