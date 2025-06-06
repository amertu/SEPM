package com.spring.restaurant.backend.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;


@Documented
@Constraint(validatedBy = ReservationSameDayValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ReservationSameDayConstraint {


    String message() default "Start date and end date of the reservation must be on the same day.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

