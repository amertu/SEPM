package at.ac.tuwien.sepm.groupphase.backend.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ReservationSufficientSeatCapacityAtSelectedTablesValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ReservationSufficientSeatCapacityAtSelectedTablesConstraint {
    String message() default "There are not enough seats at the selected tables for the given number of guests.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
