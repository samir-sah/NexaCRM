import mark from "../../assets/nexacrm-mark.png";
import { cn } from "../../lib/utils";

/** The logo mark extracted from the supplied NexaCRM reference artwork. */
export function BrandMark({ className }) {
  return <img src={mark} alt="" aria-hidden="true" className={cn("object-contain", className)} />;
}
