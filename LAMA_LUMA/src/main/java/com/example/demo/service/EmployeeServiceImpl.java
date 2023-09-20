package com.example.demo.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Item;
import com.example.demo.entity.LoanCards;
import com.example.demo.entity.Transactions;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.LoanCardRepository;
import com.example.demo.repository.TransactionRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	
	@Autowired
	ItemRepository itemRepo;
	
	@Autowired 
	TransactionRepository trxRepo;
	
	@Autowired
	LoanCardRepository lcRepo;
	

	@Override
	public List<Item> getAllAvailableItems() {
		
		return itemRepo.findByissueStatus(true);
	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public Set<LoanCards> getAllAppliedLoans(String employeeId) {
		// TODO Auto-generated method stub
		List<Transactions> temp= trxRepo.findByemployeeId(employeeId);
		Set<LoanCards> lc = new HashSet<LoanCards>();
		for(Transactions i : temp) {
			Item item=itemRepo.getById(i.getItemId());
			lc.add(lcRepo.findByloanType(item.getCategory()));
		}
		
		return lc;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<Map<String, Object>> getAllAppliedItems(String employeeId) {
		List<Transactions> temp= trxRepo.findByemployeeId(employeeId);
		@SuppressWarnings("rawtypes")
		ArrayList list=new ArrayList();
		if (temp!=null) {
			
			for(Transactions i: temp) {
				Map<String,Object> ret=new HashMap<>();
				Item item = itemRepo.getOne(i.getItemId());
				ret.put("itemId",item.getItemId());
				ret.put("make",item.getMake());
				ret.put("name", item.getName());
				ret.put("category", item.getCategory());
				ret.put("value", item.getValue());
				ret.put("issueDate", i.getIssueDate());
				list.add(ret);
			}
		}
			return list;
		
	}

	@Override
	public ResponseEntity<String> applyForLoan(String employeeId, String ItemId) {
		Optional<Item> item=itemRepo.findById(ItemId);
		if(item.isPresent()) {
			Transactions newTrx= new Transactions();
			newTrx.setEmployeeId(employeeId);
			newTrx.setIssueDate(new Date());
			newTrx.setItemId(ItemId);
			newTrx.setLoanId(itemRepo.getReferenceById(ItemId).getLoanId());
			newTrx.setTransactionId(UUID.randomUUID().toString().substring(10,16));
			trxRepo.save(newTrx);
			return new ResponseEntity<>("Loan Trx Successfull",HttpStatus.OK);
			}
		return new ResponseEntity<>("Cant process loan, item unavailable",HttpStatus.BAD_REQUEST);
		
	}

	

}
