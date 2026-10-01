import { Callout, Ext, Key, Prompt } from "../components/ui";
import { useOs } from "../os-context";

export function AgentsWindowChapter() {
  const os = useOs();
  return (
    <>
      <p className="lead">
        Cursor 3 (GA April 2, 2026) added the Agents Window: an agent-first
        UI for parallel agents, cloud handoff, worktrees, and a diffs/PR
        view. The classic IDE is still there. You can have both open.
      </p>
      <p>
        Command Palette (<Key mac="Cmd+Shift+P" win="Ctrl+Shift+P" os={os} />
        ) → Open Agents Window. Back: Open IDE. In that window,{" "}
        <Key mac="Cmd+P" win="Ctrl+P" os={os} /> is file search and{" "}
        <Key mac="Cmd+Shift+F" win="Ctrl+Shift+F" os={os} /> searches all
        files. Conversation search is{" "}
        <Key mac="Cmd+K" win="Ctrl+K" os={os} /> — not inline edit.
      </p>
      <h2>Use the Agents Window when</h2>
      <ul>
        <li>Several agents should run at once, including in the cloud.</li>
        <li>You want to review diffs, commits, and PRs in one place.</li>
        <li>You are handing a thread from local to cloud, or the reverse.</li>
        <li>You are working across more than one workspace.</li>
      </ul>
      <p>
        Stay in the editor when you need VS Code extensions, lots of split
        editors, or you are mostly typing.
      </p>
      <h2>Design Mode</h2>
      <p>
        Lives in the browser inside the Agents Window.{" "}
        <Key mac="Cmd+Shift+D" win="Ctrl+Shift+D" os={os} /> toggles it on
        Mac; the docs do not list a Windows chord, so use the UI if the
        binding is missing. Click elements, draw, or narrate UI changes.
        Official recommendation: Composer 2.5 for this loop.
      </p>
      <Callout kind="official">
        Docs:{" "}
        <Ext href="https://cursor.com/docs/agent/agents-window">
          Agents Window
        </Ext>{" "}
        ·{" "}
        <Ext href="https://cursor.com/docs/agent/design-mode">Design Mode</Ext>
      </Callout>
    </>
  );
}

export function CloudChapter() {
  return (
    <>
      <p className="lead">
        Cloud Agents are the same agent loop on isolated cloud VMs: repo,
        deps, secrets, network, optional desktop and browser. They were
        called Background Agents. Paid plans only. Your laptop does not need
        to stay open.
      </p>
      <h2>How to start one</h2>
      <ul>
        <li>Desktop: Cloud in the dropdown under the agent input.</li>
        <li>
          Web: <Ext href="https://cursor.com/agents">cursor.com/agents</Ext>
        </li>
        <li>Cursor for iOS (iOS / iPadOS 26+). Android: the PWA at that same URL.</li>
        <li>Slack or Linear: mention @cursor.</li>
        <li>GitHub or Bitbucket: comment @cursor on an issue or PR.</li>
        <li>CLI: prepend <code>&</code> to a message.</li>
        <li>Automations, on a schedule or an event.</li>
      </ul>
      <p>
        An admin must connect GitHub / GitLab / Azure DevOps / Bitbucket
        first. Environment setup — snapshot, Dockerfile,{" "}
        <code>.cursor/environment.json</code> — is the main quality lever. A
        starving VM writes worse code than a bad prompt.
      </p>
      <Callout kind="warn">
        Move to Cloud transfers the conversation, not dirty files. Commit or
        stash first. Cloud Agents do not use local Run Modes; they run on an
        isolated VM without your laptop's approval prompts.
      </Callout>
      <h2>Also documented</h2>
      <ul>
        <li>Artifacts on the PR: screenshots, videos, logs.</li>
        <li>Remote desktop control of the agent VM.</li>
        <li>Multi-repo environments.</li>
        <li>
          Project hooks from <code>.cursor/hooks.json</code> (not user{" "}
          <code>~/.cursor/hooks.json</code>).
        </li>
        <li>Team MCP. Personal skills only if Sync Skills is on.</li>
        <li>
          Auto-fix GitHub Actions on PRs the agent created (Teams;{" "}
          <code>@cursor autofix off/on</code>).
        </li>
        <li>Privacy Mode is supported. Billing is at the selected model's API rate.</li>
      </ul>
      <Prompt label="Slack / GitHub">{`@cursor fix the flaky checkout test and open a PR with a screen recording of the passing run.`}</Prompt>
    </>
  );
}

