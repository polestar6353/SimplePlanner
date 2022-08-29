package com.planner.plan.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planner.plan.domain.Plan;
import com.planner.plan.mapper.PlanMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlanService {
	@Autowired
	private final PlanMapper planmapper;
	
	public Plan readDetailPlan(Plan plan){
		return planmapper.readDetail(plan.getPlanId());
	}

	public List<Plan> searchPlanList() {
		List<Plan> resultList = planmapper.searchPlanList();
		return resultList;
	}

	public Boolean createPlan(Plan plan) {
		try {
			planmapper.createPlan(plan);
		}catch(Exception e) {
			return false;
		}
		return true;
	}

	public Boolean updatePlan(Plan plan) {
		try {
			planmapper.updatePlan(plan);
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Boolean deletePlan(Plan plan) {
		try {
			planmapper.deletePlan(plan);
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Boolean dragUpdatePlan(Plan plan) {
		try {
			Plan newPlan = readDetailPlan(plan);
			newPlan.setDate(plan.getDate());
			updatePlan(newPlan);
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Boolean quickCreatePlan(Plan plan) {
		try {
			planmapper.quickCreatePlan(plan);
		}catch(Exception e) {
			return false;
		}
		return true;
	}

	public List<Plan> searchMobilePlanList() {
		List<Plan> resultList = planmapper.searchMobilePlanList();
		return resultList;
	}

	public List<Plan> searchQuickPlanList() {
		List<Plan> resultList = planmapper.searchQuickPlanList();
		return resultList;
	}
}
