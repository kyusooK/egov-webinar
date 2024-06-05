package industrialaccident.domain;

import industrialaccident.AssessmentApplication;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "SickLeave_table")
@Data
//<<< DDD / Aggregate Root
public class SickLeave {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long accessmentId;
    private Long accidentId;
    private String businessCode;
    private String employeeId;
    private Float averageSalary;
    private Integer period;
    private String status;
    private Date date;

    @PostPersist
    public void onPostPersist() {}

    public static SickLeaveRepository repository() {
        SickLeaveRepository sickLeaveRepository = AssessmentApplication.applicationContext.getBean(
            SickLeaveRepository.class
        );
        return sickLeaveRepository;
    }

    // @PostLoad
    // public void makeDelay(){
    //     try {
    //         Thread.currentThread().sleep((long) (400 + Math.random() * 220));
    //     } catch (InterruptedException e) {
    //         e.printStackTrace();
    //     }
    // }
   
    public void applySalary(ApplySalaryCommand applySalaryCommand) {
        //implement business logic here:
        AverageSalaryApplied averageSalaryApplied = new AverageSalaryApplied(
            this
        );
        averageSalaryApplied.publishAfterCommit();
    }

    //<<< Clean Arch / Port Method
    public void createSickLeaveBenefit(CreateSickLeaveBenefitCommand createSickLeaveBenefitCommand) {
        //implement business logic here:
        this.setAccessmentId(createSickLeaveBenefitCommand.getAccessmentId());
        this.setAccidentId(createSickLeaveBenefitCommand.getAccidentId());
        this.setBusinessCode(createSickLeaveBenefitCommand.getBusinessCode());
        this.setEmployeeId(createSickLeaveBenefitCommand.getEmployeeId());
        this.setStatus("급여처리생성됨");

        SickLeaveBenefitCreated sickLeaveBenefitCreated = new SickLeaveBenefitCreated(this);
        sickLeaveBenefitCreated.publishAfterCommit();
    }

    //<<< Clean Arch / Port Method
    public void requestSickLeaveBenefit(
        RequestSickLeaveBenefitCommand requestSickLeaveBenefitCommand
    ) {
        //implement business logic here:
        this.setEmployeeId(employeeId);
        this.setBusinessCode(businessCode);
        this.setPeriod(period);
        this.setStatus("휴업급여요청됨");

        SickLeaveBenefitRequested sickLeaveBenefitRequested = new SickLeaveBenefitRequested(this);
        sickLeaveBenefitRequested.publishAfterCommit();
    }
    //>>> Clean Arch / Port Method

}
//>>> DDD / Aggregate Root