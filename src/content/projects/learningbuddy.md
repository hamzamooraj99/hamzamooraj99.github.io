---
title: "AI Learning Buddy – RAG Academic Assistant"
description: "Designed and deployed a containerized RAG-based academic assistant using Milvus and local LLaMA to ground answers in course materials."
timeline: "Jul 15, 2025 - Sep 15, 2025"
cover: "/project-covers/learningbuddy.png"
order: 4
github: "https://github.com/hamzamooraj99/HWU-AI-Learning-Buddy-PoC"
---

<figure>
    <img src=https://media.contra.com/image/upload/fl_progressive/q_auto:best/u5kd37fk0b6yj2zgp5ry.webp style="display: block; margin: 0 auto">
</figure>

# AI Learning Buddy – RAG-Based Academic Assistant (Proof of Concept)

### Overview

I designed and implemented a retrieval-augmented “Learning Buddy” to support university students by answering course-specific questions grounded in official materials.

The system was deployed on a university-managed server as a containerized, local-first solution, and evaluated across multiple courses to study its behaviour under realistic usage conditions.

---

### Problem

Students often struggle to locate precise information within large volumes of course documentation.

The goal was to build a **document-grounded assistant** that could provide accurate, course-specific answers while preserving data privacy, and to evaluate how such a system performs across different types of queries and document structures.

***

### Methodology

**System Architecture**

* Document ingestion pipeline (PDF → Markdown → structured JSON)
* Semantic embeddings using BAAI/bge-small-en-v1.5
* Vector search via Milvus
* Local LLaMA 3 model served through Ollama
* Streamlit web interface
* Docker Compose orchestration across services

**Key Design Decisions**

* Course-level data isolation using `course_id` filtering in the vector database  
* Fully local deployment to eliminate reliance on external APIs  
* Modular ingestion → embedding → indexing → retrieval pipeline  
* Structured evaluation using manually curated test queries  

---

### Key Results

* The system achieved **75% accuracy (F21CA)** and **77% accuracy (F21NL)** across evaluated question sets. :contentReference[oaicite:0]{index=0}  
* Performance varied significantly depending on **query type and interaction structure**:
  * Strong performance on out-of-scope and policy-based queries  
  * Lower performance on factual and multi-turn questions (as low as ~60% in some cases) :contentReference[oaicite:1]{index=1}  
* The system demonstrated **different behaviour across courses**, despite similar overall accuracy:
  * Better multi-turn handling in F21NL (~84.6%)  
  * Stronger out-of-scope handling in F21CA :contentReference[oaicite:2]{index=2}  
* A key finding was that **document structure strongly affects retrieval performance**:
  * Complex, multi-column or poorly formatted documents reduced accuracy  
  * Cleaner, well-structured documents led to more reliable retrieval and responses :contentReference[oaicite:3]{index=3}  

These results show that RAG system performance is not only model-dependent, but **highly sensitive to the structure and quality of the underlying knowledge base**.

---

### Limitations & Trade-offs

* The system is limited to a **single-server architecture**, restricting scalability. :contentReference[oaicite:4]{index=4}  
* The data ingestion pipeline is **manual and error-prone**, making it unsuitable for dynamic updates. :contentReference[oaicite:5]{index=5}  
* Hallucination is reduced but not eliminated; errors can still occur if retrieved context is misinterpreted. :contentReference[oaicite:6]{index=6}  
* Performance depends heavily on document formatting and data quality, which are outside the model itself. :contentReference[oaicite:7]{index=7}  

---

### Technologies

LLaMA 3, Milvus, Docker, Streamlit, Hugging Face

***

### Workflow

<figure>
    <img src=https://media.contra.com/image/upload/fl_progressive/q_auto:best/xtyahu4mkennpppqjygu.webp style="display: block; margin: 0 auto">
    <figcaption align=center>The sequence of events when a user submits a prompt to the RAG-enhanced LLM</figcaption>
</figure>
