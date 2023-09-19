package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, String>{
@Query(value = "SELECT new com.boarding.boardinghistory.resource.EmpBoardingHistory*(ebd.exemption_type_txt, ebd.exemption_remarks_txt, ebd.emp_no_int, ebd.first_name_txt, ebd.middle_name_txt, ebd.last_name_txt, ebd.email_id_txt, ebd.emp_or_contractor_ind, ebd.vendor_laptop_desktop_asset_txt, ebd.country_origin_txt, ebd.status_txt, aed.billing_po_no_txt, aed.contractor_id_txt, aed.contract_type_txt, aed.proj_master_cd_txt, aed.amex_email_id_txt, aed.amex_laptop_desktop_asset_id_txt, aed.ads_id_txt, aed.cost_center_txt, aed.contractor_id_creation_date, aed.first_billing_date, aed.clarity_resource_role_txt, aed.platform_id_txt, aed.premium_technology_txt, aed.resource_status_txt, aed.onboard_completion_date, eod.resource_leaving_date, eod.departure_date) FROM emp_boarding_details ebd, amex_emp_details aed, emp_offboarding_details eod WHERE ebd.emp_no_int = aed.emp_no_int AND aed.emp_no_int = eod.emp_no_int AND ebd.emp_no_int = :empNo")
	List<Item> findByitemStatus(char c);

}
