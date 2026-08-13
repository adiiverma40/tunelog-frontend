import { parseFrontmatter } from "../utils/parseFrontmatter";
import { compareVersions } from "../utils/compareVerisons";

export type ChangelogType = "release" | "silent";

export interface ChangelogEntry {
  version: string;
  date: string;
  type: ChangelogType;
  content: string;
}
const files = import.meta.glob("./changelog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const VALID_TYPES: ChangelogType[] = ["release", "silent"];
const VERSION_PATTERN = /^\d+\.\d+\.\d+/;

interface ParsedFile extends ChangelogEntry {
  filename: string;
}

const allEntries: ParsedFile[] = Object.entries(files).map(([path, raw]) => {
  const filename = path.split("/").pop()!;
  const version = filename.replace(/\.md$/, "");
  const { data, content } = parseFrontmatter(raw);
  const type: ChangelogType = VALID_TYPES.includes(data.type as ChangelogType)
    ? (data.type as ChangelogType)
    : "release";

  return { filename, version, date: data.date ?? "", type, content };
});

export const changelog: ChangelogEntry[] = allEntries
  .filter((e) => VERSION_PATTERN.test(e.version))
  .sort((a, b) => compareVersions(b.version, a.version));

export const changelogByFile: Record<string, ChangelogEntry> =
  Object.fromEntries(
    allEntries.map(({ filename, ...entry }) => [filename, entry]),
  );

export const autoOpenChangelog = changelog.filter((e) => e.type !== "silent");

export const CURRENT_VERSION = changelog[0]?.version ?? "0.0.0";
