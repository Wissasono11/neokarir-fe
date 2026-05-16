from app.config import df_jobs

def calculate_match_score(user_skills, job_skills):
    set_user = set(user_skills)
    set_job = set(job_skills)
    intersection = set_user.intersection(set_job)
    if len(set_job) == 0: return 0
    return len(intersection) / len(set_job)

def get_full_recommendation(payload, top_n=10):
    jobs = df_jobs.copy()
    final_scores = []
    
    for index, row in jobs.iterrows():
        score = 0.0
        skill_match = calculate_match_score(payload.owned_skills, row['required_skills']) * 100
        score += skill_match
        
        if payload.target_domain != row['job_domain']: score = score * 0.2 
        if payload.target_role.lower() in str(row['job_title']).lower(): score += 15
            
        if payload.user_experience == "Belum ada (Fresh Graduate / Sedang belajar)":
            if "Tahun" in str(row['min_experience']): score -= 10
                
        if payload.user_education == "SMA / SMK" and "S1" in str(row['min_education']):
            score -= 5
            
        final_score = min(100, max(0, round(score)))
        final_scores.append(final_score)

    jobs['final_match_score'] = final_scores
    jobs_sorted = jobs.sort_values(by='final_match_score', ascending=False)
    top_jobs = jobs_sorted.head(top_n).copy()
    
    if not top_jobs.empty:
        max_score = top_jobs['final_match_score'].max()
        if 0 < max_score < 95:
            scale_factor = 95.0 / max_score
            top_jobs['final_match_score'] = top_jobs['final_match_score'] * scale_factor
            top_jobs['final_match_score'] = top_jobs['final_match_score'].clip(upper=98.0).round().astype(int)
    
    hasil_rekomendasi = []
    for _, row in top_jobs.iterrows(): 
        hasil_rekomendasi.append({
            "job_id": row['job_id'],
            "job_title": row['job_title'],
            "company": row['company'],
            "job_domain": row['job_domain'],
            "match_score": row['final_match_score'],
            "required_skills": row['required_skills']
        })
        
    return {
        "status": "success",
        "total_jobs_analyzed": len(jobs),
        "recommendations": hasil_rekomendasi
    }