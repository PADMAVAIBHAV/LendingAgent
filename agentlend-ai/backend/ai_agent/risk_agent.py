"""
AgentLend AI — Gemini Risk Agent
=================================
Uses Google Gemini to evaluate borrower risk and return a structured
lending decision (approve/reject + explanation).
"""

from __future__ import annotations

import json
import logging
from typing import Optional

import google.generativeai as genai

from config import get_settings
from database.schemas import RiskEvaluation

logger = logging.getLogger(__name__)
settings = get_settings()

# ── Configure Gemini SDK ─────────────────────────────────────────

genai.configure(api_key=settings.GEMINI_API_KEY)

# Updated supported model
MODEL_NAME = "gemini-1.5-pro-latest"

_MODEL = genai.GenerativeModel(MODEL_NAME)

# ── System prompt ───────────────────────────────────────────────

SYSTEM_PROMPT = """
You are an autonomous AI lending risk analyst for AgentLend AI.

Your job is to evaluate a borrower's on-chain data and decide whether to
approve or reject a loan request.

You MUST return your response as a valid JSON object with exactly these keys:

{
  "risk_score": <float 0-100, lower is safer>,
  "decision": "<APPROVED or REJECTED>",
  "interest_rate": <float, annualized percentage>,
  "reason": "<short summary>",
  "ai_explanation": "<2-4 sentence explanation>"
}

Decision guidelines:
- risk_score <= 40 → likely APPROVED with low interest (3–8%)
- risk_score 41–65 → borderline
- risk_score > 65 → likely REJECTED

Important evaluation factors (priority order):
1. Repayment rate
2. Credit score
3. Wallet age
4. Transaction count
5. Loan amount relative to history
6. Loan duration

Return ONLY the JSON object.
"""


# ── Public API ──────────────────────────────────────────────────

def evaluate_risk(
    wallet_age: float,
    transaction_count: int,
    repayment_rate: float,
    loan_amount: float,
    loan_duration: int,
    credit_score: float,
) -> RiskEvaluation:
    """
    Call Gemini to evaluate borrower risk.
    """

    prompt = f"""
{SYSTEM_PROMPT}

Borrower data:

Wallet age: {wallet_age:.1f} days
Transaction count: {transaction_count}
Repayment rate: {repayment_rate:.2%}
Loan amount: {loan_amount} USDT
Loan duration: {loan_duration} days
Credit score: {credit_score:.1f}

Return the decision as JSON.
"""

    logger.info("Sending risk evaluation request to Gemini (loan=%.2f)", loan_amount)

    try:

        response = _MODEL.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                temperature=0.2,
                max_output_tokens=400,
            ),
        )

        raw_text = response.text.strip()

        logger.debug("Gemini raw response: %s", raw_text)

        # Remove markdown code fences if present
        if raw_text.startswith("```"):
            raw_text = raw_text.split("\n", 1)[-1]
            raw_text = raw_text.rsplit("```", 1)[0]
            raw_text = raw_text.strip()

        result = json.loads(raw_text)

        evaluation = RiskEvaluation(**result)

        logger.info(
            "Gemini decision → %s | risk=%.1f | rate=%.2f%%",
            evaluation.decision,
            evaluation.risk_score,
            evaluation.interest_rate,
        )

        return evaluation

    except json.JSONDecodeError as exc:
        logger.error("Failed to parse Gemini JSON response: %s", exc)

        return RiskEvaluation(
            risk_score=100.0,
            decision="REJECTED",
            interest_rate=0.0,
            reason="AI evaluation failed — invalid JSON from LLM.",
            ai_explanation=f"Parsing error: {exc}",
        )

    except Exception as exc:
        logger.error("Gemini API call failed: %s", exc)

        return RiskEvaluation(
            risk_score=100.0,
            decision="REJECTED",
            interest_rate=0.0,
            reason="AI evaluation failed — Gemini API error.",
            ai_explanation=f"API error: {exc}",
        )