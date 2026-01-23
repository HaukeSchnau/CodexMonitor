use std::env;
use std::path::PathBuf;

use crate::types::WorkspaceEntry;

pub(crate) fn resolve_workspace_codex_home(
    entry: &WorkspaceEntry,
    parent_path: Option<&str>,
) -> Option<PathBuf> {
    if entry.kind.is_worktree() {
        if let Some(parent_path) = parent_path {
            let legacy_home = PathBuf::from(parent_path).join(".codexmonitor");
            if legacy_home.is_dir() {
                return Some(legacy_home);
            }
        }
    }
    let legacy_home = PathBuf::from(&entry.path).join(".codexmonitor");
    if legacy_home.is_dir() {
        return Some(legacy_home);
    }
    None
}

pub(crate) fn resolve_effective_codex_home(
    entry: &WorkspaceEntry,
    parent_path: Option<&str>,
    active_env_home: Option<&str>,
) -> Option<PathBuf> {
    resolve_workspace_codex_home(entry, parent_path).or_else(|| {
        active_env_home.and_then(|value| {
            let trimmed = value.trim();
            if trimmed.is_empty() {
                None
            } else {
                Some(PathBuf::from(trimmed))
            }
        })
    })
}

pub(crate) fn resolve_default_codex_home() -> Option<PathBuf> {
    if let Ok(value) = env::var("CODEX_HOME") {
        if !value.trim().is_empty() {
            return Some(PathBuf::from(value.trim()));
        }
    }
    resolve_home_dir().map(|home| home.join(".codex"))
}

fn resolve_home_dir() -> Option<PathBuf> {
    if let Ok(value) = env::var("HOME") {
        if !value.trim().is_empty() {
            return Some(PathBuf::from(value));
        }
    }
    if let Ok(value) = env::var("USERPROFILE") {
        if !value.trim().is_empty() {
            return Some(PathBuf::from(value));
        }
    }
    None
}
