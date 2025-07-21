import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { IconAlertTriangleFilled, IconLogin2 } from "@tabler/icons-react";

export function NotAuthenticatedBanner() {
  return (
    <div className="ml-4 grid place-items-center gap-2 rounded-md bg-gray-100 p-5 shadow-sm">
      <p className="flex flex-wrap items-center justify-center gap-1 text-center text-xl">
        You are currently not signed in
        <IconAlertTriangleFilled />
      </p>
      <p className="flex flex-wrap justify-center gap-1 text-center text-xl">
        <RegisterLink className="flex items-center gap-1 font-semibold underline">
          <IconLogin2 />
          Sign In
        </RegisterLink>
        to save documents, share and much more
      </p>
    </div>
  );
}
