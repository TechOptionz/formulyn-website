# Git workflow

This repo's remote is `https://github.com/TechOptionz/fomulyn-website.git` and its
default branch is `main`. There is no protected-branch rule here and no local hooks,
so nothing mechanically stops a bad commit — confirm before you write.

- Never run `git commit` or `git push` unless the user explicitly asks for it.
- Confirm the target branch with the user before any commit or push. Do not assume
  `main` is correct just because it is checked out.
- Check where you are first: `git branch --show-current` and `git status`.
- Push explicitly by name — `git push origin <branch>` — never a bare `git push`.

Note: the git repository root is this directory
(`C:\Users\f-jaf\Desktop\Code\fomulyn-website`); it is also the folder opened as the
workspace, so repo root and workspace root are the same path.

This project's code was migrated from the `jawad14/Formulyn` repo. That repo's
`Arshman`-branch-only rule and its `pre-commit` / `pre-push` hooks do **not** apply
here and were not carried over.

@AGENTS.md