export function CliChapter() {
  return (
    <>
      <p className="lead">
        The CLI is the same agent, in a terminal. Same modes, same rules,
        same MCP from <code>mcp.json</code>. Useful on a remote box, in CI,
        or when you do not want the editor open.
      </p>
      <h2>Install</h2>
      <pre>{`# macOS, Linux, WSL
curl https://cursor.com/install -fsS | bash

# Windows PowerShell
irm 'https://cursor.com/install?win32=true' | iex

agent --version
agent`}</pre>
      <p>
        You may need <code>~/.local/bin</code> on PATH. Auto-updates;{" "}
        <code>agent update</code> forces one.
      </p>
      <h2>Interactive and not</h2>
      <pre>{`agent
agent "refactor the auth module to use JWT tokens"
agent --plan "add team billing"
agent --mode=ask "how does session refresh work?"
& refactor the auth module and add comprehensive tests
agent --worktree "upgrade the test runner"
agent -p "review these changes for security issues" --output-format text`}</pre>
      <p>
        Print mode (<code>-p</code>) is non-interactive and has full write
        access. Treat that as a loaded gun in CI. Sessions:{" "}
        <code>agent ls</code>, <code>agent resume</code>,{" "}
        <code>agent --continue</code>. Approvals are y/n before shell
        commands; <code>/sandbox</code> or <code>--sandbox enabled|disabled</code>.
      </p>
      <h2>Slash commands (subset)</h2>
      <p>
        <code>/model</code>, <code>/plan</code>, <code>/ask</code>,{" "}
        <code>/debug</code>, <code>/goal</code>, <code>/summarize</code>{" "}
        (<code>/compress</code>), <code>/mcp</code>, <code>/sandbox</code>,{" "}
        <code>/run-everything</code>, <code>/vim</code>, <code>/resume</code>,{" "}
        <code>/fork</code>, <code>/rewind</code>, <code>/shell</code>,{" "}
        <code>/plugin</code>, <code>/config</code>, <code>/quit</code>.
      </p>
      <Callout kind="official">
        Docs:{" "}
        <Ext href="https://cursor.com/docs/cli/overview">CLI overview</Ext> ·{" "}
        <Ext href="https://cursor.com/docs/cli/using">Using Agent in CLI</Ext>
      </Callout>
    </>
  );
}

export function McpChapter() {
  const os = useOs();
  return (
    <>
      <p className="lead">
        MCP (Model Context Protocol) is how Agent talks to tools you already
        use: Linear, Figma, databases, browsers, internal APIs. If a job is
        "create the ticket and then change the code," MCP is how the ticket
        half happens in the same thread.
      </p>
      <h2>Install</h2>
      <ul>
        <li>Customize → Marketplace, or one-click Add to Cursor.</li>
        <li>
          Community directory:{" "}
          <Ext href="https://cursor.directory">cursor.directory</Ext>
        </li>
        <li>
          Project: <code>.cursor/mcp.json</code>
        </li>
        <li>
          Global: <code>~/.cursor/mcp.json</code>
        </li>
      </ul>
      <pre>{`{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "mcp-server"],
      "env": { "API_KEY": "\${env:API_KEY}" }
    }
  }
}`}</pre>
      <p>
        Interpolation: <code>${"{env:NAME}"}</code>, <code>${"{userHome}"}</code>,{" "}
        <code>${"{workspaceFolder}"}</code>,{" "}
        <code>${"{workspaceFolderBasename}"}</code>,{" "}
        <code>${"{pathSeparator}"}</code>. Transports: stdio, SSE, Streamable
        HTTP. Supported: Tools, Prompts, Resources, Roots, Elicitation, MCP
        Apps.
      </p>
      <p>
        Tools under Available Tools are used automatically, including in
        Plan. Toggle servers in Customize. Approval follows Run Modes. Debug
        from the Output panel (
        <Key mac="Cmd+Shift+U" win="Ctrl+Shift+U" os={os} />) → MCP Logs.
      </p>
      <Callout kind="warn">
        Verify the server, review permissions, restrict API keys. Terminal
        and MCP can still read files listed in <code>.cursorignore</code>.
        Cloud Agents get MCP from the dropdown at cursor.com/agents; team
        MCP comes from Dashboard → Plugins & MCPs.
      </Callout>
    </>
  );
}

export function HooksChapter() {
  return (
    <>
      <p className="lead">
        Three ways to specialize the loop without stuffing more into the
        system prompt: hooks observe or block events, subagents isolate a
        job, plugins package the rest for a team.
      </p>
      <h2>Hooks</h2>
      <p>
        Scripts (or prompt-hooks) that observe, block, or modify the agent
        loop. Config: <code>.cursor/hooks.json</code> (project) or{" "}
        <code>~/.cursor/hooks.json</code> (user). Create with{" "}
        <code>/create-hook</code>. Events include session start/end, before
        and after tool use, before shell and MCP, before read, after edit,
        Tab hooks, subagent start/stop, stop, and workspace open.
      </p>
      <p>
        Use them to format on edit, prefer <code>gh</code> over raw{" "}
        <code>git</code>, deny <code>kubectl apply</code> to prod, or write
        an audit log. Cloud Agents run command-based project hooks only, not
        user hooks. Debug from Customize → Hooks, or the Hooks output
        channel.
      </p>
      <h2>Subagents</h2>
      <p>
        Specialized agents with their own context. Built-in: Explore, Bash,
        Browser. Custom: <code>.cursor/agents/*.md</code> or{" "}
        <code>~/.cursor/agents/</code>. Agent delegates on its own, or you
        say "use the security-auditor subagent," or you run{" "}
        <code>/verifier …</code>.
      </p>
      <ul>
        <li>
          Isolation, parallelism, or long research → subagent.
        </li>
        <li>A one-shot playbook → skill.</li>
        <li>A standing constraint → rule.</li>
      </ul>
      <p>
        <code>/in-cloud</code> runs the next task on a VM/branch.{" "}
        <code>/autopilot</code> owns a PR remotely. Cloud subagents use team
        MCP, not your local MCP. Nesting: one extra level since 2.5. Too
        many vague subagents is an official anti-pattern.
      </p>
      <Prompt label="After a feature claims to be done">{`/verifier confirm the auth flow is complete: signup, login, refresh, logout, and the existing tests for each.`}</Prompt>
      <h2>Plugins</h2>
      <p>
        Team and marketplace packages that bundle skills, MCPs, rules, and
        hooks. Install from Customize / Marketplace. Team marketplaces are a
        Teams feature. See{" "}
        <Ext href="https://cursor.com/docs/plugins">Plugins</Ext>.
      </p>
    </>
  );
}
