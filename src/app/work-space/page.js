import React, { Suspense } from "react";
import WorkSpaceComponent from "./_component/WorkSpaceComponent";

export default function Workspace() {
  return (
    <Suspense>
      <WorkSpaceComponent />
    </Suspense>
  );
}
