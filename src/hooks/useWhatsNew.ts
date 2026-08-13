import { useEffect, useState } from "react";
import {
  autoOpenChangelog,
  changelogByFile,
  CURRENT_VERSION,
} from "../data/changelog";
import type { ChangelogEntry } from "../data/changelog";
import { compareVersions } from "../utils/compareVerisons";

const STORAGE_KEY = "whatsnew_last_seen_version";

export const useWhatsNew = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [isCustom, setIsCustom] = useState(false);

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

  const dismiss = () => {
    if (!isCustom) {
      localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
    }
    setIsOpen(false);
    setIsCustom(false);
  };

  const showFile = (fileName: string) => {
    const entry = changelogByFile[fileName];
    if (!entry) {
      console.warn(`[useWhatsNew] No changelog file found for "${fileName}"`);
      return;
    }
    setEntries([entry]);
    setIsCustom(true);
    setIsOpen(true);
  };

  return { isOpen, entries, dismiss, showFile };
};