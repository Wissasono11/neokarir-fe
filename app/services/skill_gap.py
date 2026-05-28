import math
from app.config import df_jobs
from app.taxonomy import skill_taxonomy

# --- FUNGSI BARU YANG LEBIH PINTAR ---
def get_skills_list(skills_data):
    # Jika data sudah berbentuk List asli (hasil dari config.py)
    if isinstance(skills_data, list):
        return skills_data
    
    # Jika data masih berupa Teks String (jaga-jaga jika config.py gagal)
    if isinstance(skills_data, str):
        import ast
        try:
            parsed = ast.literal_eval(skills_data)
            if isinstance(parsed, list):
                return [str(s).strip() for s in parsed]
        except Exception:
            pass
        # Bersihkan manual jika ast gagal
        clean_str = skills_data.replace('[', '').replace(']', '').replace("'", "")
        return [s.strip() for s in clean_str.split(',')]
        
    return []

# --- LOGIKA RADAR CHART ---
def calculate_radar_data(target_domain, target_role, user_skills):
    domain_taxonomy = skill_taxonomy.get(target_domain, {})
    jobs_filtered = df_jobs[df_jobs['job_title'].str.contains(target_role, case=False, na=False)]
    total_jobs = len(jobs_filtered)
    
    radar_data = []
    if total_jobs == 0: return radar_data
        
    for category, category_skills in domain_taxonomy.items():
        jobs_requiring_category = 0
        total_skills_demanded_in_category = 0
        
        for _, row in jobs_filtered.iterrows():
            # Menggunakan fungsi baru di baris ini
            job_skills = set(get_skills_list(row['required_skills']))
            intersection = job_skills.intersection(set(category_skills))
            
            if len(intersection) > 0:
                jobs_requiring_category += 1
                total_skills_demanded_in_category += len(intersection)
                
        required_percentage = (jobs_requiring_category / total_jobs) * 100 if total_jobs > 0 else 0
        avg_skills_needed = (total_skills_demanded_in_category / jobs_requiring_category) if jobs_requiring_category > 0 else 1
        avg_skills_needed = max(1, math.ceil(avg_skills_needed))
        
        user_skills_set = set(user_skills)
        user_skills_in_category = len(user_skills_set.intersection(set(category_skills)))
        
        fulfillment_ratio = user_skills_in_category / avg_skills_needed
        current_percentage = min(100, required_percentage * fulfillment_ratio)
        gap = current_percentage - required_percentage
        
        radar_data.append({
            "category": category,
            "current": round(current_percentage),
            "required": round(required_percentage),
            "gap": round(gap)
        })
    return radar_data

def generate_recommended_actions(gap_results):
    critical, improvement, strengths = [], [], []

    for category, gap_value in gap_results.items():
        if gap_value <= -10: critical.append(category)
        elif gap_value < 0: improvement.append(category)
        else: strengths.append(category)

    actions = {"critical_gap": "", "needs_improvement": "", "strengths": ""}

    actions["critical_gap"] = f"Focus on {' & '.join(critical)} skills." if critical else "You have no critical skill gaps."
    actions["needs_improvement"] = f"Enhance {' & '.join(improvement)} expertise." if improvement else "All your core skills are solid."
    actions["strengths"] = f"{' & '.join(strengths)} skills exceed requirements." if strengths else "Keep learning to surpass industry standards."

    return actions