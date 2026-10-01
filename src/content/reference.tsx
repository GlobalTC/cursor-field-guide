import { Callout, Ext, Key, Prompt, Table } from "../components/ui";
import { useOs } from "../os-context";

export function ShortcutsChapter() {
  const os = useOs();
  return (
    <>
      <p className="lead">
        Use the toggle in the top bar for Mac vs Windows/Linux. Official
        reference is Mac-first; Help says swap Cmd→Ctrl and Opt→Alt. Remap
        anything from Keyboard Shortcuts:{" "}
        <Key mac="Cmd+R then Cmd+S" win="Ctrl+R then Ctrl+S" os={os} />.
      </p>
      <h2>Everyday</h2>
      <Table
        headers={["Action", "Chord"]}
        rows={[
          ["Toggle Agent / sidepanel", <Key mac="Cmd+I or Cmd+L" win="Ctrl+I or Ctrl+L" os={os} />],
          ["Inline edit (editor focused)", <Key mac="Cmd+K" win="Ctrl+K" os={os} />],
          ["Mode menu", <Key mac="Cmd+." win="Ctrl+." os={os} />],
          ["Rotate modes", <kbd>Shift+Tab</kbd>],
          ["Cycle models", <Key mac="Cmd+/" win="Ctrl+/" os={os} />],
          ["Cursor Settings", <Key mac="Cmd+Shift+J" win="Ctrl+Shift+J" os={os} />],
          ["VS Code settings", <Key mac="Cmd+," win="Ctrl+," os={os} />],
          ["Command palette", <Key mac="Cmd+Shift+P" win="Ctrl+Shift+P" os={os} />],
          ["Voice", <Key mac="Cmd+Shift+Space" win="Ctrl+Shift+Space" os={os} />],
          ["Accept Tab", <kbd>Tab</kbd>],
        ]}
      />
      <h2>Agent panel</h2>
      <Table
        headers={["Action", "Chord"]}
        rows={[
          ["Queue message", <kbd>Return</kbd>],
          ["Force send", <Key mac="Cmd+Return" win="Ctrl+Return" os={os} />],
          ["Cancel generation", <Key mac="Cmd+Shift+Backspace" win="Ctrl+Shift+Backspace" os={os} />],
          ["Accept all suggestions", <Key mac="Cmd+Return" win="Ctrl+Return" os={os} />],
          ["New chat", <Key mac="Cmd+N or Cmd+R" win="Ctrl+N or Ctrl+R" os={os} />],
          ["New chat tab", <Key mac="Cmd+T" win="Ctrl+T" os={os} />],
          ["Prev / next chat", <Key mac="Cmd+[ / Cmd+]" win="Ctrl+[ / Ctrl+]" os={os} />],
          ["Add selection to chat", <Key mac="Cmd+Shift+L" win="Ctrl+Shift+L" os={os} />],
        ]}
      />
      <h2>The three Cmd+Ks</h2>
      <Table
        headers={["Focus", "What Cmd/Ctrl+K does"]}
        rows={[
          ["Editor", "Inline edit"],
          ["Terminal", "Terminal prompt bar; Cmd/Ctrl+Return runs the generated command"],
          ["Agents Window", "Command palette / conversation search"],
        ]}
      />
      <Callout kind="official">
        <Ext href="https://cursor.com/docs/reference/keyboard-shortcuts">
          Keyboard shortcuts reference
        </Ext>
        . Help and the reference disagree on a couple of reject-all
        bindings. Prefer the reference, then confirm in the app.
      </Callout>
    </>
  );
}

export function WorkflowsChapter() {
  const os = useOs();
  return (
    <>
      <p className="lead">
        These are recipes, not laws. Each one picks a mode, a unit of
        context, and a verification step. Skip the ones that do not match
        the work in front of you.
      </p>
      <h2>Onboard to a foreign repo</h2>
      <ol>
        <li>Open the folder. Agent, Ask mode if you want a read-only pass.</li>
        <li>Explain-the-codebase prompt from The first hour.</li>
        <li>
          Ask for the test command, the dev server, and the one file that
          would be dangerous to edit casually.
        </li>
        <li>Make one small change and run the existing checks.</li>
      </ol>
      <h2>Ship a feature you can already describe</h2>
      <ol>
        <li>If it spans more than a couple of files, start in Plan.</li>
        <li>
          Ground the prompt in a file that already exists: "follow the
          pattern in <code>src/app/profile/page.tsx</code>."
        </li>
        <li>Approve the plan. Let Agent implement.</li>
        <li>Read the diff. Run tests. <code>/review-bugbot</code> before the PR.</li>
      </ol>
      <Prompt>{`Implement the approved plan. Do not expand scope. When you finish, run the existing test and typecheck commands and paste the output.`}</Prompt>
      <h2>A bug you can reproduce but cannot see</h2>
      <ol>
        <li>Debug mode. Give the stack trace and the exact reproduction.</li>
        <li>Let it instrument. You reproduce. It reads logs.</li>
        <li>Accept a targeted fix. Confirm it removed the instrumentation.</li>
      </ol>
      <h2>A bug you already understand</h2>
      <p>
        Stay in Agent, or use inline edit if it is one function. Debug mode
        is wasted motion when the fix is already in your head.
      </p>
      <h2>UI you can point at</h2>
      <p>
        Agents Window browser, Design Mode (
        <Key mac="Cmd+Shift+D" win="Ctrl+Shift+D" os={os} />
        ), Composer 2.5. Click the element. Say what is wrong. Paste a
        screenshot if the browser is not the running app.
      </p>
      <h2>A migration or a garden</h2>
      <p>
        That is a Project, not a chat. Write the safe approach with the
        coordinator, apply it to one PR, tighten the shared context, then
        let it walk the rest. Review more at the start than at the end.
      </p>
      <h2>A long objective on one machine</h2>
      <p>
        <code>/goal</code> if you have it. Otherwise Plan, then Agent, then
        a new chat for verification so the implementer is not grading its
        own homework.
      </p>
      <h2>Work while the lid is closed</h2>
      <p>
        Commit. Move to Cloud, or start from Slack / GitHub /{" "}
        <code>&</code> in the CLI. Do not expect dirty files to come along.
      </p>
    </>
  );
}

