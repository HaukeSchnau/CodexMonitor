import type { CodexEnvironment } from "../types";

export function resolveEnvironmentLabel(
  envId: string | null | undefined,
  environments: CodexEnvironment[],
): string | null {
  if (!envId) {
    return null;
  }
  const match = environments.find((env) => env.id === envId);
  if (!match) {
    return "Unknown environment";
  }
  const name = match.name.trim();
  return name ? name : "Unnamed environment";
}

export function resolveActiveEnvironmentSelection(
  envId: string | null | undefined,
  environments: CodexEnvironment[],
): { id: string; codexHome: string } | null {
  if (!envId) {
    return null;
  }
  const match = environments.find((env) => env.id === envId);
  if (!match) {
    return null;
  }
  const home = match.codexHome.trim();
  if (!home) {
    return null;
  }
  return { id: match.id, codexHome: home };
}
