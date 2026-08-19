"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExportCsvButton({ searchId }: { searchId?: string }) {
  const href = searchId ? `/api/leads/export?searchId=${searchId}` : "/api/leads/export";

  return (
    <a href={href} download>
      <Button variant="outline" size="sm" className="border-[#f4771f] text-[#f4771f] hover:bg-[#f4771f]/10 hover:text-[#f4771f]">
        <Download className="h-4 w-4" />
        Export CSV
      </Button>
    </a>
  );
}
