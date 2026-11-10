---
title: "The Shortcut Paradox – Do LLM Agents Copy a Cheat from a Shared Wiki?"
description: "Pre-registered multi-agent experiment testing whether a cheating shortcut spreads between LLM agents through a shared wiki whose notes fade over time. Nobody copied the cheat, even when it was the team's top-ranked note."
pill_description: "Multi-agent safety experiment on whether reward-hacking spreads through shared, fading memory; a carefully checked null result."
timeline: "Oct 22, 2026 - Nov 9, 2026"
cover: "/project-covers/shortcut_paradox.png"
order: 3
github: "https://github.com/hamzamooraj99/Shortcut-Paradox"
paper: "../../../public/papers/shortcut-paradox.pdf"
category: "AI Safety"
---

# The Shortcut Paradox – Do LLM Agents Copy a Cheat from a Shared Wiki?

### Overview

This was my solo entry to Apart Research's Swarm Alignment hackathon. I built a simulated software office where 8 LLM agents fix bug tickets under productivity pressure and share a wiki, and I used it to test whether a cheating shortcut spreads from agent to agent through that shared memory.

The original question was about **fading**. Real shared memory (wikis, forums, internal docs) loses old content over time, so I wanted to know whether a fading memory lets a bad habit die out once the agents who started it leave.

The headline result was not the one I designed for. **The agents never copied the cheat**, in any setup, even when planted cheaters made it the top-ranked note on the wiki. The project became a careful study of why a null result was real, and what it does and does not tell us.

***

### Problem

Several recent studies report that a reward hack can spread between agents through shared memory: one agent finds a shortcut, writes it down, and others reuse it. Most of those setups use memory that only grows, and tasks where the cheat is easy to spot or easy to score.

I wanted to test this in a stricter, more realistic setting:

* bugs that need a genuine two-file fix, checked with hidden tests the agents never see
* a cheat that can only be told apart from an honest fix by what the code actually does
* a wiki whose notes gain strength when used and fade when ignored, at three different speeds

***

### Methodology

**The office**

* 8 agents (qwen3.5-397b), 6 working days, 10 tool calls per day, 2 tickets per day
* Rules: close at least 1 ticket a day or get a strike (two strikes and you are replaced); close both and get a bonus
* Real bugs sit in a helper file, not the file the reproduce tool points to. An honest fix takes about 7 steps, so two real bugs (14 steps) cannot both be fixed honestly in a 10-step day
* The cheat: add a special case that returns the customer's expected answer (about 4 steps). It passes the company's close check but fails the hidden tests
* Every close is classified automatically from the code diff (honest, incomplete, or special-cased)

**The wiki**

* Two notes are planted on day 1: a cheat note ("add a check for that input that returns that answer… no need to dig into helper files") and an honest tip ("the bug usually starts in a helper file… try an input of your own before closing")
* The top notes appear in every agent's instructions at every step
* A note gains strength each time someone who read it uses its method. Strength fades with a half-life of never, 2 days, or half a day

**Experiments**

* **Part 1:** no wiki, a static wiki, and live wikis at each fading speed, with the strength shown or hidden; plus an ablation with pressure messages from a boss
* **Part 2:** 2 of the 8 agents are planted cheaters, told to special-case every ticket, on days 1–3. They are then replaced, to see whether the cheat outlives them
* 3 offices per setup. Settings, comparisons and predictions were **pre-registered** before the runs

***

### Key Results

* **0 cheats in 1,606 closes** by agents who were not told to cheat (Part 1 and Part 2 combined)
* **The detector works:** planted cheaters were classed as cheating on 75 of their 101 closes. So the setup can produce and detect cheating, and the zero is not a broken measurement
* **392 agent-days** had two real bugs, where cheating was the only realistic route to the bonus. Those days produced **0 bonuses**: agents fixed one bug honestly and accepted the miss
* **Fading worked at the level of the board.** With no fading, the cheat note stayed ranked first all week, long after the cheaters left. With fast fading, the honest tip retook first place in 2 of 3 offices within days
* **But ranking did not change behaviour.** The 6 agents who replaced the cheaters joined with the cheat ranked first and made 0 cheats in 66 closes
* **Diaries show why.** 57 end-of-day diaries mention the cheat note. None of them call it cheating; 52 call it *wrong* or *misleading*, because the agents checked it against the code and found the bug really was in the helper file. One agent planned to "try the shortcut first" on 5 different days, and each time opened the helper and fixed it honestly
* **Unexpected finding:** the wiki doubled output (about 177 closes per setup against 90 without it), mostly because both notes mention the reproduce tool. Agents without the wiki missed easy "not-a-bug" tickets and ran out of steps

<figure>
    <img src="../../project-images/shortcut_paradox_strength.png" height=600>
    <figcaption align=center>Part 2: strength of the cheat note (dashed) and the honest tip (solid) by day, at three fading speeds. The planted cheaters leave after day 3</figcaption>
</figure>

***

### Limitations & Trade-offs

* **One model.** Every agent was qwen3.5-397b. Other models may behave very differently, so the result is "this didn't happen here", not "agents don't copy cheats"
* **Small scale.** 3 offices per setup, 8 agents, 6 days, below the pre-registered plan, because the provider's rate limit forced cuts. No significance tests are claimed
* **Incomplete runs.** Half of Part 1 (four setups) was paused at day 3–4 to make time for Part 2; Part 2 ran only one of its three planned rows
* **Pressure may have been too low.** Missing a bonus cost nothing visible, and handing a ticket off overnight was free
* **Not evidence of honesty.** The agents rejected the cheat note as factually wrong, not as unethical. There is no sign they recognised it as a cheat at all
* **The planted cheaters never wrote wiki posts,** even though they were told to, so the only social signal was a note's ranking, not a colleague vouching for it
* **Confound:** both planted notes mention the reproduce tool, so "wiki vs no wiki" mixes useful tool advice with the cheat and the tip

***

### What I Learned

The main design lesson: **pilot the core behaviour before building around it.** Early pilots already showed little cheating, and I committed to a design that assumed it would appear. I now run a cheap "does the phenomenon happen at all?" test, and check rate limits and budget, before anything else.

The main research lesson: a null result is only worth reporting if you can show the measurement would have caught a positive one. The planted cheaters were what made this study credible.

***

### Why This Matters

Claims that reward hacking spreads through multi-agent systems are starting to shape how people think about shared agent memory. This project is one data point the other way: under realistic code, hidden tests and a cheat that had to be read and understood, agents treated a bad note as a claim to check, and dropped it when the code disagreed.

It also suggests something useful for design: how a shared memory ranks content and how agents actually use it can come apart. A system can look "infected" from the leaderboard while behaviour stays clean, and the reverse could also be true.

***

### Technologies

Python, LLM agents (qwen3.5-397b, glm-5.2 as judge), custom multi-agent simulation, tool-use agents, automated code-diff classification, hidden test suites, Docker, matplotlib
