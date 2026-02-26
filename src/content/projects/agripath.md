---
title: "Vision-Model Benchmarking for Crop Disease Classification"
description: "Benchmarked CNNs and Vision–Language Models under domain shift to build a robust crop disease classification pipeline across lab and field data."
# date: 2026-02-01
# cover: "/images/diabetes.png"
order: 1
github: "https://github.com/hamzamooraj99/AgriPath-Publication"
---

# Visual Model Architecture Benchmarking for Robust Crop Disease Classification
### Overview
I designed and implemented a unified evaluation framework to systematically compare CNNs, contrastive Vision–Language Models, and generative Vision–Language Models for fine-grained crop disease classification under real-world domain shift.

The goal was not just accuracy under controlled conditions, but robustness across lab and field environments.

---

### Problem
Many computer vision systems for agriculture perform well on curated lab images but degrade significantly when deployed in uncontrolled field conditions.

This project evaluated multiple architectural paradigms under explicit Lab vs Field separation to understand performance trade-offs and robustness characteristics.

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

### System Design

* Domain-aware dataset (65 crop–disease classes with clear lab and field split)
* Unified training and evaluation pipeline across:
  * ResNet-50 (transfer learning baseline)
  * Contrastive VLMs (CLIP, SigLIP)
  * Generative VLMs (Qwen2.5-VL, SmolVLM)
* LoRA fine-tuning for parameter-efficient adaptation
* Deterministic decoding for generative models
* Programmatic output parsing with invalid-generation penalties
* Macro F1 as primary metric
* Separate evaluation for Lab-only, Field-only, and combined regimes


***

### Engineering & Infrastructure

* Designed modular training pipelines supporting CNN, contrastive, and generative VLM backbones under a unified interface
* Implemented parameter-efficient fine-tuning (LoRA) to reduce GPU memory footprint while maintaining adaptation capacity
* Optimised training on RTX 4090 and A100 using mixed precision (bf16)
* Built automated evaluation scripts handling multi-split benchmarking and structured output validation
* Integrated experiment tracking and artifact versioning using Weights & Biases
* Implemented deterministic inference configurations to eliminate stochastic evaluation variance

***

### Technologies

PyTorch, Transformers, PEFT, Unsloth, PyTorch Lightning, Weights & Biases

***
