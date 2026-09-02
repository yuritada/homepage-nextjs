---
title: "Autonomous Quality Assurance for Indoor Scene Generation under Architectural Constraints via Two-Layer Knowledge Inheritance with the Model Context Protocol"
date: "2026-03"
type: "paper"
event: "DEIM2026 (18th Forum on Data Engineering and Information Management)"
tags: ["Research", "MCP", "LLM", "3D Generation"]
summary: "The paper behind the system that catches the structural errors — geometric hallucination — in AI-generated 3D models numerically rather than visually, and repairs them autonomously. Presented at the DEIM2026 interactive session. Written in Japanese."
file: "/slides/deim2026-paper.pdf"
relatedPost: "2026-03-15-deim2026-mcp-text-to-3d"
---

The final manuscript of the research I presented at DEIM2026. *The paper itself is written in Japanese.*

AI that generates 3D models from text frequently produces structural errors — doors floating in mid-air, windows punching through walls — even when the result looks natural. Rather than showing the LLM an image, this work has it **read the scene's numbers (coordinates and dimensions) directly through MCP (the Model Context Protocol) and compute on them**. A two-layer knowledge base — "regulatory knowledge" encoding Japan's Building Standards Act, and "experiential knowledge" accumulating the tricks learned while repairing — lets the AI inspect and fix its own work.

In the experiments, repeating the repair of an identically defective scene brought both the number of turns and the token cost down to under a third (9 turns / 220k tokens → 2 turns / 91k tokens) without retraining the model.

LayerX's DEIM2026 conference report picked this work as one of the four posters their engineers found most interesting.
