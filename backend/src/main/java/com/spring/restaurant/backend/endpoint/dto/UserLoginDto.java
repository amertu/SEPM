package com.spring.restaurant.backend.endpoint.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import java.util.Objects;

public class UserLoginDto {

    @NotNull(message = "Email must not be null")
    @Email
    private String email;

    @NotNull(message = "Password must not be null")
    private String password;

    private Boolean blocked;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getBlocked() { return blocked; }

    public void setBlocked(Boolean blocked) { this.blocked = blocked; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserLoginDto)) return false;
        UserLoginDto userLoginDto = (UserLoginDto) o;
        return Objects.equals(email, userLoginDto.email) &&
            Objects.equals(password, userLoginDto.password) &&
            blocked.equals(userLoginDto.blocked);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, password, blocked);
    }

    @Override
    public String toString() {
        return "UserLoginDto{" +
            "email='" + email + '\'' +
            ", password='" + password + '\'' +
            ", blocked='" + blocked + '\'' +
            '}';
    }


    public static final class UserLoginDtoBuilder {
        private String email;
        private String password;
        private Boolean blocked;

        private UserLoginDtoBuilder() {
        }

        public static UserLoginDtoBuilder anUserLoginDto() {
            return new UserLoginDtoBuilder();
        }

        public UserLoginDtoBuilder withEmail(String email) {
            this.email = email;
            return this;
        }

        public UserLoginDtoBuilder withPassword(String password) {
            this.password = password;
            return this;
        }

        public UserLoginDtoBuilder withBlocked(Boolean blocked) {
            this.blocked = blocked;
            return this;
        }

        public UserLoginDto build() {
            UserLoginDto userLoginDto = new UserLoginDto();
            userLoginDto.setEmail(email);
            userLoginDto.setPassword(password);
            userLoginDto.setBlocked(blocked);
            return userLoginDto;
        }
    }
}
