---
title: "LinguaMCP – Local-First Language Tutor Memory Layer"
description: "Built a local-first MCP server that gives AI language tutors durable, human-readable memory through Markdown-backed learner profiles, session logs, and bounded context tools."
pill_description: "Local-first MCP memory layer for AI language tutoring, with validated storage, audit logging, and an optional Windows launcher."
cover: "/project-covers/linguamcp.png"
order: 2
github: "https://github.com/hamzamooraj99/LinguaMCP"
category: "AI Systems"
---

# LinguaMCP – Local-First Language Tutor Memory Layer

### Overview

I designed and implemented LinguaMCP, a local-first memory layer for AI language tutoring built on the Model Context Protocol (MCP).

The system stores learner state in human-readable Markdown files instead of a database, allowing any compatible model to keep track of profiles, lesson plans, progress, vocabulary, mistakes, scenarios, homework, and session summaries across conversations.

The goal was to solve a common failure mode in tutoring workflows: the model may teach well in the moment, but it loses continuity between sessions. LinguaMCP preserves that continuity without turning the server itself into the tutor.

---

### Problem

Language-learning chats often reset after every session.

The model forgets the learner’s level, previous mistakes, active homework, and the current lesson plan. That creates fragmented tutoring, repeated explanations, and weak long-term progression.

The problem was to build a memory system that is:

* local-first and privacy-preserving
* readable and editable by humans
* safe against invalid paths and unsafe writes
* structured enough for an AI tutor to use reliably
* lightweight enough to run on a personal machine or local network

---

### Methodology

**System Architecture**

* FastMCP server exposing validated tools for reading and writing learner context
* Markdown-based workspace per language under `tutor_data/`
* Bounded context reads so the model sees only the current working set
* Session logging, checkpointing, and archive compaction for long-term continuity
* Optional HTTP mode with bearer token or single-user OAuth support
* Windows desktop launcher for non-terminal startup and shutdown

**Key Design Decisions**

* Human-readable Markdown as the source of truth instead of a database
* Whitelisted file access to prevent arbitrary writes and path traversal
* Clear separation of responsibilities:
  * LinguaMCP stores and retrieves memory
  * the connected model does the teaching
* Audit logging for tool calls to preserve traceability
* Compactable active files plus archived session history to keep the live context small

**Implementation Details**

* Each language gets its own isolated folder with profile, lesson plan, progress, vocabulary, mistakes, scenarios, active session, summaries, homework, delivery drafts, and archived sessions
* Context reads are intentionally bounded rather than exposing the full history every time
* Compaction preserves full archival history while trimming active files
* A Windows launcher was added to simplify running the server in OAuth-enabled HTTP mode

---

### Key Results

* Delivered a working MCP server for language-learning memory management
* Supported durable learner context across tutoring sessions without external storage
* Reduced risk through validation, file whitelisting, and safe path handling
* Added readable audit trails and timestamped session archives
* Extended the project beyond a script into a usable desktop-friendly toolchain

The main result was not just functionality, but a cleaner tutoring workflow: the model can return to a bounded, current view of the learner while the full history remains stored locally and transparently.

---

### Limitations & Trade-offs

* The system does not tutor or grade on its own; it depends on the connected model
* Markdown storage is simple and transparent, but less suited to high-volume structured querying than a database
* HTTP mode introduces authentication and deployment complexity compared with stdio mode
* Context compaction requires thoughtful model usage to avoid overloading the active files
* The project is optimized for local-first and single-user workflows rather than multi-tenant cloud scale

---

### Technologies

Python, FastMCP, MCP, Markdown, OAuth, Starlette, WPF, Windows desktop automation, filesystem-backed storage, JSONL audit logging

---

### Workflow

<figure>
    <img src="../../project-images/linguamcp-workflow.png" height=400>
    <figcaption align=center>How the model reads bounded learner context, writes approved updates, and preserves the full session history locally</figcaption>
</figure>
