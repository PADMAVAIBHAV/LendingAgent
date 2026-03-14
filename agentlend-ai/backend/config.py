"""
AgentLend AI — Application Configuration
==========================================
Loads all environment variables and exposes them as typed settings.
"""

from pathlib import Path
from pydantic_settings import (
    BaseSettings,
    PydanticBaseSettingsSource,
    SettingsConfigDict,
)
from functools import lru_cache


ENV_FILE_PATH = Path(__file__).resolve().parent / ".env"


class Settings(BaseSettings):
    """Central configuration loaded from environment / .env file."""

    model_config = SettingsConfigDict(
        env_file=str(ENV_FILE_PATH),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # ── Application ─────────────────────────────────────────────
    APP_NAME: str = "AgentLend AI"
    DEBUG: bool = False

    # ── Database ────────────────────────────────────────────────
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/agentlend"

    # ── AWS Bedrock LLM ────────────────────────────────────────
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "us-east-1"
    AWS_BEDROCK_MODEL_ID: str = "amazon.nova-lite-v1:0"

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

    # ── Cold-start Lending Policy (new wallets) ───────────────
    COLD_START_ENABLED: bool = True
    COLD_START_MAX_LOAN_AMOUNT: float = 10.0
    COLD_START_MAX_WALLET_AGE_DAYS: float = 7.0
    COLD_START_MAX_TX_COUNT: int = 2
    COLD_START_NEUTRAL_REPAYMENT_RATE: float = 0.5
    COLD_START_BASE_CREDIT_SCORE: float = 400.0
    COLD_START_RISK_SCORE: float = 58.0
    COLD_START_INTEREST_RATE: float = 12.0

    @classmethod
    def settings_customise_sources(
        cls,
        settings_cls: type[BaseSettings],
        init_settings: PydanticBaseSettingsSource,
        env_settings: PydanticBaseSettingsSource,
        dotenv_settings: PydanticBaseSettingsSource,
        file_secret_settings: PydanticBaseSettingsSource,
    ) -> tuple[PydanticBaseSettingsSource, ...]:
        return (
            init_settings,
            dotenv_settings,
            env_settings,
            file_secret_settings,
        )


@lru_cache()
def get_settings() -> Settings:
    """Return a cached Settings instance (singleton per process)."""
    return Settings()
