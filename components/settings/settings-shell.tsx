"use client";

import SettingsHeader from "./settings-header";
import SettingsSidebar from "./settings-sidebar";
import SettingsPanelRenderer from "./settings-panel-renderer";

export default function SettingsShell() {
  return (
    <>
      {/* Sidebar */}

      <aside
        className="
          flex
          h-full
          w-[240px]
          flex-shrink-0
          flex-col
          border-r
          border-border
          bg-background
        "
      >
        <SettingsSidebar />
      </aside>

      {/* Content */}

      <section
  className="
    flex
    h-full
    min-h-0
    min-w-0
    flex-1
    flex-col
    bg-background
  "
>
        {/* Sticky Header */}

        <SettingsHeader />

        {/* Scroll Area */}

        <div
  className="
    h-full
    min-h-0
    flex-1
    overflow-y-auto
    overflow-x-hidden
  "
>
 <div
  className="
    mx-auto
    flex
    h-full
    w-full
    max-w-5xl
    flex-col
    px-8
    py-8
  "
>
            <div className="flex h-full flex-1 flex-col">
  <SettingsPanelRenderer />
</div>
          </div>
        </div>
      </section>
    </>
  );
}