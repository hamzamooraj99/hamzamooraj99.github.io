---
title: "AgriPath: A Systematic Exploration of Crop Disease Classification"
description: "Empirical study of model behaviour and robustness under domain shift, comparing CNNs and vision-language models across lab and field conditions."
pill_description: "Empirical study of robustness and failure modes under lab–field domain shift in crop disease classification."
timeline: "Jun 18, 2025 - Mar 8, 2026"
cover: "/project-covers/agripath.png"
order: 1
github: "https://github.com/hamzamooraj99/AgriPath-Publication"
category: "Research"
---

# AgriPath: A Systematic Exploration of Crop Disease Classification

### Overview
This project investigates how different model architectures behave under real-world domain shift in crop disease classification. I designed a unified evaluation framework to compare CNNs, contrastive vision–language models, and generative vision–language models across controlled (lab) and uncontrolled (field) conditions.

Rather than focusing only on accuracy, the work examines **robustness, failure modes, and generalisation behaviour** under realistic variability, where deployment conditions differ significantly from training data.

---

### Problem
Many computer vision systems for agriculture achieve high accuracy on curated lab datasets but degrade significantly in real-world field conditions.

This raises a key question:  
>**How do different model classes behave under domain shift, and which approaches are more reliable when deployed in less controlled environments?**

To answer this, the project evaluates multiple architectural paradigms under explicit lab vs field separation, analysing **performance degradation, generalisation gaps, and robustness across domains**.

---

### Dataset

AgriPath-LF16
* 111,307 images
* 16 crops
* 41 diseases
* 65 crop–disease pairs
* Explicit Lab vs Field source separation

<figure>
    <img src="../../src/content/projects/project-images/dataset_domains.png">
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

* Domain-aware dataset with explicit lab/field separation  
* Unified evaluation across:
  * ResNet-50 (transfer learning baseline)
  * Contrastive VLMs (CLIP, SigLIP)
  * Generative VLMs (Qwen2.5-VL, SmolVLM)
* LoRA-based parameter-efficient fine-tuning  
* Deterministic decoding for generative models  
* Structured output parsing with invalid-generation penalties  
* Macro F1 as the primary metric  
* Separate evaluation across Lab-only, Field-only, and combined regimes  

---

### Key Findings

* Performance drops significantly from lab to field conditions, demonstrating strong sensitivity to domain shift.  
* CNNs achieve high accuracy in controlled settings but show limited robustness under real-world variability.  
* Contrastive VLMs generalise better across domains, suggesting stronger robustness to visual variation.  
* Generative VLMs introduce new failure modes, including **invalid or unparsable outputs**, requiring structured evaluation (Parse Success Rate).  
* High parse success does not guarantee semantic correctness, highlighting a gap between format compliance and task performance.  
* Deterministic decoding and output validation are necessary for reliable evaluation of generative systems.  

These results show that **model architecture directly affects reliability under deployment-like conditions**, and that evaluation must account for both predictive accuracy and failure behaviour.

---

### Engineering & Infrastructure

* Built modular pipelines supporting CNN, contrastive, and generative VLMs under a unified interface  
* Implemented LoRA fine-tuning for efficient adaptation  
* Optimised training on RTX 4090 and A100 with mixed precision (bf16)  
* Developed automated evaluation scripts for multi-split benchmarking and output validation  
* Integrated experiment tracking with Weights & Biases  
* Enforced deterministic inference to eliminate stochastic evaluation variance  

---

### Limitations & Future Work

* Current setup focuses on classification; extending to sequential or agent-based settings would better reflect real deployment conditions.  
* Parsing-based evaluation for generative models does not fully capture semantic correctness; richer evaluation methods are needed.  
* Dataset scope is limited to 16 crops with unknown region bias; broader coverage and region information would improve generalisation analysis and deploymentability.

---

### Technologies

PyTorch, Transformers, PEFT, Unsloth, PyTorch Lightning, Weights & Biases

***
