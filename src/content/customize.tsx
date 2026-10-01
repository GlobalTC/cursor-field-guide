import { Callout, Ext, Key, Prompt, Table } from "../components/ui";
import { useOs } from "../os-context";

export function ContextChapter() {
  return (
    <>
      <p className="lead">
        Agent can search on its own. @ is for when you already know the file,
        the folder, the diff, or the previous chat. If you do not know, skip
        the mention and write the outcome.
      </p>
      <h2>Official @ types</h2>
      <Table
        headers={["Mention", "What it attaches"]}
        rows={[
          ["@auth.ts, @src/components/", "A file or folder. Type / after a folder to go deeper."],
          ["@Terminals", "Terminal output"],
          ["@Chats", "A previous conversation"],
          ["@Commit (Diff of Working State)", "Uncommitted work"],
          ["@Branch (Diff with Main)", "The branch diff"],
          ["@Browser", "The built-in browser"],
          ["@my-rule", "A manual rule, by name"],
        ]}
      />
      <Prompt>{`Update the button styles in @Button.tsx and the tests in @Button.test.tsx. Do not restyle unrelated components.`}</Prompt>
      <h2>Other ways context gets in</h2>
      <ul>
        <li>Drag, drop, or paste images: mockups, screenshots, stack traces.</li>
        <li>
          The context ring next to the input shows a token breakdown: system
          prompt, tools, rules, skills, MCP, subagents, summary, conversation.
        </li>
        <li>
          When the window fills, older turns compress into a summary. Start a
          new chat when that summary is about a different job.
        </li>
      </ul>
      <h2>Search, not "indexing"</h2>
      <p>
        Current docs title this <strong>Search</strong>. Instant Grep is a
        local search engine Agent uses automatically, including regex and
        word-boundary matching. Cursor's stated privacy claim: it does not
        upload file paths or code to build a search index, and it does not
        store embeddings of your codebase for search. When Agent{" "}
        <em>opens</em> a match, that file can still go into the model request.
      </p>
      <p>
        The Explore subagent runs many searches in a separate context window
        and returns a summary. Multi-root workspaces work for Agent. Cloud
        Agents do not support multi-root. Worktrees that need a single git
        root are disabled in multi-root folders.
      </p>
      <Callout kind="official">
        Docs:{" "}
        <Ext href="https://cursor.com/docs/context/codebase-indexing">
          Search / codebase indexing
        </Ext>{" "}
        and{" "}
        <Ext href="https://cursor.com/docs/agent/prompting">Prompting</Ext>.
      </Callout>
    </>
  );
}

export function RulesChapter() {
  return (
    <>
      <p className="lead">
        Large language models do not retain memory between completions. Rules
        are persistent instructions folded into the prompt. Add one after the
        agent repeats a mistake, not before it has made any.
      </p>
      <h2>Where rules live</h2>
      <Table
        headers={["Type", "Where", "Who it applies to"]}
        rows={[
          ["Project Rules", ".cursor/rules/*.mdc", "This repo, version-controlled"],
          ["User Rules", "Customize → Rules (synced); also ~/.cursor/rules (local)", "All your projects, Agent only"],
          ["Team Rules", "Dashboard, Team/Enterprise", "Org-wide; can be enforced"],
          ["AGENTS.md", "Project root and nested dirs", "Simple markdown, no frontmatter"],
          ["CLAUDE.md", "Project root", "Treated like AGENTS.md; always applied"],
          [".cursorrules", "Project root", "Legacy. It will be deprecated."],
        ]}
      />
      <p>
        When guidance conflicts, precedence is Team → Project → User. All
        applicable rules are still merged.
      </p>
      <h2>Project rule apply modes</h2>
      <p>
        Files must be <code>.mdc</code>. A plain <code>.md</code> in{" "}
        <code>.cursor/rules</code> is ignored.
      </p>
      <Table
        headers={["UI type", "Frontmatter", "When"]}
        rows={[
          ["Always Apply", "alwaysApply: true", "Every chat"],
          ["Apply to Specific Files", "globs: …, alwaysApply: false", "Matching files in context"],
          ["Apply Intelligently", "description: …, alwaysApply: false", "Agent decides"],
          ["Apply Manually", "no description, no globs", "Only when @-mentioned"],
        ]}
      />
      <pre>{`---
alwaysApply: true
---
- Never modify generated files in dist/ or build/
- Read relevant source before proposing changes
- Use the project's existing test command; do not invent one`}</pre>
      <pre>{`---
globs: src/components/**/*.tsx
alwaysApply: false
---
- Named exports only
- Keep components under 200 lines`}</pre>
      <h2>Create and migrate</h2>
      <ul>
        <li>
          In chat: <code>/create-rule</code>
        </li>
        <li>Command Palette → New Cursor Rule</li>
        <li>Customize → Rules → Add Rule</li>
      </ul>
      <p>
        To leave <code>.cursorrules</code>: create a new always-apply rule,
        paste the old content, delete the legacy file.
      </p>
      <h2>What rules do not do</h2>
      <ul>
        <li>They do not affect Tab or inline edit.</li>
        <li>
          They do not apply to Bugbot PR reviews. Bugbot reads{" "}
          <code>.cursor/BUGBOT.md</code> and Bugbot Automations rules.
        </li>
      </ul>
      <Callout kind="tip">
        Official hygiene: keep a rule under 500 lines and split if it grows.
        Use concrete examples and <code>@filename</code> instead of pasting
        code. Do not dump a style guide — that is a linter's job. Check rules
        into git.
      </Callout>
    </>
  );
}

