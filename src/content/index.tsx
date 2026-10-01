import type { ComponentType } from "react";
import {
  FirstHourChapter,
  InstallChapter,
  ModesChapter,
  SliderChapter,
  StartChapter,
  WhatChapter,
} from "./foundations";
import {
  ContextChapter,
  ModelsChapter,
  RulesChapter,
  SkillsChapter,
} from "./customize";
import {
  AgentsWindowChapter,
  CliChapter,
  CloudChapter,
  HooksChapter,
  McpChapter,
} from "./scale";
import { PrivacyChapter, ProjectsChapter, ReviewChapter } from "./quality";
import { PitfallsChapter, ShortcutsChapter, WorkflowsChapter } from "./reference";

export const chapterBodies: Record<string, ComponentType> = {
  start: StartChapter,
  what: WhatChapter,
  install: InstallChapter,
  "first-hour": FirstHourChapter,
  slider: SliderChapter,
  modes: ModesChapter,
  context: ContextChapter,
  rules: RulesChapter,
  skills: SkillsChapter,
  models: ModelsChapter,
  "agents-window": AgentsWindowChapter,
  cloud: CloudChapter,
  cli: CliChapter,
  mcp: McpChapter,
  hooks: HooksChapter,
  review: ReviewChapter,
  projects: ProjectsChapter,
  privacy: PrivacyChapter,
  shortcuts: ShortcutsChapter,
  workflows: WorkflowsChapter,
  pitfalls: PitfallsChapter,
};
