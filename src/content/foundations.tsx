import { Callout, Ext, Key, Prompt, Steps, Table } from "../components/ui";
import { useOs } from "../os-context";

export function StartChapter() {
  return (
    <>
      <p className="lead">
        This is a field guide to Cursor as it exists in October 2026. It is written
        from the official docs, not from last year's blog posts. Names have moved.
        A few popular ones are now wrong.
      </p>
      <p>
        Read it two ways. If you are new, go in order through{" "}
        <strong>The first hour</strong> and stop. Use Agent for a week before you
        add rules, MCP, or a fleet. If you already live in Cursor, skip to the
        chapter that is currently wasting your time: modes, rules, Cloud Agents,
        Projects, or the pitfalls list.
      </p>
      <h2>What this guide refuses to do</h2>
      <ul>
        <li>
          It will not teach "Composer" as a window. Composer 2.5 is a{" "}
          <em>model</em>. The surfaces are the Agent panel and the Agents Window.
        </li>
        <li>
          It will not teach "Background Agents" as the product name. Those are
          Cloud Agents.
        </li>
        <li>
          It will not invent an editor-wide Memories product. Persistence is
          rules, skills, <code>AGENTS.md</code>, <code>@Chats</code>, and
          Project shared context.
        </li>
        <li>
          It will not claim Cursor uploads an embeddings index of your repo.
          Current search docs describe Instant Grep, built on your machine.
        </li>
      </ul>
      <Callout kind="official">
        Canonical docs live at{" "}
        <Ext href="https://cursor.com/docs">cursor.com/docs</Ext>. Pricing and
        the model catalog change. When a number in this guide disagrees with
        those pages, those pages win.
      </Callout>
      <div className="home-grid">
        <a className="card" href="#/first-hour">
          <div className="num">Path A</div>
          <h3>New to Cursor</h3>
          <p>Install, first hour, Tab, inline edit, then the four modes. Stop after chapter 05.</p>
        </a>
        <a className="card" href="#/rules">
          <div className="num">Path B</div>
          <h3>Already using Agent</h3>
          <p>Rules, skills, models, then Cloud, CLI, and MCP. Skip the orientation chapters.</p>
        </a>
        <a className="card" href="#/projects">
          <div className="num">Path C</div>
          <h3>Running a fleet</h3>
          <p>Projects, subscriptions, review, and the pitfalls that show up at scale.</p>
        </a>
        <a className="card" href="#/shortcuts">
          <div className="num">Reference</div>
          <h3>Shortcuts and recipes</h3>
          <p>The chords, the three meanings of Cmd+K, and workflows that hold up.</p>
        </a>
      </div>
      <h2>The only mental model you need</h2>
      <p>
        Cursor is an editor you already know how to use, plus an autonomy
        slider. Tab finishes the line you started. Inline edit rewrites the
        selection you pointed at. Agent takes a job and comes back with diffs.
        Cloud Agents and Projects take that same loop off your laptop. You are
        not learning twenty products. You are deciding how much independence to
        give the same agent.
      </p>
    </>
  );
}

export function WhatChapter() {
  const os = useOs();
  return (
    <>
      <p className="lead">
        Cursor is an AI-native code editor: a coding agent for building
        ambitious software, sitting on the VS Code editor model. If you know VS
        Code, you already know the panes, the terminal, and most of the
        keybindings.
      </p>
      <p>
        That is the useful half of "it is a VS Code fork." The other half is
        what it is not: it is not VS Code with a chat extension taped on.
        Agent can search the repo, edit many files, run the terminal, open a
        browser, call MCP tools, and hand work to cloud VMs. The editor is the
        familiar shell. The product is the agent.
      </p>
      <h2>What transfers from VS Code</h2>
      <ul>
        <li>Default shortcuts, including your imported custom keybindings.</li>
        <li>Themes, settings, snippets, and most day-to-day editor habits.</li>
        <li>You can keep VS Code installed and open the same folders.</li>
      </ul>
      <h2>What does not transfer cleanly</h2>
      <p>
        Extensions come from <strong>Open VSX</strong>, not the VS Code
        Marketplace. Many popular extensions are there. Not all of them are,
        and some behave differently. Import first, then check the few
        extensions you actually depend on.
      </p>
      <Callout kind="tip">
        The migration path is{" "}
        <Key mac="Cmd+Shift+J" win="Ctrl+Shift+J" os={os} /> → General →
        Account → VS Code Import. That is Cursor Settings, not the generic
        VS Code settings panel (<Key mac="Cmd+," win="Ctrl+," os={os} />
        ).
      </Callout>
      <h2>The surfaces you will live in</h2>
      <Table
        headers={["Surface", "Job"]}
        rows={[
          ["Editor + Tab", "You type. Cursor finishes the next edit."],
          ["Inline edit", "Rewrite this selection, in place."],
          ["Agent panel", "A task that may touch many files or the terminal."],
          ["Agents Window", "Several agents, cloud handoff, diffs, and PRs."],
          ["CLI (`agent`)", "The same loop in a terminal or in CI."],
          ["Cloud / Projects", "The same loop on a VM, including while you are away."],
        ]}
      />
    </>
  );
}

