package com.example.demo.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Item;
import com.example.demo.entity.LoanCards;
import com.example.demo.entity.Transactions;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.TransactionRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	
	@Autowired
	ItemRepository itemRepo;
	
	@Autowired 
	TransactionRepository trxRepo;
	

	@Override
	public List<Item> getAllAvailableItems() {
		// TODO Auto-generated method stub
		
		return itemRepo.findByitemStatus('Y');
	}

	@Override
	public List<LoanCards> getAllAppliedLoans() {
		// TODO Auto-generated method stub
		return null;
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
				ret.put("itemMake",item.getItemMake());
				ret.put("itemDesc", item.getItemMake());
				ret.put("itemValue", item.getItemValue());
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
