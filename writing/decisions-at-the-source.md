---
title: Decisions at the Source
description: The most expensive decisions in manufacturing are made a month late, in a conference room, from a PDF. Move the data to where the decision happens.
date: 2026-07-02
status: draft
---

# Decisions at the Source

The most expensive decisions in manufacturing are made a month late, in a conference room, from a PDF.

The plant ran the month. The books closed. The variance report landed in a meeting where the people who could have fixed the problem learn about it three to six weeks after it started. Everyone nods, someone commits to "watch that closely," and the next month's version of the same meeting is already scheduled.

I spent years inside that loop — first producing the reports, then running the meetings. The problem was never the analysis. The problem was the latency.

## Information decays like inventory

APQC's benchmarking across thousands of organizations puts the median monthly close at 6.4 calendar days, with the bottom quartile needing ten or more ([APQC, *Cycle Time to Perform the Monthly Close*](https://www.apqc.org/resource-library/resource/cycle-time-perform-monthly-close)). Add the time to produce reporting and convene the meeting, and the standard operating rhythm of manufacturing finance is this: decisions about week one are made in week seven.

A scrap problem that started on the third of the month has run for five weeks before anyone with authority discusses it. A machine bleeding labor variance has bled through two pay cycles. The information was in the building the whole time — sitting in the ERP, waiting for the close, the way grain waits in a silo.

Information decays like inventory. It is worth the most the day it is produced, and something less every day it sits.

## The data says this works

The evidence that data-driven operation pays is old enough to predate the current tooling. Brynjolfsson, Hitt, and Kim studied 179 large public firms and found that companies adopting data-driven decision-making showed output and productivity 5–6% higher than their other investments would predict, with the effect visible in asset utilization, return on equity, and market value ([Brynjolfsson, Hitt & Kim, *Strength in Numbers*, 2011](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1819486)).

That study is from 2011 — before modern lakehouses, before semantic layers, before dashboards were cheap. The premium existed when getting the data was hard. The tooling since then has collapsed the cost side of the equation, which makes the remaining question organizational, not technical: does the data reach the person who makes the decision, while the decision still matters?

## What we did

As a division controller, I owned a plant P&L and sat close enough to operations to see the loop from both sides. The fix we landed on was not a better monthly package. It was moving the numbers to the floor: KPI dashboards in front of plant managers — inventory, carrying cost, the operating drivers they could actually turn — refreshed on the cadence of the work instead of the cadence of the close.

The decisions changed because the audience changed. A plant manager who sees inventory aging *this week* pulls the order forward, changes the run schedule, calls the customer. The same manager seeing it in a month-old report can only explain it. Explanation is what latency leaves behind after the decision window closes.

Years later we rebuilt the whole reporting stack on a lakehouse with a semantic layer, and the same principle held at enterprise scale: production, labor, and financial signals in near real-time, one set of definitions, visible to the people who own the outcomes. The technology matured. The idea didn't change: **move the decision to the data's freshness, or move the data to the decision's location. Ideally both.**

## The failure mode: dashboard theater

Every manufacturer now has dashboards. Most of them are decoration.

Dashboard theater looks like this: a wall of metrics nobody owns, definitions that vary by report, lagging indicators dressed as insight, and a refresh cadence disconnected from any decision anyone actually makes. It photographs well on a plant tour. It changes nothing.

The test of a dashboard is not whether it is accurate. It is whether a decision changed because of it. If you cannot name the decision a metric feeds, the metric is entertainment.

Five design rules I hold to now:

**The decision-maker owns the dashboard, not the analyst.** If the plant manager didn't help pick the metrics, the plant manager won't act on them.

**Leading indicators over lagging.** Scrap rate, downtime, labor variance, inventory age — things that predict the month. Net income is a scoreboard, not a steering wheel.

**One definition per number.** If "utilization" means three things in three rooms, the meeting is about reconciliation instead of action. Definitions live in the semantic model, governed, written once. This is the unglamorous foundation everything else stands on.

**Latency matched to the decision.** A shift-level decision needs shift-fresh data. A pricing decision can wait for the month. Real-time everything is expensive vanity; real-time where the decision cadence demands it is operating leverage.

**A named owner for every metric.** A number without an owner is a fact without a consequence.

## The cultural half

There is a reason plant-floor visibility works, and it is only half technical. A dashboard is a truth-telling device. When the scrap number is on the wall, fresh, with a name next to it — the conversation about scrap happens now, between the people who can fix it, instead of next month between the people who can only account for it.

That only functions in a culture where bad news is allowed to travel fast. I hold a principle on this: share good news quickly and bad news quicker, because surprises are the most expensive input in any system. The dashboard is that principle rendered in software. If the number is embarrassing, that is the point. Embarrassment this week is cheaper than variance explanation next month.

The report that arrives after the decision window closes is not information. It is history. Finance can keep producing history — or it can move the numbers to where the decisions are made, while they can still change something. The second one is the job.

---

## Sources

- APQC, [*Cycle Time to Perform the Monthly Close*](https://www.apqc.org/resource-library/resource/cycle-time-perform-monthly-close) — median monthly close of 6.4 calendar days; bottom quartile 10+ days.
- Erik Brynjolfsson, Lorin M. Hitt & Heekyung Hellen Kim, [*Strength in Numbers: How Does Data-Driven Decisionmaking Affect Firm Performance?*](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1819486) (2011) — data-driven firms show 5–6% higher output and productivity across 179 large public firms.
