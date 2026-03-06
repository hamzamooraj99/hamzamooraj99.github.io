---
title: "Mechanistic Analysis of Induction in a Tiny Transformer"
description: "Investigated how a transformer solves a synthetic periodic induction task using attention probing and targeted interventions to reveal shortcut mechanisms."
timeline: "Feb 28, 2026 - Mar 7, 2026"
cover: "/project-covers/toy_tran_mi.png"
order: 2
github: "https://github.com/hamzamooraj99/tiny-transformer-mech-interp"
---

# Mechanistic Analysis of Induction in a Tiny Transformer

### Overview

I designed and implemented a mechanistic interpretability study to analyse how a small transformer solves a synthetic periodic induction task.

Although the trained model achieved perfect prediction accuracy within the repeated region of the sequence, attention probing and targeted interventions revealed that the model did **not** learn the canonical induction circuit typically expected in such tasks.

Instead, the model relied on a **position-dependent shortcut** supported by diffuse recency-biased attention patterns.

***

### Problem

Transformers trained on repeated-sequence tasks are often assumed to develop *induction heads*—attention circuits that copy tokens from previous positions.

However, behavioural success alone does not guarantee that the intended algorithmic mechanism has emerged.

The objective of this project was to determine **how the model actually solves the task** by combining mechanistic probes with controlled interventions.

***

### Task Setup

Synthetic periodic induction dataset:

* Vocabulary size: 20
* Sequence length: 32
* Pattern length: 8
* 4 repeated pattern blocks per sequence

Example sequence:


> [A B C D E F G H A B C D E F G H A B C D E F G H ...]


Model architecture:

* Decoder-only Transformer
* 2 layers
* 4 attention heads
* Hidden size: 64
* MLP size: 256

Training objective: autoregressive next-token prediction.

***

### Attention Probing

Attention probes were used to measure whether the model attends to the expected induction offset $( j = i - P)$.

<figure>
    <img src="/project-images/offset_diagonal_mean_std1.png" height=400>
    <figcaption>Mean attention assigned to the expected induction offset across attention heads.</figcaption>
</figure>

Despite perfect task performance, attention weights remained close to the **uniform-attention baseline**, indicating the absence of a strong induction head.

Attention heatmaps further revealed **diffuse recency-biased gradients** rather than a clear induction diagonal.

<figure>
    <img src="/project-images/attn_heatmap_L0_H1.png" height=400>
    <figcaption>Example attention heatmap showing recency-biased attention rather than token-copying behaviour.</figcaption>
</figure>

***

### Intervention Experiments

To diagnose the model’s strategy, three targeted interventions were performed.

**Positional Ablation**

Removing positional embeddings during evaluation caused predictive accuracy to collapse to near-random performance, demonstrating that the learned behaviour depends critically on positional signals.

**Phase Rotation**

Cyclically shifting the sequence with `torch.roll` produced no measurable change in accuracy, indicating that the model does not rely on a fixed phase alignment of the pattern.

**Prefix Perturbation**

Random tokens inserted at the beginning of the sequence preserved high induction-region accuracy.

<figure>
    <img src="/project-images/offset_diagonal_mean_std3.png" height=400>
    <figcaption>Offset-diagonal attention under prefix perturbation.</figcaption>
</figure>

This suggests the learned strategy is not tied to a strict periodic structure anchored at the start of the sequence.

***

### Key Findings

* Perfect behavioural performance does **not** imply a canonical induction circuit.
* Attention patterns remained **diffuse and recency-biased**.
* The model relied heavily on **positional information**.
* The task was solved via a **position-dependent shortcut rather than token copying**.

This highlights the importance of mechanistic analysis when interpreting neural network behaviour.

***

### Technologies

PyTorch, Matplotlib, Weights & Biases

***
