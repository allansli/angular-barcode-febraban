#!/usr/bin/env python3
"""
Claude PR Reviewer
==================
Reads a git diff file + changed-files list, calls the Anthropic Messages API,
and prints a structured Markdown code review to stdout.

Usage:
    python3 claude_review.py <diff_file> <changed_files_file>

Environment variables:
    ANTHROPIC_API_KEY   (required) Anthropic API key
    PR_TITLE            PR title
    PR_BODY             PR description
    PR_AUTHOR           GitHub username of the PR author
    BASE_REF            Base branch name (e.g. "main")
    HEAD_REF            Head branch name (e.g. "feature/my-feature")
"""

import json
import os
import sys
import textwrap
import urllib.error
import urllib.request

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
ANTHROPIC_VERSION = "2023-06-01"
MODEL = "claude-opus-4-6"
MAX_OUTPUT_TOKENS = 4096
MAX_DIFF_CHARS = 60_000      # ~15 k tokens; leaves room for prompt + output
REQUEST_TIMEOUT_SEC = 120


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def read_file(path: str, fallback: str = "") -> str:
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as fh:
            return fh.read()
    except FileNotFoundError:
        return fallback


def truncate(text: str, limit: int) -> tuple[str, bool]:
    if len(text) <= limit:
        return text, False
    # Truncate on a newline boundary so the last hunk is not split mid-line
    cut = text[:limit].rfind("\n")
    return text[: cut if cut > 0 else limit], True


def call_anthropic(api_key: str, prompt: str) -> str:
    payload = {
        "model": MODEL,
        "max_tokens": MAX_OUTPUT_TOKENS,
        "messages": [{"role": "user", "content": prompt}],
    }

    req = urllib.request.Request(
        ANTHROPIC_API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "x-api-key": api_key,
            "anthropic-version": ANTHROPIC_VERSION,
            "content-type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT_SEC) as resp:
            result = json.loads(resp.read())
            return result["content"][0]["text"]
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode("utf-8", errors="replace")
        try:
            detail = json.loads(raw).get("error", {}).get("message", raw)
        except json.JSONDecodeError:
            detail = raw
        print(f"Anthropic API error {exc.code}: {detail}", file=sys.stderr)
        sys.exit(1)
    except urllib.error.URLError as exc:
        print(f"Network error reaching Anthropic API: {exc.reason}", file=sys.stderr)
        sys.exit(1)
    except Exception as exc:  # noqa: BLE001
        print(f"Unexpected error: {exc}", file=sys.stderr)
        sys.exit(1)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> None:
    # ── CLI args ─────────────────────────────────────────────────────────────
    if len(sys.argv) < 3:
        print("Usage: claude_review.py <diff_file> <changed_files_file>", file=sys.stderr)
        sys.exit(1)

    diff_file         = sys.argv[1]
    changed_files_file = sys.argv[2]

    # ── API key ───────────────────────────────────────────────────────────────
    api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not api_key:
        # This happens for PRs from forks — secrets are not available.
        print(textwrap.dedent("""\
            > [!NOTE]
            > **Claude review is not available for this pull request.**
            >
            > The `ANTHROPIC_API_KEY` secret is not accessible in this workflow run.
            > This is expected for **pull requests opened from forks** — GitHub does not
            > expose repository secrets to fork workflows for security reasons.
            >
            > A maintainer can trigger a manual review by re-running the workflow
            > after the code has been inspected."""))
        return

    # ── Read inputs ───────────────────────────────────────────────────────────
    raw_diff     = read_file(diff_file)
    changed_files = read_file(changed_files_file, "(unavailable)").strip()

    pr_title  = os.environ.get("PR_TITLE",  "(no title)").strip()
    pr_body   = os.environ.get("PR_BODY",   "").strip() or "(no description provided)"
    pr_author = os.environ.get("PR_AUTHOR", "unknown").strip()
    base_ref  = os.environ.get("BASE_REF",  "main").strip()
    head_ref  = os.environ.get("HEAD_REF",  "").strip()

    # ── Handle empty diff ─────────────────────────────────────────────────────
    if not raw_diff.strip():
        print(textwrap.dedent("""\
            > [!NOTE]
            > **No reviewable code changes detected.**
            >
            > The diff is empty after excluding lock files, minified bundles,
            > and generated dist artefacts. Nothing to review."""))
        return

    # ── Truncate diff ─────────────────────────────────────────────────────────
    diff, was_truncated = truncate(raw_diff, MAX_DIFF_CHARS)
    truncation_note = (
        "\n> [!WARNING]\n"
        f"> Diff was truncated to {MAX_DIFF_CHARS // 1000} k characters.\n"
        "> The review covers only the portion shown.\n"
        if was_truncated else ""
    )

    # ── Build prompt ──────────────────────────────────────────────────────────
    prompt = textwrap.dedent(f"""\
        You are a senior software engineer performing a thorough code review.
        Provide clear, precise, and constructive feedback that helps the author improve the PR.

        ## Pull Request
        - **Title**: {pr_title}
        - **Author**: @{pr_author}
        - **Branch**: `{head_ref}` → `{base_ref}`

        ## Description
        {pr_body}

        ## Files changed
        {changed_files}

        ## Diff
        ```diff
        {diff}
        ```
        {truncation_note}
        ---

        Please structure your review with the following sections (use the exact headings):

        ### Summary
        2–4 sentences describing what this PR does and why.

        ### ✅ What looks good
        Highlight specific things done well — correct logic, clean code, good test coverage, etc.
        Be specific (mention file names / line context).

        ### ⚠️ Issues & concerns
        List any bugs, logic errors, unhandled edge cases, security risks, or breaking changes.
        For each issue:
        - Reference the file and approximate line or hunk.
        - Explain clearly why it is a problem.
        - Suggest a concrete fix.

        If there are no issues, write "No blocking issues found."

        ### 💡 Suggestions
        Non-blocking improvements: naming, readability, performance, missing tests, docs, etc.
        Keep these brief and actionable.

        ### Verdict
        End with exactly one of these lines:
        - **✅ Approve** — ready to merge as-is.
        - **🔄 Request Changes** — one or more blocking issues must be fixed first.
        - **💬 Needs Discussion** — design questions or ambiguities to resolve before proceeding.

        Add a one-sentence reason after the verdict.

        ---
        Be concise. Avoid generic advice. Reference specific lines and files wherever possible.
    """)

    # ── Call Claude ───────────────────────────────────────────────────────────
    review = call_anthropic(api_key, prompt)
    print(review)


if __name__ == "__main__":
    main()
