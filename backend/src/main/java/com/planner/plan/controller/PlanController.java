package com.planner.plan.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.planner.plan.domain.Plan;
import com.planner.plan.service.PlanService;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Controller
public class PlanController {

	private final PlanService planservice;

	@GetMapping("/")
	public String rootPage() {
		return "Test";
	}
	
	@GetMapping("/main")
	public String plannerMain() {
		
		return "planner/main";
	}
	
	@GetMapping("/getPlans")
	public ResponseEntity<List<Plan>> getPlans() {
		List<Plan> planList = planservice.searchPlanList();
		return new ResponseEntity<>(planList, HttpStatus.OK);	
	}
	
	@PostMapping("/createPlan")
	public ResponseEntity<Void> createPlan(@RequestBody Plan plan) {
		Boolean createCheck = planservice.createPlan(plan);
		if(!createCheck) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/updatePlan")
	public ResponseEntity<Void> updatePlan(@RequestBody Plan plan) {
		Boolean createCheck = planservice.updatePlan(plan);
		if(!createCheck) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/deletePlan")
	public ResponseEntity<Void> deletePlan(@RequestBody Plan plan) {
		Boolean createCheck = planservice.deletePlan(plan);
		if(!createCheck) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/dragUpdatePlan")
	public ResponseEntity<Void> dragUpdatePlan(@RequestBody Plan plan) {
		Boolean createCheck = planservice.dragUpdatePlan(plan);
		if(!createCheck) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/quickCreatePlan")
	public ResponseEntity<Void> quickCreatePlan(@RequestBody Plan plan) {
		Boolean createCheck = planservice.quickCreatePlan(plan);
		if(!createCheck) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/getQuickPlans")
	public ResponseEntity<List<Plan>> getQuickPlans() {
		List<Plan> planList = planservice.searchQuickPlanList();
		return new ResponseEntity<>(planList, HttpStatus.OK);	
	}
	@GetMapping("/getMobilePlans")
	public ResponseEntity<List<Plan>> getMobilePlans() {
		List<Plan> planList = planservice.searchMobilePlanList();
		return new ResponseEntity<>(planList, HttpStatus.OK);	
	}
	
}
