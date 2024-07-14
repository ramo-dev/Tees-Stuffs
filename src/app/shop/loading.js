
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-primary"></div>
    </div>
  );
}

