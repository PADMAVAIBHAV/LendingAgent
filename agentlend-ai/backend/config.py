"""
AgentLend AI — Application Configuration
==========================================
Loads all environment variables and exposes them as typed settings.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Central configuration loaded from environment / .env file."""

    # ── Application ─────────────────────────────────────────────
    APP_NAME: str = "AgentLend AI"
    DEBUG: bool = False

    # ── Database ────────────────────────────────────────────────
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/agentlend"

    # ── Google Gemini LLM ──────────────────────────────────────
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-2.0-flash"

    # ── WDK by Tether ──────────────────────────────────────────
    WDK_API_KEY: str = ""
    WDK_BASE_URL: str = "https://api.wdk.tether.to/v1"

    # ── Blockchain / Ethereum Sepolia ──────────────────────────
    SEPOLIA_RPC_URL: str = "https://rpc.sepolia.org"
    ETHERSCAN_API_KEY: str = ""
    ETHERSCAN_BASE_URL: str = "https://api-sepolia.etherscan.io/api"
    CHAIN_ID: int = 11155111  # Sepolia

    # ── Treasury Wallet ────────────────────────────────────────
    TREASURY_WALLET_ADDRESS: str = ""
    TREASURY_PRIVATE_KEY: str = ""  # Used for Web3.py signing fallback

    # ── ERC-20 Token (USDT-style) ──────────────────────────────
    TOKEN_CONTRACT_ADDRESS: str = ""
    TOKEN_DECIMALS: int = 6  # USDT uses 6 decimals

    # ── Autonomous Agent ───────────────────────────────────────
    AGENT_LOOP_INTERVAL_SECONDS: int = 120  # 2 minutes
    REPAYMENT_MONITOR_INTERVAL_SECONDS: int = 60  # 1 minute

    # ── Loan Defaults ──────────────────────────────────────────
    MAX_LOAN_AMOUNT: float = 1000.0
    MIN_LOAN_AMOUNT: float = 10.0
    DEFAULT_LOAN_DURATION_DAYS: int = 30

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Return a cached Settings instance (singleton per process)."""
    return Settings()
