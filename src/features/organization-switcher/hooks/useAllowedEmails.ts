import { useCallback, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export function useAllowedEmails() {
  const [allowedEmails, setAllowedEmails] = useState<Map<string, "">>(
    () => new Map(),
  );

  const addMail = useCallback(
    (newMail: string) => {
      const parseResult = z.string().email().safeParse(newMail);

      if (!parseResult.success) {
        toast.error("Invalid email");
        return;
      }

      if (allowedEmails.has(parseResult.data)) {
        toast.error("Email already present");
        return;
      }

      setAllowedEmails((prev) => {
        const newMap = new Map(prev);
        newMap.set(parseResult.data, "");
        return newMap;
      });
    },
    [allowedEmails],
  );

  const removeMail = useCallback((targetMail: string) => {
    const parseResult = z.string().email().safeParse(targetMail);

    if (!parseResult.success) {
      toast.error("Invalid email");
      return;
    }

    setAllowedEmails((prev) => {
      const newMap = new Map(prev);
      newMap.delete(parseResult.data);
      return newMap;
    });
  }, []);

  return { mails: Array.from(allowedEmails.keys()), addMail, removeMail };
}
