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

Although the model achieved perfect prediction accuracy within the repeated region, analysis revealed that it did **not** learn the expected induction circuit. Instead, it relied on a **position-dependent shortcut** supported by diffuse recency-biased attention patterns.

This project investigates how behavioural success can mask fundamentally different internal mechanisms.

***

### Problem

Transformers trained on repeated-sequence tasks are often assumed to develop *induction heads*—attention circuits that copy tokens from previous positions.

However, strong behavioural performance does not guarantee that the intended algorithmic mechanism has emerged.

The objective of this project was to determine **how the model actually solves the task**, using attention probing and targeted interventions to diagnose its internal strategy.

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

### Methodology

Two complementary approaches were used to analyse the model’s behaviour:

**Attention Probing**

Measured whether the model attends to the expected induction offset $( j = i - P)$.

<figure>
    <img src="/project-images/offset_diagonal_mean_std1.png" height=400>
    <figcaption>Mean attention assigned to the expected induction offset across attention heads.</figcaption>
</figure>

Despite perfect task performance, attention weights remained close to a **uniform-attention baseline**, indicating the absence of a strong induction head. Heatmaps showed **diffuse recency-biased attention** rather than a clear induction diagonal.

<figure>
    <img src="/project-images/attn_heatmap_L0_H1.png" height=400>
    <figcaption>Example attention heatmap showing recency-biased attention rather than token-copying behaviour.</figcaption>
</figure>

**Intervention Experiments**

To test causal dependencies in the learned strategy:

- **Positional Ablation:** Removing positional embeddings caused accuracy to collapse to near-random performance, showing strong dependence on positional signals.  
- **Phase Rotation:** Cyclic sequence shifts had no effect, indicating the model does not rely on fixed phase alignment.  
- **Prefix Perturbation:** Random prefixes preserved performance, suggesting the strategy is not anchored to sequence start.

<figure>
    <img src="/project-images/offset_diagonal_mean_std3.png" height=400>
    <figcaption>Offset-diagonal attention under prefix perturbation.</figcaption>
</figure>

***

### Key Findings

* Perfect behavioural performance does **not** imply a canonical induction circuit.
* Attention patterns remained **diffuse and recency-biased**, rather than sharply aligned with induction offsets.
* The model relied heavily on **positional information** rather than token copying.
* The task was solved via a **position-dependent shortcut**, not the intended algorithm.

These results show that models can achieve correct outputs while using **unexpected and potentially fragile internal strategies**, highlighting the need for mechanistic analysis when evaluating model behaviour.

***

### Technologies

PyTorch, Matplotlib, Weights & Biases

***
