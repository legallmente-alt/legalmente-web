# Protocol corrections on convergence PR #59

The Founder authorized execution after the read-only Drive/GitHub audit.
Base: `1e9fb8882e397ebdcb08c5b26b1e50feb70a6173` (PR #59).
Source correction: PR #60, `1544d772414d37829d7bbdf67482d7f59eb445b2`.

Applied the two production-policy file changes from #60 on #59 without merging
either PR or changing main. All other #59 files remain intact.

- General permits one digital topic unless more are explicitly requested.
- Eight primary domains is a preference; the two-per-domain limit remains hard.
- ENTREGADO participates in short memory without becoming approval.
- Explicit specific-domain requests are not blocked by the former digital pause.
- Existing LinkedIn/carousel coherence remains intact.

Validation: 58 tests across all six `test:convergence` suites passed; `npm run
typecheck` passed. No image generation, visual acceptance, build, deploy or merge
is claimed. Psyche's separate memory/delivery/visual patch is not implemented by
this TypeScript commit; it must be applied to its own repository.

The #60 documentation is historical context; this note records only the changes
actually applied here. #60 was not closed or rebased. Revert this commit to roll
back this correction without undoing #59's earlier integration work.
