---
title: "Multimodal Medical QA Assistant with RAG"
description: "Designed and built a multimodal medical QA system using RAG, FAISS, LLaMA and Whisper to ground responses in trusted NHS healthcare data."
timeline: "Jan 12, 2025 - Apr 12, 2025"
cover: "/project-covers/medqa.png"
order: 3
github: "https://github.com/hamzamooraj99/Medical-CA-w-RAG"
---

# Medical QA Assistant with Retrieval-Augmented Generation

### Overview

I led a team project to design and implement a multimodal medical conversational agent grounded in authoritative healthcare data from NHS Inform Scotland.

The system combined retrieval-augmented generation (RAG), speech input, and a proof-of-concept visual pipeline to investigate whether external grounding could improve the factual reliability of responses in a safety-critical domain.

***

### Problem

Large language models can produce fluent responses in medical question answering, but these responses may be inaccurate or unsupported.

The objective of this project was to evaluate whether RAG could improve the **accuracy and reliability** of a medical conversational agent, while also examining the practical usability challenges of deploying such a system in a multimodal setting.

***

### Methodology

**Core QA Pipeline**

* Fine-tuned Llama-3.1-8B for medical question answering using MedQA
* Built a FAISS-based retrieval pipeline over an NHS Inform Scotland knowledge source
* Generated semantic embeddings using MiniLM
* Compared model behaviour **with and without RAG**
* Implemented a Gradio/Open WebUI-style interface for interaction and testing

**Multimodal Integration**

* Used Whisper for speech-to-text transcription
* Built a tri-modal proof-of-concept pipeline with visual input support
* Used a vision-language model to process medical imagery and feed textual outputs into the QA pipeline

**Design Decisions**

* Grounded retrieval only in the NHS knowledge source to improve factual consistency
* Structured the system so RAG could be toggled on and off for direct comparison
* Treated the multimodal pipeline as an exploratory extension rather than a fully evaluated final system

***

### Key Results

* RAG improved performance across all intrinsic evaluation metrics:
  * **BLEU:** 0.001994 → 0.002742
  * **ROUGE:** 0.1186 → 0.1211
  * **BERTScore:** 0.7892 → 0.8333
* The strongest improvement was in **semantic similarity**, with BERTScore increasing by **5.6%**, indicating that RAG helped the model produce responses that more closely matched the meaning of the NHS reference material.
* BLEU and ROUGE improved only modestly, suggesting that RAG had a stronger effect on **factual grounding and semantic correctness** than on surface-level fluency or phrasing.
* Heuristic evaluation showed that **without RAG**, the system could produce factually incorrect responses, while **with RAG**, accuracy improved but new usability issues appeared, including formatting problems, repetitive hyperlinks, and latency.
* The tri-modal system was developed as a **proof of concept**, but was not formally evaluated due to the lack of a suitable multimodal conversational medical dataset.

Overall, the project showed that RAG can improve the reliability of medical QA systems, but that improved grounding does not automatically produce a usable or polished end-user experience. :contentReference[oaicite:1]{index=1}

***

### Limitations & Trade-offs

* RAG improved semantic accuracy, but did not substantially improve fluency or language naturalness. :contentReference[oaicite:2]{index=2}
* Responses could still be difficult for general users to interpret because of overly complex medical terminology. :contentReference[oaicite:3]{index=3}
* Enabling RAG introduced practical issues such as latency, formatting inconsistencies, and repetitive hyperlinks. :contentReference[oaicite:4]{index=4}
* The multimodal pipeline was only a proof of concept and could not be rigorously evaluated because an appropriate conversational visual medical dataset was unavailable. :contentReference[oaicite:5]{index=5}
* The underlying medical knowledge source was region-specific and limited to NHS Inform Scotland content. :contentReference[oaicite:6]{index=6}

***

### Technologies

Llama 3.1, FAISS, MiniLM, Whisper, Qwen2-VL, PyTorch, Gradio

***

<img src="/public/project-images/fluRAG.png" width="200" height="100"></img>
<img src="/public/project-images/vision_RAG_retrieval.png" width="200" height="100"></img>
