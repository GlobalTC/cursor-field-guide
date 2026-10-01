import { useState, type ReactNode } from "react";
import type { Os } from "../types";

export function Callout({
  kind = "official",
  title,
  children,
}: {
  kind?: "tip" | "warn" | "official";
  title?: string;
  children: ReactNode;
}) {
  const label =
    title ??
    (kind === "tip" ? "Practice" : kind === "warn" ? "Watch this" : "Official");
  return (
    <div className={`callout ${kind}`}>
      <div className="label">{label}</div>
      <div>{children}</div>
    </div>
  );
}

export function Prompt({
  label = "Try this prompt",
  children,
}: {
  label?: string;
  children: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="prompt">
      <div className="prompt-bar">
        <span>{label}</span>
        <button className="copy-btn" type="button" onClick={() => void copy()}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>{children}</pre>
    </div>
  );
}

export function Key({
  mac,
  win,
  os,
}: {
  mac: string;
  win: string;
  os: Os;
}) {
  return <kbd className="kbd">{os === "mac" ? mac : win}</kbd>;
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="steps">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
}

export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
