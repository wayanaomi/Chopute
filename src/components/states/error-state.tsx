import { AlertTriangle } from "lucide-react";

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-danger/20 bg-danger-bg py-10 text-center">
      <AlertTriangle className="h-5 w-5 text-danger" />
      <p className="text-sm font-medium text-danger">{message}</p>
    </div>
  );
}
