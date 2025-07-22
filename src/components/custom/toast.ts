import { ReactNode } from "react";
import { ExternalToast, toast as sonnerToast } from "sonner";

type titleT = (() => ReactNode) | ReactNode;

const { success, error, warning, ...otherVariants } = sonnerToast;

export const toast = {
  success(message: titleT, data?: ExternalToast) {
    success(message, {
      ...data,
      className: "!bg-green-500 !text-white !text-xl !font-sans",
    });
  },
  error(message: titleT, data?: ExternalToast) {
    error(message, {
      ...data,
      className: "!bg-red-500 !text-white !text-xl !font-sans",
    });
  },

  warning(message: titleT, data?: ExternalToast) {
    warning(message, {
      ...data,
      className: "!bg-yellow-500 !text-black !text-xl !font-sans",
    });
  },
  ...otherVariants,
};
