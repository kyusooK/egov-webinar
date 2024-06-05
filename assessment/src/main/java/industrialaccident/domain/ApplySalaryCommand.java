package industrialaccident.domain;

import java.time.LocalDate;
import java.util.*;
import lombok.Data;

@Data
public class ApplySalaryCommand {

    private Long id;
    private Long averageSalary;
}
