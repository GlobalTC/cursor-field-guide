import { Callout, Ext, Key, Steps, Table } from "../components/ui";
import { useOs } from "../os-context";

export function ReviewChapter() {
  const os = useOs();
  return (
    <>
      <p className="lead">
        The agent will happily declare victory. Your job is the diff, the
        repo's real checks, and a second reader that is not the same
        conversation that wrote the code.
      </p>
      <h2>In the session</h2>
      <ul>
        <li>Read the diff. Accept or reject hunks; do not Accept All by habit.</li>
        <li>
          Checkpoints revert files. Git still exists. Use both. Checkpoints
          are local and are not a branch.
        </li>
        <li>
          <Key mac="Cmd+Shift+Backspace" win="Ctrl+Shift+Backspace" os={os} />{" "}
          cancels generation. The same chord rejects suggested changes in the
          official reference — confirm in your build if Help shows a shorter
          binding.
        </li>
        <li>
          Ask Agent to run <em>this</em> project's tests. A green story with
          no command output is not a test run.
        </li>
      </ul>
      <h2>Bugbot</h2>
      <p>
        Automated PR review for bugs, security, and quality. Comments come
        with explanations and fix suggestions. Enable repos in Automations →
        Bugbot after the git host is connected. It can run on every PR update,
        or on mention: <code>cursor review</code> / <code>bugbot run</code>.
        Verbose: <code>cursor review verbose=true</code>.
      </p>
      <p>
        Before you push, <code>/review-bugbot</code> in Agent (Cursor 3.7+,
        also web and CLI). Teach it with <code>@cursor remember [fact]</code>.
        Fix links open Cursor or cursor.com/agents. Optional autofix is a
        Cloud Agent that pushes a commit; it needs on-demand usage and
        storage, and it does not run in Legacy Privacy Mode.
      </p>
      <Callout kind="warn">
        <code>.cursor/rules/*.mdc</code> do not apply to Bugbot. Put review
        guidance in <code>.cursor/BUGBOT.md</code> (root plus nested; always
        include the root file) or in Bugbot Automations. The GitHub check is{" "}
        <code>Cursor Bugbot</code>; findings are <code>neutral</code> unless
        you enable fail-on-unresolved. Requiring the check does not, by
        default, block the merge.
      </Callout>
      <h2>Security Agents</h2>
      <p>
        <code>/review-security</code> is PR security review plus scheduled
        vuln scans, billed to the team pool. See{" "}
        <Ext href="https://cursor.com/docs/security-agents">
          Security Agents
        </Ext>
        .
      </p>
    </>
  );
}

export function ProjectsChapter() {
  return (
    <>
      <p className="lead">
        A Project is for work that outlives a chat: a feature with several
        PRs, a migration, a garden that never ends. You talk to a
        coordinator. The coordinator does not write the code. It plans,
        delegates to agents that do, and brings the work back.
      </p>
      <p>
        Projects live in the left-hand nav of the Agents Window and run on
        Cloud Agents. They launched September 10, 2026 and are rolling out.
        They are not available on Enterprise plans, and they are not
        available with Privacy Mode (Legacy), because the code lives on a
        cloud VM while they run.
      </p>
      <h2>Create one</h2>
      <Steps
        items={[
          "Agents Window → Projects → New Project.",
          "Pick an icon and a name. Empty name becomes New Project.",
          "Choose a workspace from the repos your cloud agents can see, and a model for the coordinator. Connect GitHub if the list is empty.",
          "Create Project, then describe the body of work. The coordinator takes it from there.",
        ]}
      />
      <h2>The three capabilities that make it a Project</h2>
      <Table
        headers={["Capability", "What it buys you"]}
        rows={[
          [
            "Cloud by default",
            "Closing the laptop does not stop it. More parallel agents than a laptop can host. A local agent is started only when something must run on your machine.",
          ],
          [
            "Shared context",
            "Files that sync across every cloud and local machine the Project uses. Research, artifacts, and 'how we test this service' accumulate. You stop onboarding the agent every Monday.",
          ],
          [
            "Subscriptions",
            "The coordinator watches Slack, a schedule, PRs, or CI and acts without a fresh prompt. A Listening pill appears once at least one subscription exists.",
          ],
        ]}
      />
      <h2>Three patterns Cursor uses internally</h2>
      <h3>Feature work</h3>
      <p>
        Research first, write it into shared context, plan, then implement
        and test slices in parallel. When it is time to try the feature, the
        coordinator can start a local agent. After it ships, the same
        Project can watch logs and bugs with the original decisions still
        attached.
      </p>
      <h3>Migrations</h3>
      <p>
        Establish a safe approach with the coordinator, then apply it
        incrementally across hundreds of PRs. Review closely at first. As
        the approach holds, review less. The Project keeps walking the
        remaining files.
      </p>
      <h3>Gardening</h3>
      <p>
        Work that never ends: design-system drift, CI red, Slack bugs.
        Cursor's own example: a design-system Project that scans new PRs,
        extracts components, and adds a lint rule the second time it sees
        the same mistake — tens of PRs a day, with the engineer checking in
        where attention is scarce.
      </p>
      <Callout kind="tip" title="A constitution is not shared context">
        Shared context remembers how the work gets done. It does not, by
        itself, remember what you agreed to do or who is allowed to declare
        it done. If you run a fleet, write the intent down somewhere the
        coordinator cannot quietly rewrite — a plan you approved, an ADR, a
        phase list with human gates. Direct the fleet. Keep the gates.
      </Callout>
      <Callout kind="official">
        Docs:{" "}
        <Ext href="https://cursor.com/docs/agent/projects">Projects</Ext> ·{" "}
        <Ext href="https://cursor.com/blog/projects">
          Introducing Projects
        </Ext>
      </Callout>
    </>
  );
}

export function PrivacyChapter() {
  const os = useOs();
  return (
    <>
      <p className="lead">
        Privacy Mode, ignore files, and Run Modes are three different
        controls. Confusing them is how secrets leak while you feel
        responsible.
      </p>
      <h2>Privacy Mode</h2>
      <p>
        <Key mac="Cmd+Shift+J" win="Ctrl+Shift+J" os={os} /> → General →
        Privacy Mode. With it on, Cursor says code is never used for
        training by Cursor or model providers. Teams have it on by default
        and can enforce it from the dashboard.
      </p>
      <p>
        Prompts and code context still go to model providers to serve the
        request. BYOK follows the provider's policy. Some models require
        provider retention and need approval. Cloud Agents work with Privacy
        Mode. Legacy Privacy Mode is the one that blocks Projects.
      </p>
      <h2>.cursorignore</h2>
      <p>
        Gitignore syntax, at the repo root. It blocks Agent, Tab, inline
        edit, and @ mentions. It does <em>not</em> block the terminal or MCP
        from reading those files. Cursor also respects <code>.gitignore</code>{" "}
        plus a large default ignore list (lockfiles, <code>.env*</code>,{" "}
        <code>.git/</code>, <code>node_modules/</code>, binaries, media,
        caches). Override a default with <code>!</code>.
      </p>
      <pre>{`node_modules/
dist/
*.min.js
.env*
secrets/`}</pre>
      <p>
        Hierarchical ignore: Cursor Settings → Indexing → Ignore Files →
        Hierarchical Cursor Ignore (Help notes this may move under
        Features/Editor). Global ignore lives in user settings and starts
        empty; put <code>**/.env*</code> and credential globs there.
      </p>
      <h2>Run Modes</h2>
      <p>
        Settings → Agents → Approvals & Execution. Auto-review is the
        recommended default as of Cursor 3.6 (May 29, 2026): allowlist plus
        sandbox plus a classifier. Allowlist only auto-runs listed actions.
        Run Everything does not prompt. You accept the risk. Cloud Agents
        ignore Run Modes.
      </p>
      <p>
        <code>permissions.json</code> at <code>~/.cursor/</code> and/or{" "}
        <code>.cursor/</code>. <code>sandbox.json</code> for network and
        paths. Extra toggles exist for Browser, File-Deletion, and
        External-File.
      </p>
      <Callout kind="warn">
        Auto-reload plus Agent file writes can execute changes before you
        have read them. Do not use Run Everything on an untrusted repo.
        Workspace Trust is off by default; turning it on and then opening an
        untrusted folder will disable AI features.
      </Callout>
    </>
  );
}
