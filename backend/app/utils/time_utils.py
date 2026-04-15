from datetime import datetime, timedelta, timezone
from typing import Union
from zoneinfo import ZoneInfo

IST = ZoneInfo("Asia/Kolkata")

def check_cooldown(last_action: datetime|None, cooldown : timedelta):
    if last_action is None:
        return 0
    now = datetime.now(timezone.utc)
    elapsed = now - last_action
    if elapsed < cooldown:
        remaining = cooldown - elapsed
        return int(remaining.total_seconds())
    return 0


def format_ist(dt: datetime, fmt: str = "%d %b %Y") -> str:
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=ZoneInfo("UTC"))
    
    return dt.astimezone(IST).strftime(fmt)