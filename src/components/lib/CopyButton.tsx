import { useEffect, useState, ReactNode } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  copyText: string;
  buttonText: string | ReactNode;
  className?: string;
  iconClassName?: string;
}

export default function CopyButton({
  copyText,
  buttonText,
  className = "flex items-center gap-2 text-sm text-muted-foreground",
  iconClassName = "text-accent",
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isCopied) return;
    const id = setTimeout(() => setIsCopied(false), 1500);
    return () => clearTimeout(id);
  }, [isCopied]);

  const handleFallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(copyText);
      } else {
        handleFallbackCopy(copyText);
      }
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy:", err);
      handleFallbackCopy(copyText);
      setIsCopied(true);
    }
  };

  return (
    <button className={className} onClick={handleCopy} type="button">
      <span>{buttonText}</span>
      {isCopied ? (
        <Check className={`w-4 h-4 ${iconClassName}`} />
      ) : (
        <Copy className={`w-4 h-4 ${iconClassName}`} />
      )}
    </button>
  );
}
