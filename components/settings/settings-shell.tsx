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
          w-[300px]
          shrink-0
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
            min-h-0
            flex-1
            overflow-y-auto
            overflow-x-hidden
          "
        >

          <div
            className="
              mx-auto
              w-full
              max-w-7xl
              px-10
              py-8
            "
          >

            <SettingsPanelRenderer />

          </div>

        </div>

      </section>
    </>
  );
}