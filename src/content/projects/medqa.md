---
title: "Multimodal Medical QA Assistant with RAG"
description: "Designed and built a multimodal medical QA system using RAG, FAISS, LLaMA and Whisper to ground responses in trusted NHS healthcare data."
timeline: "Jan 12, 2025 - Apr 12, 2025"
# cover: "/images/diabetes.png"
order: 2
github: "https://github.com/hamzamooraj99/Medical-CA-w-RAG"
---

# Medical QA Assistant with Retrieval-Augmented Generation

### Overview

I led a team project to design and implement a multimodal medical conversational agent grounded in authoritative healthcare data (NHS Inform Scotland).

The system integrates retrieval-augmented generation (RAG), speech input, and image understanding to provide context-aware medical responses.

***

### Problem

Large language models can generate fluent responses but often hallucinate in safety-critical domains like healthcare.

The objective was to improve factual reliability by grounding responses exclusively in a trusted medical knowledge base.

***

### System Architecture

* Vector database built from NHS medical content
* Semantic embeddings generated using MiniLM
* FAISS indexing for efficient similarity search
* Retrieval-Augmented Generation pipeline using LLaMA
* 4-bit quantization for efficient inference (Unsloth)
* Fine-tuning on domain-specific QA data (MedQA)

***

### Multimodal Pipeline

* Integrated Whisper for speech-to-text input
* Used a Vision–Language model to caption medical images
* Embedded image captions into the user query before retrieval
* Combined multimodal signals into a single grounded generation prompt

***

### Engineering Decisions & Optimisation

* Separated retrieval corpus from fine-tuning data to preserve strict knowledge grounding
* Removed auxiliary FAISS indexes to prevent cross-source hallucination
* Tuned prompt templates to minimise speculative generation
* Modularised pipeline to allow RAG-on vs RAG-off benchmarking
* Implemented Gradio interface for interactive testing and evaluation

***

### Technologies

LLaMA, FAISS, Hugging Face Transformers, Whisper, Gradio, PyTorch

***
