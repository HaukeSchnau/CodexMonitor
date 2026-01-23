import { describe, expect, it } from "vitest";
import {
  resolveActiveEnvironmentSelection,
  resolveEnvironmentLabel,
} from "./workspaceEnvironment";

const environments = [
  { id: "env-1", name: "Personal", codexHome: "/Users/me/.codex" },
  { id: "env-2", name: "  ", codexHome: "/Users/me/.codex-alt" },
  { id: "env-3", name: "Empty Home", codexHome: "   " },
];

describe("resolveEnvironmentLabel", () => {
  it("returns null when no environment id is set", () => {
    expect(resolveEnvironmentLabel(null, environments)).toBeNull();
    expect(resolveEnvironmentLabel(undefined, environments)).toBeNull();
  });

  it("returns the trimmed environment name when it exists", () => {
    expect(resolveEnvironmentLabel("env-1", environments)).toBe("Personal");
  });

  it("returns a placeholder when the name is empty", () => {
    expect(resolveEnvironmentLabel("env-2", environments)).toBe(
      "Unnamed environment",
    );
  });

  it("returns a fallback when the environment id is missing", () => {
    expect(resolveEnvironmentLabel("missing", environments)).toBe(
      "Unknown environment",
    );
  });
});

describe("resolveActiveEnvironmentSelection", () => {
  it("returns null when no environment id is set", () => {
    expect(resolveActiveEnvironmentSelection(null, environments)).toBeNull();
    expect(resolveActiveEnvironmentSelection(undefined, environments)).toBeNull();
  });

  it("returns null when the id is not found", () => {
    expect(resolveActiveEnvironmentSelection("missing", environments)).toBeNull();
  });

  it("returns null when the codex home is empty", () => {
    expect(resolveActiveEnvironmentSelection("env-3", environments)).toBeNull();
  });

  it("returns the resolved id and home for a valid environment", () => {
    expect(resolveActiveEnvironmentSelection("env-1", environments)).toEqual({
      id: "env-1",
      codexHome: "/Users/me/.codex",
    });
  });
});
