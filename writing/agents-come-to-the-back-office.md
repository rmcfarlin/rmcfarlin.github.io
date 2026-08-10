---
title: Agents Come to the Back Office
description: AI adoption is nearly universal and the value is still thin. The difference is the foundation underneath — and finance is about to find out which kind it built.
date: 2026-07-02
status: draft
---

# Agents Come to the Back Office

Finance has been automated twice before. The spreadsheet took the arithmetic. The ERP took the filing. Each time, the people stayed and the work moved up a level — from computing the numbers to assembling them, from assembling them to explaining them.

The third wave is agents, and it is aimed at the assembly.

## What an agent actually is

Strip the marketing off. An agent is software that pursues a goal across systems instead of executing a script inside one. A macro reconciles the account you pointed it at, the way you told it to. An agent is told "reconcile the intercompany accounts and flag what doesn't tie," and it works out the steps — pulls the balances, matches the transactions, isolates the exceptions, drafts the explanation, and leaves an evidence trail behind it.

That distinction — script versus goal — is why this wave reaches work the last two waves couldn't. Most of what a finance department does between the transaction and the decision is assembly: gather, match, tie out, format, narrate. It is rule-dense, high-volume, and low-judgment. It is exactly what agents are built for.

## Adoption is wide. Value is thin.

The numbers say both things at once. McKinsey's November 2025 State of AI survey found that 88% of organizations now use AI in at least one business function — near-universal adoption. The same survey found only 39% can attribute any EBIT impact to it, and most of those put the impact below 5% of earnings ([McKinsey, *The State of AI*, November 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)).

Finance specifically is following the same curve. Gartner predicted that 90% of finance functions will deploy at least one AI-enabled solution by 2026 — while fewer than 10% will see any headcount reduction from it ([Gartner, September 2024](https://www.gartner.com/en/newsroom/press-releases/2024-09-12-gartner-predicts-that-90-percent-of-finance-functions-will-deploy-at-least-one-ai-enabled-tech-solution-by-2026)). By 2025, 57% of finance teams were implementing or planning agentic AI specifically ([Gartner, *Agentic AI Will Transform Finance*](https://www.gartner.com/en/articles/agentic-ai-in-finance)). And yet a Gartner poll of 183 CFOs found AI usage essentially flat year over year — 59%, up from 58% ([CFO Dive](https://www.cfodive.com/news/cfos-ai-adoption-slows-challenges-mount-gartner/805949/)).

Everyone is adopting. Few are compounding. That gap is the most important fact in enterprise AI right now, and it has a boring explanation.

## The foundation determines the return

An agent amplifies whatever system it lands on. Put one on top of clean data with governed definitions and it moves like a good analyst on their best day. Put one on top of five disconnected systems, three versions of "margin," and tribal knowledge that lives in someone's head, and it produces confident nonsense at scale.

Most companies bought the agent before they built the foundation. That is why adoption is at 88% and EBIT impact is a rounding error.

I've made the argument elsewhere that the semantic layer — the ontology — is the interface agents actually consume. The practical version of that argument is simple: before an agent can reconcile your accounts, something has to define what "reconciled" means, which systems hold truth, and what an exception is. If those definitions live in the model, the agent works. If they live in Barb's memory of how we've always done it, the agent guesses.

The foundation work is unglamorous. It is also the entire difference between the 39% and everyone else.

## What agents should and shouldn't own

Where agents are already earning their keep in finance: transaction matching and reconciliation, first-draft variance narratives, data assembly for the close, continuous monitoring for anomalies — the work where the rules are knowable and the volume is punishing.

What they should not own: judgment and accountability. An agent can draft the variance explanation; a person decides whether it is true. An agent can propose the journal entry; a person owns what posts to the ledger. This is not sentiment. It is control design. I spent part of my career building an internal audit function from zero, and the lesson transfers directly: every action that touches the financial statements needs an accountable owner and an evidence trail. Agents don't change that requirement — they extend it. Machine actions need logs, change control, and review, the same as human ones. "The agent did it" cannot be a line in an audit finding.

## The honest problem: where do controllers come from now?

One concern deserves plain acknowledgment. The work agents absorb first — tying out accounts, assembling schedules, chasing reconciling items — is the same work where every controller and CFO I know, myself included, learned how the numbers actually fit together. It was tedious, and it was the apprenticeship.

If the assembly work goes to software, the profession has to rebuild the apprenticeship on purpose: reviewing agent output critically, tracing exceptions to root cause, learning the definitions layer the way we once learned the subledgers. The firms that figure out how to grow judgment without ten thousand hours of manual tie-outs will have a durable advantage. The ones that don't will have senior people who can't check the machine's work.

## What I'm doing

Three rules, none of them exotic.

Start where the work is high-volume, rule-dense, and low-judgment — reconciliation and assembly, not analysis and negotiation. Measure the result in hours returned to the team, not vendor slideware.

Keep a human between the agent and the ledger. Draft is automated; posting is owned.

Build the definitions first. Every month spent on the semantic foundation buys more than a month of agent performance later, because the agent's ceiling is the foundation's quality.

The agents are coming to the back office either way. The only question a CFO controls is whether they arrive on rails you built or wander in over a swamp.

---

## Sources

- McKinsey & Company, [*The State of AI: Global Survey*](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) (November 2025) — 88% of organizations use AI in at least one function; 39% attribute any EBIT impact, most below 5%.
- Gartner, [*Gartner Predicts That 90% of Finance Functions Will Deploy at Least One AI-Enabled Technology Solution by 2026*](https://www.gartner.com/en/newsroom/press-releases/2024-09-12-gartner-predicts-that-90-percent-of-finance-functions-will-deploy-at-least-one-ai-enabled-tech-solution-by-2026) (September 2024).
- Gartner, [*Agentic AI Will Transform Finance: Here's What CFOs Should Do Now*](https://www.gartner.com/en/articles/agentic-ai-in-finance) — 57% of finance teams implementing or planning agentic AI.
- CFO Dive, [*CFOs' AI adoption slows as challenges mount: Gartner*](https://www.cfodive.com/news/cfos-ai-adoption-slows-challenges-mount-gartner/805949/) — CFO AI usage at 59%, up from 58% the prior year.
