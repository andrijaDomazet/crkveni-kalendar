"use client";
import { useScriptContext } from "../../shared/ScriptProvider";
import { useAppTheme } from "../theme/ThemeProvider";
import SegmentedControl from "./SegmentedControl";

export default function SettingsScreen() {
  const { script, toggleScript, cyr } = useScriptContext();
  const { mode, setMode, fontSize, setFontSize } = useAppTheme();

  const fontOptions = [
    { value: "normal", label: cyr("Normalna") },
    { value: "large", label: cyr("Veća") },
    { value: "xlarge", label: cyr("Najveća") },
  ];

  const themeOptions = [
    { value: "system", label: cyr("Sistem") },
    { value: "light", label: cyr("Svetla") },
    { value: "dark", label: cyr("Tamna") },
  ];
  const scriptOptions = [
    { value: "cyrillic", label: "Ћирилица" },
    { value: "latin", label: "Latinica" },
  ];

  return (
    <article className="app-card app-settings">
      <h2>{cyr("Izgled")}</h2>

      <div className="app-settings__row">
        <span className="app-settings__label">{cyr("Tema")}</span>
        <SegmentedControl
          label={cyr("Tema")}
          options={themeOptions}
          value={mode}
          onChange={setMode}
        />
      </div>

      <div className="app-settings__row">
        <span className="app-settings__label">{cyr("Veličina slova")}</span>
        <SegmentedControl
          label={cyr("Veličina slova")}
          options={fontOptions}
          value={fontSize}
          onChange={setFontSize}
        />
      </div>

      <div className="app-settings__row">
        <span className="app-settings__label">{cyr("Pismo")}</span>
        <SegmentedControl
          label={cyr("Pismo")}
          options={scriptOptions}
          value={script}
          onChange={(value) => value !== script && toggleScript()}
        />
      </div>
    </article>
  );
}
