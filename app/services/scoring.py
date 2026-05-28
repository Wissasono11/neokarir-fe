from app.config import df_jobs

def calculate_profile_score(target_domain, target_role, owned_skills):
    jobs = df_jobs.copy()
    max_score = 0
    
    for index, row in jobs.iterrows():
        score = 0.0
        set_user = set(owned_skills)
        set_job = set(row['required_skills'])
        intersection = set_user.intersection(set_job)
        
        if len(set_job) > 0:
            skill_match = (len(intersection) / len(set_job)) * 50
        else:
            skill_match = 0
        score += skill_match
        
        bonus_banyak_skill = min(20, len(set_user) * 2)
        score += bonus_banyak_skill
        
        if target_domain == row['job_domain']: score += 15
        if target_role.lower() in str(row['job_title']).lower(): score += 15
            
        final_score = min(100, max(0, round(score)))
        if final_score > max_score: max_score = final_score
        if max_score == 100: break

    return max_score