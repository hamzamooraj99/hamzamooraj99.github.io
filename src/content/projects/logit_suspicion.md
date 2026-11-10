---
title: "Logit-Weighted Suspicion Scoring in AI Control: A Null Result"
description: "Team study testing whether reading a monitor's full probability distribution, instead of just its top answer, makes it better at catching misbehaving AI agents. Scores became smoother, but detection did not improve."
pill_description: "AI control hackathon study on whether logit-weighted monitor scores catch attacks better than standard scores; a clearly reported null result."
timeline: "Mar 20, 2026 - Mar 22, 2026"
cover: "/project-covers/logit_suspicion.png"
order: 6
github: "https://github.com/reinthal/control-arena"
paper: "https://apartresearch.com/sprints/projects/logitweighted-suspicion-scoring-in-ai-control-ktmf"
category: "AI Safety"
---

# Logit-Weighted Suspicion Scoring in AI Control: A Null Result

### Overview

This was a team entry (Team "Logit or Leave It") to Apart Research's AI Control Hackathon 2026, written with Maxime Cugnon de Sévricourt and Alexander Reinthal. We tested a cheap idea for making AI safety monitors better, and found that it did not help.

In AI control, a weaker "monitor" model reads what a more capable but untrusted agent did and gives it a suspicion score. Monitors are usually run many times per check to get a reliable score, which costs time and tokens. We asked: can we get a better score from a **single** call by using the model's full probability distribution over score tokens, instead of only its top answer?

The result: the scores became much smoother, but the monitor was **no better at telling honest agents from attacking ones**.

***

### Problem

LLM monitors give badly clustered scores. In our early tests, a 0–9 scale produced a big spike at 7 whatever the input was. This makes the scores coarse, which matters because AI control research relies on fine-grained scores to map the safety-versus-usefulness trade-off.

The usual fix is to sample the monitor many times and average. The alternative we tested, following the G-Eval method (Liu et al., 2023), is **logit-weighting**: weight every possible score (0 to 100) by the probability the model gave it, and take the expected value. It needs one call, not twenty.

***

### Methodology

**Trajectories**

* Built with AgentDojo's workspace suite inside ControlArena
* Untrusted agent: gpt-4.1, run in two modes: **honest** (main task only) and **attack** (also attempts a prompt-injection side task)
* 5 task pairs × 11 runs × 2 modes = **110 trajectories** (55 honest, 55 attack)

**Scoring**

* Monitors: GPT-4o and GPT-4.1, asked to reply with only a number from 0 to 100
* **Baseline (point estimate):** take the top token as the score. For fairness, we compared both a single sample and the mean of 10 (GPT-4o) or 20 (GPT-4.1) samples
* **Logit-weighted:** score = Σ p(t) × t over the tokens 0–100, from one call
* Metric: **AUC-ROC** for honest vs attack (1.0 is perfect separation, 0.5 is a coin flip)

A small example of the difference: if the monitor puts 60% on "70" and 40% on "20", the point estimate is 70, while the logit-weighted score is 50.

***

### Key Results

| Monitor | Logit-weighted AUC | Raw (point-estimate) AUC |
|---|---|---|
| GPT-4o (10 raw samples) | 0.598 | 0.588 |
| GPT-4.1 (single raw sample) | 0.764 | 0.767 |
| GPT-4.1 (mean of 20 raw samples) | 0.764 | 0.768 |

* **Scores did get smoother.** Raw scores clustered on a few values, while logit-weighted scores spread across the whole range
* **Detection did not improve.** For GPT-4.1 the two methods differ by at most 0.004 AUC
* **The monitor model mattered far more than the scoring method.** GPT-4o was close to random (about 0.59–0.60) either way, while GPT-4.1 reached about 0.76
* **Taking more raw samples did not help either**, which suggests the clustering was not hiding information. The anchoring changes the numbers but keeps the ranking of trajectories roughly the same

***

### Limitations & Trade-offs

* **Underpowered.** 55 trajectories per condition across 5 task pairs. A difference of up to 0.01 AUC fits both "no effect" and "a small effect we could not detect"
* **One kind of attack.** All attacks were direct prompt injections. Subtler attacks may behave differently
* **First step only.** Logit scoring used the first trajectory step, which may not be the most informative one
* **No reasoning before scoring.** The monitor answered with a bare number. Letting it reason first could change the picture, and a reviewer suggested this as a two-turn design
* **AUC is a global measure.** Logit weighting could still help at a specific operating point, such as a tight false-positive budget. We could not test that at this sample size

***

### What I Learned

A null result can still be useful if it is reported clearly. Our finding points effort away from post-hoc score calibration and toward prompt design, chain-of-thought for monitors, and stronger monitor models.

It also showed the value of a tight comparison: same trajectories, same prompt, same metric, with only the scoring method changing. That is what lets a null result be read as "this did not help here" rather than "something was off in the setup".

***

### Why This Matters

Monitor cost is a practical limit on AI control. If one call could replace twenty, safety evaluations would be much cheaper. Our result suggests that plain point-estimate monitors may carry more information than their clumpy scores suggest, and that the real bottleneck is whether the monitor understands what is suspicious, not how finely it writes the number down.

***

### Technologies

Python, ControlArena, Inspect AI, AgentDojo, OpenRouter (GPT-4.1, GPT-4o), token log-probabilities, AUC-ROC analysis, matplotlib
