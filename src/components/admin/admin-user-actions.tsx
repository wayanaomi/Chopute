"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AdminUserActionsProps {
  userId: string;
  plan: "FREE" | "UNLIMITED";
  isActive: boolean;
  isAdmin: boolean;
  freeSearchesGranted: number;
}

export function AdminUserActions({
  userId,
  plan,
  isActive,
  isAdmin,
  freeSearchesGranted,
}: AdminUserActionsProps) {
  const [loading, setLoading] = useState(false);
  const [allocation, setAllocation] = useState(
    String(freeSearchesGranted)
  );

  async function performAction(
    action:
      | "upgrade"
      | "downgrade"
      | "deactivate"
      | "reactivate"
      | "delete"
  ) {
    if (loading || isAdmin) return;

    if (action === "delete") {
      const confirmed = window.confirm(
        "Delete this user permanently? This will remove their Chopute account and associated data. This cannot be undone."
      );

      if (!confirmed) return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/admin/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Could not update user."
        );
      }

      window.location.reload();
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Could not update user."
      );
    } finally {
      setLoading(false);
    }
  }

  async function setFreeSearchAllocation() {
    if (loading || isAdmin) return;

    const value = Number(allocation);

    if (
      !Number.isInteger(value) ||
      value < 0 ||
      value > 10000
    ) {
      window.alert(
        "Enter a whole number between 0 and 10,000."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/admin/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "set-free-searches",
            freeSearchesGranted: value,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Could not update free-search allocation."
        );
      }

      window.location.reload();
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Could not update free-search allocation."
      );
    } finally {
      setLoading(false);
    }
  }

  if (isAdmin) {
    return (
      <span className="text-xs text-[#9ca3af]">
        Protected
      </span>
    );
  }

  return (
    <div className="flex min-w-[290px] flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {plan === "UNLIMITED" ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="border border-[#f4771f] bg-white text-[#f4771f] hover:bg-[#fff7ed]"
            onClick={() =>
              performAction("downgrade")
            }
            disabled={loading}
          >
            Downgrade
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            className="bg-[#f4771f] text-white hover:bg-[#e96b15]"
            onClick={() =>
              performAction("upgrade")
            }
            disabled={loading}
          >
            Upgrade
          </Button>
        )}

        {isActive ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="border border-red-200 bg-white text-red-600 hover:bg-red-50"
            onClick={() =>
              performAction("deactivate")
            }
            disabled={loading}
          >
            Deactivate
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            className="bg-[#f4771f] text-white hover:bg-[#e96b15]"
            onClick={() =>
              performAction("reactivate")
            }
            disabled={loading}
          >
            Reactivate
          </Button>
        )}

        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="border border-red-300 bg-white text-red-600 hover:bg-red-50"
          onClick={() =>
            performAction("delete")
          }
          disabled={loading}
        >
          Delete
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          min={0}
          max={10000}
          value={allocation}
          onChange={(event) =>
            setAllocation(event.target.value)
          }
          className="h-9 w-24 rounded-lg border border-[#f3c49f] bg-white px-3 text-sm text-[#111827] outline-none transition focus:border-[#f4771f] focus:ring-2 focus:ring-[#f4771f]/10"
          aria-label="Free search allocation"
        />

        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="border border-[#f4771f] bg-white text-[#f4771f] hover:bg-[#fff7ed]"
          onClick={setFreeSearchAllocation}
          disabled={loading}
        >
          Set searches
        </Button>
      </div>
    </div>
  );
}