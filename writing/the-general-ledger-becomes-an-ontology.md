---
title: The General Ledger Becomes an Ontology
description: Fabric and Direct Lake moved the data. The next move is meaning — and finance either owns the definitions or inherits numbers it can't defend.
date: 2026-07-01
status: draft
---

# The General Ledger Becomes an Ontology

The general ledger is a recording system. Debits, credits, and balances that prove what happened. It was never designed to explain the business — only to document it. For two hundred years that was enough, because the explaining was done by people.

That is the part that's changing.

## The data moved first

Start with what already happened. For most of my career, reporting meant copies. Extract from the ERP, load into a model, refresh on a schedule, hope the numbers you present Monday still describe the business by Wednesday. I built our first generation of models this way in Power BI. They worked. They also aged the moment they refreshed.

Microsoft Fabric changed the physics. Data lands once, in the lakehouse, in an open format. Direct Lake lets the semantic model read those tables directly — no import, no copy, no refresh window. The report is looking at the same data the operation just wrote. We rebuilt our reporting on this architecture, and the practical difference is simple to state: the question "as of when?" mostly disappeared.

That was the plumbing. The interesting part is what sits on top of it.

## A semantic model is an ontology that doesn't know it yet

A semantic model looks like a BI artifact. Tables, relationships, measures. But look at what it actually encodes: the entities of the business — customer, part, machine, shift, purchase order. The relationships between them, with direction. And measures with governed definitions: when we say *margin*, the model knows exactly what we mean. One definition, written once, enforced everywhere it appears.

That is an ontology. A map of what the business *is*, not just what it recorded. Palantir has been making this argument for a decade — put an object layer over the data and let people act through it. Microsoft is now shipping the same idea to everyone who already owns the stack.

The ERP schema can't play this role. It was built for transaction integrity, not meaning. Ask an AI agent to reason over raw ERP tables and it drowns in cryptic names and implied logic that lives in the heads of whoever configured the system fifteen years ago. There is nothing in the schema to reason *over*.

Point the same agent at a semantic model and everything changes. Objects with names. Relationships with direction. Measures with definitions. The agent doesn't need to guess what margin means — the ontology tells it.

This is the point most commentary misses: the ontology is not a nice-to-have for AI. It is the interface. Natural language questions, agent workflows, automated analysis — all of it lands on the semantic layer, or it doesn't land at all.

## Where this goes

Five claims. I'm building toward all of them.

**The semantic layer becomes the system of meaning; the ERP demotes to a system of record.** The ledger still matters — for audit, for statute, for proof. But the questions stop going to it. They go to the layer that can answer them.

**The close compresses.** When operational data is continuously reconciled against governed definitions, the month-end close stops being an archaeology project. Most of what we call closing is really re-deriving meaning from records. Put the meaning in the layer and the close becomes a checklist, not an excavation.

**The spreadsheet demotes to a consumption surface.** It stays — it's the most successful analytical tool ever built. But it stops being where truth lives. It reads from the ontology; it doesn't define it.

**Control moves up a layer.** Today we certify reports. Tomorrow we certify definitions. A measure definition is a policy: who changed it, when, why, and what approved it. That is an internal-control question, and most companies have no controls there at all yet.

**Finance owns the ontology, or inherits numbers it can't defend.** The layer will get built either way — by IT, by a vendor, by whoever moves first. If finance doesn't own the definitions, finance will spend the next decade explaining variances between what the agents say and what the ledger says. Owning "what is true" has always been the CFO's job. The location of that truth is moving.

## What I'm doing about it

Three things, none of them exotic.

Write every definition once, in the model — never in a report, never in a workbook. If a number matters, its definition is code, and it has an owner.

Treat the semantic model as a product, not a byproduct. It has a roadmap, a change log, and a person accountable for it. Ours is the most-read document in the company; it deserves at least the governance we give a policy manual.

Name things as if the next reader is an agent, because it will be. Clean entity names, explicit relationships, no tribal shorthand. The model that a new analyst can understand is the same model an agent can use.

The ledger will keep the score. The ontology will answer the questions. The CFOs who understand the difference are the ones who will still be setting the definitions ten years from now.