export function InstallChapter() {
  const os = useOs();
  return (
    <>
      <p className="lead">
        You need a Cursor account and a supported OS. Then you install, sign
        in, and open a folder. Do not start from a single file. Agent searches
        the folder you opened.
      </p>
      <h2>Requirements</h2>
      <ul>
        <li>macOS 12 Monterey or later, Apple Silicon or Intel, native .dmg.</li>
        <li>Windows 10 or later, native .exe.</li>
        <li>
          Linux: apt (Debian/Ubuntu) or dnf (RHEL/Fedora) preferred; AppImage
          exists. Packages get desktop icons, updates, and CLI tools.
        </li>
      </ul>
      <p>
        Downloads: <Ext href="https://cursor.com/download">cursor.com/download</Ext>
      </p>
      <h2>Linux install (official)</h2>
      <p>Debian / Ubuntu:</p>
      <pre>{`curl -fsSL https://downloads.cursor.com/keys/anysphere.asc | gpg --dearmor | sudo tee /etc/apt/keyrings/cursor.gpg > /dev/null
echo "deb [arch=amd64,arm64 signed-by=/etc/apt/keyrings/cursor.gpg] https://downloads.cursor.com/aptrepo stable main" | sudo tee /etc/apt/sources.list.d/cursor.list > /dev/null
sudo apt update && sudo apt install cursor`}</pre>
      <p>RHEL / Fedora:</p>
      <pre>{`sudo tee /etc/yum.repos.d/cursor.repo << 'EOF'
[cursor]
name=Cursor
baseurl=https://downloads.cursor.com/yumrepo
enabled=1
gpgcheck=1
gpgkey=https://downloads.cursor.com/keys/anysphere.asc
EOF
sudo dnf install cursor`}</pre>
      <h2>First launch</h2>
      <Steps
        items={[
          "Open Cursor and sign in.",
          <>
            Import VS Code if you use it:{" "}
            <Key mac="Cmd+Shift+J" win="Ctrl+Shift+J" os={os} /> → General →
            Account → Import.
          </>,
          "File → Open Folder, and pick a real project.",
          <>
            Open Agent with <Key mac="Cmd+I" win="Ctrl+I" os={os} /> (or{" "}
            <Key mac="Cmd+L" win="Ctrl+L" os={os} />).
          </>,
          "Turn on Privacy Mode if you want it before you paste secrets into a prompt. Cursor Settings → General → Privacy Mode.",
        ]}
      />
      <Callout kind="warn">
        Workspace Trust exists and is <em>off</em> by default. If you enable{" "}
        <code>security.workspace.trust.enabled</code>, Restricted Mode will
        break AI features until you trust the folder.
      </Callout>
    </>
  );
}