export function PitfallsChapter() {
  return (
    <>
      <p className="lead">
        Most of these are already in the docs. They keep showing up because
        the product is fast, and fast products invite skipping the gate.
      </p>
      <Table
        headers={["Pitfall", "What actually happens"]}
        rows={[
          ["Vague 'add a settings page'", "Agent invents layout, components, and an API."],
          ["One-shot a large feature", "Scope creeps. Plan, then smaller follow-ups."],
          ["Switch modes mid-task", "Fresh context window. The old thread is gone."],
          ["Assume rules apply to Tab / Cmd+K / Bugbot", "They do not."],
          ["Assume .cursorignore stops the terminal or MCP", "It does not."],
          ["Leave .env only in gitignore", "Default ignore covers .env*, but the terminal can still read it."],
          ["Put a rule in a .md file under .cursor/rules", "Ignored. It has to be .mdc."],
          ["Keep relying on .cursorrules", "Legacy, deprecating."],
          ["Call the window Composer", "Composer is a model. The UI is Agent / Agents Window."],
          ["Call them Background Agents", "Cloud Agents."],
          ["Teach an embeddings-index setup", "Current docs: Instant Grep, local."],
          ["Move to Cloud with a dirty tree", "Uncommitted files do not transfer."],
          ["Spawn vague subagents", "Official anti-pattern."],
          ["Untrusted automation memories", "Prompt injection into later runs."],
          ["Block Grok 4.6 on a team using Router", "Router turns off."],
          ["Require the Bugbot check and expect a merge block", "Findings are neutral by default."],
          ["Accept All, skip the repo's tests", "A fluent narrative is not a green build."],
        ]}
      />
      <h2>A short doctrine</h2>
      <ol>
        <li>Decide the autonomy before you type the prompt.</li>
        <li>Ground the work in a file that already exists.</li>
        <li>One job per chat. New work, new thread.</li>
        <li>The diff is the product. The story is advertising.</li>
        <li>Run the checks the repo already believes in.</li>
        <li>Promote a repeated correction into a rule, a lint, or a skill.</li>
        <li>If the work will outlive the afternoon, it is a Project.</li>
        <li>
          Shared context remembers how. You still have to write down what,
          and you still have to be the one who says it is done.
        </li>
      </ol>
      <h2>Keep these open</h2>
      <ul>
        <li>
          <Ext href="https://cursor.com/docs">Docs home</Ext>
        </li>
        <li>
          <Ext href="https://cursor.com/docs/get-started/quickstart">
            Quickstart
          </Ext>
        </li>
        <li>
          <Ext href="https://cursor.com/docs/agent/overview">Agent</Ext> ·{" "}
          <Ext href="https://cursor.com/docs/agent/plan-mode">Plan</Ext> ·{" "}
          <Ext href="https://cursor.com/docs/agent/debug-mode">Debug</Ext>
        </li>
        <li>
          <Ext href="https://cursor.com/docs/rules">Rules</Ext> ·{" "}
          <Ext href="https://cursor.com/docs/skills">Skills</Ext> ·{" "}
          <Ext href="https://cursor.com/docs/mcp">MCP</Ext>
        </li>
        <li>
          <Ext href="https://cursor.com/docs/cloud-agent">Cloud Agents</Ext> ·{" "}
          <Ext href="https://cursor.com/docs/agent/projects">Projects</Ext> ·{" "}
          <Ext href="https://cursor.com/docs/cli/overview">CLI</Ext>
        </li>
        <li>
          <Ext href="https://cursor.com/docs/bugbot">Bugbot</Ext> ·{" "}
          <Ext href="https://cursor.com/docs/models-and-pricing">
            Models & Pricing
          </Ext>{" "}
          ·{" "}
          <Ext href="https://cursor.com/docs/reference/keyboard-shortcuts">
            Shortcuts
          </Ext>
        </li>
        <li>
          <Ext href="https://cursor.com/changelog">Changelog</Ext> — the
          product moves. This guide is dated October 2026.
        </li>
      </ul>
    </>
  );
}
