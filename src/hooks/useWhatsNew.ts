import { useEffect, useState, useCallback } from "react";
import {
  autoOpenChangelog,
  changelogByFile,
  CURRENT_VERSION,
} from "../data/changelog";
import type { ChangelogEntry } from "../data/changelog";
import { compareVersions } from "../utils/compareVerisons";
import { parseFrontmatter } from "../utils/parseFrontmatter";

const STORAGE_KEY = "whatsnew_last_seen_version";
const CUSTOM_DISMISSED_KEY = "whatsnew_dismissed_custom_versions";

export const useWhatsNew = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [isCustom, setIsCustom] = useState(false);

  const [activeCustomVersion, setActiveCustomVersion] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const lastSeen = localStorage.getItem(STORAGE_KEY);

    if (!lastSeen) {
      setEntries(autoOpenChangelog);
      setIsOpen(autoOpenChangelog.length > 0);
      return;
    }

    const unseen = autoOpenChangelog.filter(
      (e) => compareVersions(e.version, lastSeen) > 0,
    );
    if (unseen.length > 0) {
      setEntries(unseen);
      setIsOpen(true);
    }
  }, []);

  const dismiss = useCallback(() => {
    if (!isCustom) {
      // Standard changelog dismiss
      localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
    } else if (activeCustomVersion) {
      // Custom MD Code dismiss: save to dismissed array
      const dismissedStr = localStorage.getItem(CUSTOM_DISMISSED_KEY);
      const dismissedVersions: string[] = dismissedStr
        ? JSON.parse(dismissedStr)
        : [];

      if (!dismissedVersions.includes(activeCustomVersion)) {
        dismissedVersions.push(activeCustomVersion);
        localStorage.setItem(
          CUSTOM_DISMISSED_KEY,
          JSON.stringify(dismissedVersions),
        );
      }
    }

    setIsOpen(false);
    setIsCustom(false);
    setActiveCustomVersion(null);
  }, [isCustom, activeCustomVersion]);

  const showFile = useCallback((fileName: string) => {
    const entry = changelogByFile[fileName];
    if (!entry) {
      console.warn(`[useWhatsNew] No changelog file found for "${fileName}"`);
      return;
    }
    setEntries([entry]);
    setIsCustom(true);
    setActiveCustomVersion(null);
    setIsOpen(true);
  }, []);

  const showMDCode = useCallback((mdCode: string, version_no: string) => {
    const dismissedStr = localStorage.getItem(CUSTOM_DISMISSED_KEY);
    const dismissedVersions: string[] = dismissedStr
      ? JSON.parse(dismissedStr)
      : [];

    if (dismissedVersions.includes(version_no)) {
      return;
    }

    const { data, content } = parseFrontmatter(mdCode);

    const customEntry: ChangelogEntry = {
      version: version_no,
      date: data.date || new Date().toISOString().split("T")[0],
      content: content,
    };

    setEntries([customEntry]);
    setIsCustom(true);
    setActiveCustomVersion(version_no);
    setIsOpen(true);
  }, []);

  return { isOpen, entries, dismiss, showFile, showMDCode };
};
