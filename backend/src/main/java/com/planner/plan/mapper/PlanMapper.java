package com.planner.plan.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.planner.plan.domain.Plan;

@Mapper
public interface PlanMapper {
	public Plan readDetail(Integer planId);

	public List<Plan> searchPlanList();

	public void createPlan(Plan plan);

	public void updatePlan(Plan plan);

	public void deletePlan(Plan plan);

	public void quickCreatePlan(Plan plan);
	
	public List<Plan> searchQuickPlanList();

	public List<Plan> searchMobilePlanList();


}