export function FirstHourChapter() {
  const os = useOs();
  return (
    <>
      <p className="lead">
        The official quickstart is the right first hour: explain the codebase,
        make one small change, review the diff, then graduate to Plan for
        anything larger.
      </p>
      <h2>1. Get oriented</h2>
      <p>
        Open Agent (<Key mac="Cmd+I" win="Ctrl+I" os={os} />) and let it
        search. You do not need <code>@codebase</code>. Agent already has
        search.
      </p>
      <Prompt>
        {`Explain this codebase. Point me to the main entry points, key modules, and anything I should read before making changes.`}
      </Prompt>
      <h2>2. Ask for a small, safe change</h2>
      <Prompt>
        {`Suggest three small, safe improvements in this codebase. Explain the tradeoffs and wait for me to choose one.`}
      </Prompt>
      <p>
        Good first tasks are copy, empty states, a tiny UI fix, or a test you
        can already describe. A vague "add a settings page" is how Agent
        invents an API.
      </p>
      <h2>3. Review, then verify the way the repo already verifies</h2>
      <p>
        Watch the diff. When it finishes, do not trust the narrative. Ask it
        to run the checks this project already uses: tests, typecheck, lint,
        or the local build.
      </p>
      <Prompt>
        {`Run the project's existing test/lint/typecheck commands. Do not invent a new test runner. Paste the failures and fix only what you broke.`}
      </Prompt>
      <h2>4. Bigger than one file? Switch to Plan</h2>
      <p>
        <Key mac="Shift+Tab" win="Shift+Tab" os={os} /> rotates modes. Plan
        researches, asks questions, writes a reviewable plan, and waits. If
        the implementation goes wrong, revert, refine the plan, and run it
        again. That is usually faster than prompt-chasing a bad Agent run.
      </p>
      <Callout kind="tip">
        Start a new chat when the task changes. A long thread that already
        planned a billing refactor is a poor place to ask for a one-line copy
        fix. The context window will still be full of the refactor.
      </Callout>
    </>
  );
}

export function SliderChapter() {
  const os = useOs();
  return (
    <>
      <p className="lead">
        Karpathy's line is still the right one: the useful product is an
        autonomy slider. Cursor's three everyday notches are Tab, inline
        edit, and Agent.
      </p>
      <h2>Tab</h2>
      <p>
        Ghost text ahead of the cursor, drawn from recent edits, nearby code,
        and linter errors. It can span multiple lines, add imports, jump to
        the next predicted location, and suggest an edit in another file
        (portal at the bottom of the editor).
      </p>
      <Table
        headers={["Action", "Shortcut"]}
        rows={[
          ["Accept the suggestion", <kbd>Tab</kbd>],
          ["Reject", <span>Escape, or keep typing</span>],
          [
            "Accept the next word",
            <Key mac="Cmd+→" win="Ctrl+→" os={os} />,
          ],
          ["Jump to the next predicted edit", <span>Tab again after accept</span>],
        ]}
      />
      <p>
        Toggle it from the Tab indicator in the bottom-right, or Cursor
        Settings → Tab. You can snooze it, disable it globally, or disable it
        by extension. Remap via Keyboard Shortcuts → "Accept Cursor Tab
        Suggestions."
      </p>
      <Callout kind="warn">
        Rules do not apply to Tab. If you want "named exports only," put it
        in a linter, not in a rule, and expect Tab to keep doing what Tab
        does.
      </Callout>
      <h2>Inline edit</h2>
      <p>
        Select code,{" "}
        <Key mac="Cmd+K" win="Ctrl+K" os={os} />, describe the change,
        Return. Follow-ups stay in that inline session.{" "}
        <Key mac="Opt+Return" win="Alt+Return" os={os} /> asks a question
        instead of editing; "do it" plus Return applies a suggestion.
      </p>
      <p>
        Use this for a local rewrite: async conversion, a rename you can see,
        restyling one component. Escalate with{" "}
        <Key mac="Cmd+L" win="Ctrl+L" os={os} /> on a selection when the
        change is about to leave the file.
      </p>
      <Callout kind="warn" title="Cmd+K is not one feature">
        In the editor it is inline edit. In the terminal it is the terminal
        prompt bar. In the Agents Window it is command palette / conversation
        search. Look at which surface is focused.
      </Callout>
      <h2>Agent</h2>
      <p>
        <Key mac="Cmd+I" win="Ctrl+I" os={os} /> or{" "}
        <Key mac="Cmd+L" win="Ctrl+L" os={os} />. This is the default for
        building, refactoring, fixing, and writing tests. It searches, edits,
        runs commands, and can use the browser, MCP, and images.
      </p>
      <p>Mechanics worth knowing on day one:</p>
      <ul>
        <li>
          <strong>Checkpoints</strong> are created before significant edits.
          Hover a message → Restore Checkpoint. They revert files, not the
          transcript, and they are not Git.
        </li>
        <li>
          <strong>Queue</strong> a follow-up with Enter while it is working.
          Drag to reorder.{" "}
          <Key mac="Cmd+Enter" win="Ctrl+Enter" os={os} /> force-sends.
        </li>
        <li>
          <strong>Side chats</strong> via <code>/side</code> or{" "}
          <code>/btw</code> keep a durable child thread you can @-mention
          back into the parent.
        </li>
        <li>
          <strong>Voice</strong>: mic in the input, or{" "}
          <Key mac="Cmd+Shift+Space" win="Ctrl+Shift+Space" os={os} />.
          Read the transcript before you send it.
        </li>
        <li>
          <strong>Images</strong>: drag, drop, or paste. Agent can also
          generate images into <code>assets/</code> by default.
        </li>
      </ul>
    </>
  );
}

