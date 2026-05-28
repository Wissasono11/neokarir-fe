from pydantic import BaseModel
from typing import List

class UserProfilePayload(BaseModel):
    target_domain: str
    target_role: str
    owned_skills: List[str]
    user_experience: str
    user_education: str

class ProfileScorePayload(BaseModel):
    target_domain: str
    target_role: str
    owned_skills: List[str]

class SkillGapPayload(BaseModel):
    target_domain: str
    target_role: str
    owned_skills: List[str]