export function SkillsChapter() {
  const os = useOs();
  return (
    <>
      <p className="lead">
        Skills are portable <code>SKILL.md</code> packages. Agent applies them
        when they look relevant, or you type <code>/skill-name</code>. A
        skill is a playbook. A rule is a standing constraint. A subagent is
        an isolated worker.
      </p>
      <h2>Where they live</h2>
      <Table
        headers={["Path", "Scope"]}
        rows={[
          [".agents/skills/ or .cursor/skills/", "Project"],
          ["~/.agents/skills/ or ~/.cursor/skills/", "User, this machine"],
          [".claude/skills/ or .codex/skills/", "Compatibility"],
        ]}
      />
      <p>
        Nested <code>.cursor/skills/</code> in a monorepo package is
        auto-scoped to that directory. Cloud Agents only sync{" "}
        <code>~/.cursor/skills/</code>, and only if Settings → Agents → Sync
        Skills for Cloud Agents is on. <code>~/.agents/skills/</code> does
        not sync.
      </p>
      <h2>Pin a skill for the session</h2>
      <p>
        Type <code>/</code>, pick a skill, then{" "}
        <Key mac="Opt+Enter" win="Alt+Enter" os={os} />. That is a Custom
        Mode: the skill stays on for the whole session.
      </p>
      <h2>Built-in skills worth knowing</h2>
      <p>
        <code>/create-rule</code>, <code>/create-skill</code>,{" "}
        <code>/create-subagent</code>, <code>/create-hook</code>,{" "}
        <code>/review</code>, <code>/review-bugbot</code>,{" "}
        <code>/review-security</code>, <code>/automate</code>,{" "}
        <code>/autopilot</code>, <code>/in-cloud</code>, <code>/loop</code>,{" "}
        <code>/split-to-prs</code>, <code>/canvas</code>,{" "}
        <code>/cursor-blame</code>, <code>/shell</code>, <code>/sdk</code>.
      </p>
      <Prompt label="Example">{`/create-rule Always use Zod at API boundaries. Reject unparsed request bodies.`}</Prompt>
      <p>
        View installed skills from Customize in the sidebar. Docs:{" "}
        <Ext href="https://cursor.com/docs/skills">Skills</Ext>.
      </p>
    </>
  );
}

export function ModelsChapter() {
  const os = useOs();
  return (
    <>
      <p className="lead">
        Switch models from the picker on the chat input, or cycle with{" "}
        <Key mac="Cmd+/" win="Ctrl+/" os={os} />. A mid-conversation switch
        applies going forward. Set the default in Cursor Settings → Models.
      </p>
      <h2>Two usage pools</h2>
      <p>
        On Pro / Pro+ / Ultra, included usage is split.{" "}
        <strong>Cursor Models</strong> (Grok 4.7 / 4.6 / 4.5, Composer 2.5)
        have more included usage. <strong>Other Models</strong> are
        third-party models at API list price. Hitting a limit does not
        silently downgrade quality. You go on-demand or you upgrade.
      </p>
      <h2>Official "which model" guidance, compressed</h2>
      <Table
        headers={["Choice", "When"]}
        rows={[
          ["Auto", "Everyday. Router (Cost / Balance / Intelligence) is Teams/Enterprise first; individuals later. Needs Grok 4.6 allowed."],
          ["Composer 2.5", "Fast, cheaper, interactive coding. Recommended for Design Mode."],
          ["Grok 4.7", "Cursor's flagship for hard, long-running work."],
          ["Claude Opus / GPT-5.6 Sol", "Complex multi-step work you specifically trust."],
          ["Gemini Pro", "Some people prefer these. Hidden older models live in Settings → Models."],
        ]}
      />
      <p>
        A practical default: Composer 2.5 or Auto for daily Agent work, Grok
        4.7 when the task is long and you will wait, a named third-party
        model only when you have a reason — it burns the Other Models pool.
        Subagents can use a different model than the parent; third-party
        subagent calls still bill Other Models.
      </p>
      <Callout kind="warn">
        Some models (for example Claude Fable) require data-retention
        approval under Privacy Mode. Zero-data-retention does not apply to
        BYOK. Max Mode is a legacy-plan extra-context switch, not a current
        usage-based control.
      </Callout>
      <h2>Plans, at a high level</h2>
      <p>
        Hobby is free and limited. Pro is $20/mo, Pro+ $60, Ultra $200. Teams
        Standard is $40/user/mo. Exact limits, Bugbot billing, and the India
        Start plan change — read{" "}
        <Ext href="https://cursor.com/docs/models-and-pricing">
          Models & Pricing
        </Ext>{" "}
        and <Ext href="https://cursor.com/pricing">cursor.com/pricing</Ext>.
      </p>
      <p>
        Official rough usage: daily Tab often fits included; daily Agent
        often lands around $60–$100/mo; multi-agent and automations often
        $200+/mo. Those are guidance, not a quote.
      </p>
    </>
  );
}
