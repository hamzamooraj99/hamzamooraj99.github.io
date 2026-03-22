---
title: "AgriPath: A Systematic Exploration for Crop Disease Classification"
description: "Built a neural network model to predict diabetes risk, analysing performance under class imbalance using TensorFlow and Keras."
timeline: "Jun 18, 2025 - Mar 8, 2026"
cover: "/project-covers/agripath.png"
order: 1
github: "https://github.com/hamzamooraj99/AgriPath-Publication"
---

# AgriPath: A Systematic Exploration for Crop Disease Classification

### Overview
I designed and implemented a unified evaluation framework to systematically compare CNNs, contrastive Vision–Language Models, and generative Vision–Language Models for fine-grained crop disease classification under real-world domain shift.

The focus was not only on accuracy under controlled conditions, but on **robustness across lab and field environments**, where visual variability is significantly higher.

---

### Problem
Many computer vision systems for agriculture perform well on curated lab images but degrade significantly when deployed in uncontrolled field conditions.

This project evaluates multiple architectural paradigms under explicit Lab vs Field separation to understand **performance trade-offs, generalisation behaviour, and robustness under domain shift**.

---

### Dataset

AgriPath-LF16
* 111,307 images
* 16 crops
* 41 diseases
* 65 crop–disease pairs
* Explicit Lab vs Field source separation

<figure>
    <img src=https://media.contra.com/image/upload/fl_progressive/q_auto:best/eqveib0sd3qvbm3gothx.webp>
    <figcaption>Examples of images of a tomato crop with bacterial spot in AgriPath-LF16. Image (a) is a lab-based image, and (b) is a field-based image</figcaption>
</figure>

Available on HuggingFace:

* Full dataset:\
  <https://huggingface.co/datasets/hamzamooraj99/AgriPath-LF16>

* Balanced subset (used in experiments):\
  <https://huggingface.co/datasets/hamzamooraj99/AgriPath-LF16-30k>

The 30k subset preserves all classes and supports fair evaluation across domain conditions.

---

### Methodology

* Domain-aware dataset with explicit lab/field split
* Unified training and evaluation pipeline across:
  * ResNet-50 (transfer learning baseline)
  * Contrastive VLMs (CLIP, SigLIP)
  * Generative VLMs (Qwen2.5-VL, SmolVLM)
* LoRA fine-tuning for parameter-efficient adaptation
* Deterministic decoding for generative models
* Programmatic output parsing with invalid-generation penalties
* Macro F1 as the primary evaluation metric
* Separate evaluation for Lab-only, Field-only, and combined regimes

---

### Key Findings

* Model performance varies significantly across **lab vs field conditions**, highlighting the importance of explicit domain-aware evaluation.
* CNNs achieve strong performance under controlled conditions but show reduced robustness under field variability.
* Contrastive VLMs demonstrate improved generalisation across domains compared to CNN baselines.
* Generative VLMs introduce additional failure modes, including **invalid or unparsable outputs**, requiring structured evaluation (Parse Success Rate), but most improved generalisability between lab and field domains.
* Deterministic decoding and output validation are necessary for reliable evaluation of generative models.

These results show that **architectural choice strongly affects robustness under real-world conditions**, and that evaluation must account for both accuracy and generation reliability.

---

### Engineering & Infrastructure

* Designed modular training pipelines supporting CNN, contrastive, and generative VLM backbones under a unified interface
* Implemented parameter-efficient fine-tuning (LoRA) to reduce GPU memory footprint while maintaining adaptation capacity
* Optimised training on RTX 4090 and A100 using mixed precision (bf16)
* Built automated evaluation scripts handling multi-split benchmarking and structured output validation
* Integrated experiment tracking and artifact versioning using Weights & Biases
* Implemented deterministic inference configurations to eliminate stochastic evaluation variance

---

### Limitations & Future Work

* Current evaluation focuses on image classification; extending to multi-step or agentic settings would better reflect real deployment conditions.
* Generative model evaluation is constrained by parsing-based metrics; richer evaluation frameworks could better capture semantic correctness.
* Dataset, while diverse, is still limited to 16 crops and could be expanded for broader generalisation analysis.

---

### Technologies

PyTorch, Transformers, PEFT, Unsloth, PyTorch Lightning, Weights & Biases

***