export function ModesChapter() {
  const os = useOs();
  return (
    <>
      <p className="lead">
        The side panel is Agent. Modes live in that panel. Older docs still
        say Chat. Treat Agent as the current name.
      </p>
      <p>
        Open it with <Key mac="Cmd+I" win="Ctrl+I" os={os} />. Cycle modes
        with <Key mac="Shift+Tab" win="Shift+Tab" os={os} />. The mode menu
        is <Key mac="Cmd+." win="Ctrl+." os={os} />.
      </p>
      <Callout kind="warn">
        Each mode has its own context. Switching modes starts a fresh
        context window. Do not rotate Agent → Ask mid-task and expect the
        same thread.
      </Callout>
      <h2>Agent</h2>
      <p>
        Default. Searches, edits, runs the terminal, can use browser / web /
        MCP, can ask a clarifying question and keep going. Use it for most
        building and fixing.
      </p>
      <Prompt>{`Add a login form to the homepage with email and password fields. Follow the existing form primitives. Do not invent a new auth backend.`}</Prompt>
      <h2>Ask</h2>
      <p>
        Read-only. Explores and answers. No edits. Use it when you want to
        understand before you touch anything. CLI: <code>/ask</code> or{" "}
        <code>--mode=ask</code>.
      </p>
      <Prompt>{`How does the authentication flow work? Trace request to session creation and name the files I should read first.`}</Prompt>
      <h2>Plan</h2>
      <p>
        Researches, asks questions, writes a reviewable plan, and waits for
        approval before coding. Use it for multi-file work, unclear
        requirements, or anything you want to sign off. Skip it for a
        two-line fix you already understand.
      </p>
      <p>
        Cursor may suggest Plan when the prompt sounds large. CLI:{" "}
        <code>/plan</code>, <code>--plan</code>, or <code>--mode=plan</code>.
        Plans save in your home directory by default; Save to workspace if
        you want them in Git.
      </p>
      <Prompt>{`Add team-based billing with seat limits. Research the existing billing module, propose an approach with tradeoffs, and wait for approval before writing code.`}</Prompt>
      <h2>Debug</h2>
      <p>
        Hypotheses, then instrumentation (logs to a local debug server in a
        Cursor extension), then you reproduce, then it reads runtime logs,
        then a targeted fix and cleanup. Use it for reproducible-but-mysterious
        bugs, races, leaks, and regressions. Do not use it when you already
        know the fix.
      </p>
      <Prompt>{`Checkout intermittently charges twice under load. Here is the stack trace and the exact reproduction. Instrument, wait for me to reproduce, then fix from the logs — do not guess.`}</Prompt>
      <Table
        headers={["Mode", "Edits?", "Best for"]}
        rows={[
          ["Agent", "Yes", "Most building and fixing"],
          ["Ask", "No", "Understanding a system"],
          ["Plan", "After you approve", "Multi-file or ambiguous work"],
          ["Debug", "After evidence", "Runtime bugs you can reproduce"],
        ]}
      />
      <h2>Related controls that are not modes</h2>
      <ul>
        <li>
          <code>/goal</code> — a long-lived objective ("fix all flaky tests
          and make CI green"). Documented as rolling out; if you do not see
          it, start a new chat.
        </li>
        <li>
          Run Modes (Auto-review / Allowlist / Run Everything) — how much
          the agent may execute without asking. Not a thinking mode. See
          Privacy.
        </li>
      </ul>
    </>
  );
}
