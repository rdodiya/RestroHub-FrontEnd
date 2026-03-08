# 📌 RestroHub FrontEnd

FrontEnd web application for **RestroHub** — a QR-based restaurant menu and contactless ordering experience.
This project provides the user interface for browsing menus, selecting items, and placing orders — connecting seamlessly with the RestroHub backend.

RestroHub enables restaurants and hotels to offer digital menus and order placement by scanning QR codes placed at tables or rooms. :contentReference[oaicite:0]{index=0}

---

## 🚀 Features

✔ Responsive UI for menu browsing
✔ Category & food listing
✔ View food details
✔ Add to cart & place orders
✔ Connects with RestroHub backend APIs
✔ Clean design with modern frontend stack

---

## 🧱 Tech Stack

This project is built using:

- **React.js** (or your chosen frontend framework – update accordingly)
- **HTML5 & CSS3**
- **JavaScript / JSX**
- **React Router**
- **Axios / Fetch for API calls**
- CSS Framework (Tailwind / Bootstrap / Custom — update accordingly)

---

## 📁 Project Structure

```

RestroHub-FrontEnd/
├─ public/
│ └─ index.html
├─ src/
│ ├─ components/
│ ├─ pages/
│ ├─ services/
│ ├─ assets/
│ ├─ App.jsx
│ └─ index.js
├─ .gitignore
├─ package.json
└─ README.md

````

---

## 🔧 Setup & Installation

### 📌 Clone Repository

```bash
git clone https://github.com/rdodiya/RestroHub-FrontEnd.git
cd RestroHub-FrontEnd
````

### 📌 Install Dependencies

```bash
npm install
npm install formik yup react-hot-toast
```

or with Yarn:

```bash
yarn install
yarn add formik yup react-hot-toast
```

### 📌 Run Locally

```bash
npm run dev
```

or

```bash
yarn start
```

Open your browser at:

```
http://localhost:3000
```

---

## 🌐 Backend Integration

This frontend app connects to the **RestroHub backend** to fetch menus, categories, and handle orders.

Ensure your backend is running and update the API base URL in:

```
src/services/api.js
```

Example:

```js
export const API_BASE_URL = "http://localhost:8080/api";
```

---

## 🧠 Features in UI

### 📋 Menu & Categories

* View all menus
* Filter by category
* Search food items

### 🛒 Cart & Order

* Add / remove items from cart
* View cart summary
* Place orders using backend APIs

> Expand features as needed: Authentication, user profiles, order history, live order tracking.

---

## 📦 Deployment

You can deploy this frontend to:

✔ Vercel
✔ Netlify
✔ GitHub Pages
✔ AWS Amplify
✔ Firebase Hosting

Example (Netlify):

```bash
npm run build
# then deploy the build folder
```

---

## 🧩 Environment Variables

Create a `.env` file in the root:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
# any other keys you need
```

---

## 📸 Screenshots

(Add relevant screenshots or a demo GIF here once available.)

---

## 👍 Contributing

Contributions are welcome! To contribute:

1. Fork this repo
2. Create a branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push: `git push origin feature-name`
5. Submit a Pull Request

---

## 📝 License

Licensed under **MIT License** — see the `LICENSE` file for details.

---

## 📞 Contact

If you have questions or feedback, feel free to reach out:

📧 `rdodiya201@gmail.com`
🌐 [https://github.com/rdodiya](https://github.com/rdodiya)

---

## ⭐ About RestroHub

RestroHub is a QR-based food ordering platform that enables contactless menu browsing and seamless order placement for hotels and restaurants, enhancing guest experiences and driving revenue. ([restrohub.com][1])

```

---

### 🔧 Tips to Enhance README

✅ Add **Screenshots or GIFs**
✅ Include **Live Demo Link** (if hosted)
✅ Add **API documentation section**
✅ Include **Contributing Guidelines & Code of Conduct**

---


---
### Security Code


# Production-Ready Auth Security Fix — Spring Boot + React

## 🔴 The Problem

```
User manually sets localStorage: accessToken = "test"
→ ProtectedRoute only checks: if (accessToken exists) → allow
→ User bypasses auth → accesses admin pages
```

---

## Architecture

```
┌────────────────────────────────────────────────────────┐
│                    REACT FRONTEND                      │
│                                                        │
│  ProtectedRoute                                        │
│       │                                                │
│       ▼                                                │
│  AuthContext (calls /api/auth/verify on mount)         │
│       │                                                │
│       ▼                                                │
│  Axios Interceptor ── attaches "Bearer <token>" ──────┼──┐
│       │                                                │  │
│       ▼                                                │  │
│  If 401 → try /refresh-token → if fail → logout       │  │
└────────────────────────────────────────────────────────┘  │
                                                            │
┌────────────────────────────────────────────────────────┐  │
│              SPRING BOOT BACKEND                       │  │
│                                                        │  │
│  JwtAuthenticationFilter (OncePerRequestFilter)        │◄─┘
│       │                                                │
│       ├─ Extract Bearer token from header              │
│       ├─ jwt.verify(token, SECRET)                     │
│       ├─ Load user from DB                             │
│       ├─ Check user exists & enabled                   │
│       ▼                                                │
│  SecurityFilterChain                                   │
│       │                                                │
│       ├── /api/auth/login         → Public             │
│       ├── /api/auth/register      → Public             │
│       ├── /api/auth/refresh-token → Public             │
│       ├── /api/auth/verify        → Authenticated      │
│       ├── /api/admin/**           → ROLE_ADMIN only    │
│       └── /api/**                 → Authenticated      │
└────────────────────────────────────────────────────────┘
```

---

## BACKEND — Spring Boot Changes

### `pom.xml` — Add Dependencies

```xml
<!-- Add these if not already present -->
<dependencies>
    <!-- Spring Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>

    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.6</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.12.6</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.12.6</version>
        <scope>runtime</scope>
    </dependency>

    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
</dependencies>
```

---

### `application.properties`

```properties
# JWT Configuration
jwt.secret=your-256-bit-secret-key-which-is-at-least-32-characters-long-for-hs256
jwt.access-token-expiration=900000
jwt.refresh-token-expiration=604800000

# CORS
app.cors.allowed-origins=http://localhost:3000

# Server
server.port=8080
```

---

### File 1: `model/User.java`

```java
package com.restrohub.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;

    @Column(name = "refresh_token", length = 1000)
    private String refreshToken;

    @Column(name = "is_enabled")
    private boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ─── UserDetails Implementation ───

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }
}
```

---

### File 2: `model/Role.java`

```java
package com.restrohub.model;

public enum Role {
    USER,
    ADMIN,
    MANAGER
}
```

---

### File 3: `repository/UserRepository.java`

```java
package com.restrohub.repository;

import com.restrohub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.refreshToken = :refreshToken WHERE u.id = :userId")
    void updateRefreshToken(Long userId, String refreshToken);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.refreshToken = null WHERE u.id = :userId")
    void clearRefreshToken(Long userId);
}
```

---

### File 4: `service/JwtService.java`

```java
package com.restrohub.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.access-token-expiration}")
    private long accessTokenExpiration; // 15 minutes = 900000ms

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration; // 7 days = 604800000ms

    // ─── Extract Claims ───

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractTokenType(String token) {
        return extractClaim(token, claims -> claims.get("type", String.class));
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // ─── Generate Tokens ───

    public String generateAccessToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "access");
        claims.put("role", userDetails.getAuthorities().toString());
        return buildToken(claims, userDetails.getUsername(), accessTokenExpiration);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "refresh");
        return buildToken(claims, userDetails.getUsername(), refreshTokenExpiration);
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            String subject,
            long expiration
    ) {
        return Jwts.builder()
                .claims(extraClaims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }

    // ─── Validation ───

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Parse token without throwing on expiry — used by filter to
     * differentiate "expired" vs "malformed/fake"
     */
    public TokenValidationResult validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return TokenValidationResult.VALID;
        } catch (ExpiredJwtException e) {
            return TokenValidationResult.EXPIRED;
        } catch (JwtException | IllegalArgumentException e) {
            return TokenValidationResult.INVALID;
        }
    }

    public enum TokenValidationResult {
        VALID,
        EXPIRED,
        INVALID
    }

    // ─── Key ───

    private SecretKey getSigningKey() {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
```

---

### File 5: `config/JwtAuthenticationFilter.java`

```java
package com.restrohub.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.restrohub.service.JwtService;
import com.restrohub.service.JwtService.TokenValidationResult;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Extract Authorization header
        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);

        // 2. Validate token structure & signature
        TokenValidationResult validationResult = jwtService.validateToken(jwt);

        if (validationResult == TokenValidationResult.INVALID) {
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                    "Invalid or malformed token", false);
            return;
        }

        if (validationResult == TokenValidationResult.EXPIRED) {
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                    "Token has expired", true);
            return;
        }

        // 3. Token is valid — extract user
        final String userEmail = jwtService.extractUsername(jwt);

        if (userEmail != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails;
            try {
                userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            } catch (Exception e) {
                sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                        "User not found or deactivated", false);
                return;
            }

            // 4. Final validation: token matches user + user is enabled
            if (jwtService.isTokenValid(jwt, userDetails) && userDetails.isEnabled()) {

                // Check it's an access token, not a refresh token
                String tokenType = jwtService.extractTokenType(jwt);
                if (!"access".equals(tokenType)) {
                    sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                            "Invalid token type", false);
                    return;
                }

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities()
                        );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }

    private void sendErrorResponse(
            HttpServletResponse response,
            int status,
            String message,
            boolean expired
    ) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");

        Map<String, Object> body = new HashMap<>();
        body.put("success", false);
        body.put("message", message);
        body.put("expired", expired);

        objectMapper.writeValue(response.getOutputStream(), body);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/api/auth/login")
                || path.startsWith("/api/auth/register")
                || path.startsWith("/api/auth/refresh-token")
                || path.startsWith("/api/menu/public");
    }
}
```

---

### File 6: `config/SecurityConfig.java`

```java
package com.restrohub.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        // ── Public endpoints ──
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers("/api/auth/register").permitAll()
                        .requestMatchers("/api/auth/refresh-token").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/menu/public/**").permitAll()

                        // ── Admin only endpoints ──
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/menu/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/menu/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/menu/**").hasRole("ADMIN")

                        // ── Manager + Admin endpoints ──
                        .requestMatchers("/api/orders/manage/**")
                        .hasAnyRole("ADMIN", "MANAGER")

                        // ── All other endpoints require authentication ──
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(allowedOrigins.split(",")));
        configuration.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
        ));
        configuration.setAllowedHeaders(List.of(
                "Authorization", "Content-Type", "X-Requested-With"
        ));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider =
                new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
```

---

### File 7: `service/CustomUserDetailsService.java`

```java
package com.restrohub.service;

import com.restrohub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found with email: " + email
                        )
                );
    }
}
```

---

### File 8: `dto/AuthDTOs.java` (Request/Response DTOs)

```java
package com.restrohub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class AuthDTOs {

    // ─── Login Request ───
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;
    }

    // ─── Register Request ───
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegisterRequest {

        @NotBlank(message = "Name is required")
        private String name;

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters")
        private String password;
    }

    // ─── Auth Response ───
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AuthResponse {
        private boolean success;
        private String message;
        private String accessToken;
        private String refreshToken;
        private UserDTO user;
    }

    // ─── Token Refresh Request ───
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RefreshTokenRequest {

        @NotBlank(message = "Refresh token is required")
        private String refreshToken;
    }

    // ─── Token Refresh Response ───
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TokenResponse {
        private boolean success;
        private String accessToken;
        private String refreshToken;
    }

    // ─── User DTO (safe to send to frontend) ───
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserDTO {
        private Long id;
        private String name;
        private String email;
        private String role;
    }

    // ─── Generic API Response ───
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ApiResponse {
        private boolean success;
        private String message;
        private Object data;
    }
}
```

---

### File 9: `service/AuthService.java`

```java
package com.restrohub.service;

import com.restrohub.dto.AuthDTOs.*;
import com.restrohub.model.Role;
import com.restrohub.model.User;
import com.restrohub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    // ─── Login ───
    @Transactional
    public AuthResponse login(LoginRequest request) {
        try {
            // 1. Authenticate with Spring Security
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid email or password");
        }

        // 2. Load user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isActive()) {
            throw new RuntimeException("Account is deactivated");
        }

        // 3. Generate tokens
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        // 4. Store refresh token in DB
        userRepository.updateRefreshToken(user.getId(), refreshToken);

        // 5. Build response
        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();

        return AuthResponse.builder()
                .success(true)
                .message("Login successful")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(userDTO)
                .build();
    }

    // ─── Register ───
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // 1. Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // 2. Create user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .isActive(true)
                .build();

        user = userRepository.save(user);

        // 3. Generate tokens
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        userRepository.updateRefreshToken(user.getId(), refreshToken);

        // 4. Build response
        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();

        return AuthResponse.builder()
                .success(true)
                .message("Registration successful")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(userDTO)
                .build();
    }

    // ─── Refresh Token ───
    @Transactional
    public TokenResponse refreshToken(RefreshTokenRequest request) {
        String incomingRefreshToken = request.getRefreshToken();

        // 1. Validate refresh token
        JwtService.TokenValidationResult result =
                jwtService.validateToken(incomingRefreshToken);

        if (result != JwtService.TokenValidationResult.VALID) {
            throw new RuntimeException("Invalid or expired refresh token");
        }

        // 2. Check token type
        String tokenType = jwtService.extractTokenType(incomingRefreshToken);
        if (!"refresh".equals(tokenType)) {
            throw new RuntimeException("Invalid token type");
        }

        // 3. Extract user
        String email = jwtService.extractUsername(incomingRefreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 4. Verify stored refresh token matches (prevent reuse)
        if (user.getRefreshToken() == null ||
                !user.getRefreshToken().equals(incomingRefreshToken)) {
            // Token reuse detected! Clear all tokens
            userRepository.clearRefreshToken(user.getId());
            log.warn("Refresh token reuse detected for user: {}", email);
            throw new RuntimeException(
                    "Refresh token has been revoked. Please login again."
            );
        }

        // 5. Generate new token pair (rotation)
        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);

        // 6. Update stored refresh token
        userRepository.updateRefreshToken(user.getId(), newRefreshToken);

        return TokenResponse.builder()
                .success(true)
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    // ─── Verify Token (returns user info) ───
    public UserDTO verifyToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    // ─── Logout ───
    @Transactional
    public void logout(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.clearRefreshToken(user.getId());
    }
}
```

---

### File 10: `controller/AuthController.java`

```java
package com.restrohub.controller;

import com.restrohub.dto.AuthDTOs.*;
import com.restrohub.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // ─── POST /api/auth/login (Public) ───
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(AuthResponse.builder()
                            .success(false)
                            .message(e.getMessage())
                            .build());
        }
    }

    // ─── POST /api/auth/register (Public) ───
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(AuthResponse.builder()
                            .success(false)
                            .message(e.getMessage())
                            .build());
        }
    }

    // ─── GET /api/auth/verify (Protected — requires valid JWT) ───
    @GetMapping("/verify")
    public ResponseEntity<ApiResponse> verifyToken(Authentication authentication) {
        // If this method executes, the JwtAuthenticationFilter already
        // validated the token — so it's guaranteed to be legitimate
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserDTO user = authService.verifyToken(userDetails.getUsername());

        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Token is valid")
                .data(user)
                .build());
    }

    // ─── POST /api/auth/refresh-token (Public) ───
    @PostMapping("/refresh-token")
    public ResponseEntity<TokenResponse> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request
    ) {
        try {
            TokenResponse response = authService.refreshToken(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(TokenResponse.builder()
                            .success(false)
                            .build());
        }
    }

    // ─── POST /api/auth/logout (Protected) ───
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        authService.logout(userDetails.getUsername());

        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Logged out successfully")
                .build());
    }
}
```

---

### File 11: `exception/GlobalExceptionHandler.java`

```java
package com.restrohub.exception;

import com.restrohub.dto.AuthDTOs.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse> handleBadCredentials(
            BadCredentialsException ex
    ) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse.builder()
                        .success(false)
                        .message("Invalid email or password")
                        .build());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse> handleAccessDenied(
            AccessDeniedException ex
    ) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ApiResponse.builder()
                        .success(false)
                        .message("You do not have permission to access this resource")
                        .build());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidationErrors(
            MethodArgumentNotValidException ex
    ) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String field = ((FieldError) error).getField();
            String msg = error.getDefaultMessage();
            errors.put(field, msg);
        });

        return ResponseEntity.badRequest()
                .body(ApiResponse.builder()
                        .success(false)
                        .message("Validation failed")
                        .data(errors)
                        .build());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse> handleRuntime(RuntimeException ex) {
        return ResponseEntity.badRequest()
                .body(ApiResponse.builder()
                        .success(false)
                        .message(ex.getMessage())
                        .build());
    }
}
```

---

## FRONTEND — React Changes

### File 1: `src/utils/api.js`

```javascript
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Prevent multiple simultaneous refresh calls ───
let isRefreshing = false;
let failedRequestsQueue = [];

const processQueue = (error, token = null) => {
  failedRequestsQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedRequestsQueue = [];
};

// ─── Request Interceptor: Attach Access Token ───
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor: Handle 401 + Auto Refresh ───
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Token is EXPIRED → attempt refresh
      if (error.response?.data?.expired === true) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh-token`,
            { refreshToken },
            { withCredentials: true }
          );

          const {
            accessToken: newAccess,
            refreshToken: newRefresh,
          } = response.data;

          localStorage.setItem("accessToken", newAccess);
          localStorage.setItem("refreshToken", newRefresh);

          processQueue(null, newAccess);

          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Token is FAKE/MALFORMED → immediate logout
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
```

---

### File 2: `src/context/AuthContext.jsx`

```jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ─── Verify token with Spring Boot backend on every app load ───
  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return false;
    }

    try {
      // Calls GET /api/auth/verify
      // JwtAuthenticationFilter validates the token server-side
      // If token is fake like "test", the filter rejects with 401
      const response = await api.get("/auth/verify");

      if (response.data.success) {
        setUser(response.data.data); // UserDTO from backend
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }

    return false;
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  // ─── Login ───
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken, refreshToken, user: userData } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, user: userData };
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      return { success: false, message };
    }
  };

  // ─── Logout ───
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    verifyToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
```

---

### File 3: `src/components/ProtectedRoute.jsx` ✅ (FIXED)

```jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // ─── Loading: backend is verifying the token ───
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verifying...</span>
        </div>
      </div>
    );
  }

  // ─── Not authenticated → login ───
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ─── Role check ───
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

---

### File 4: `src/pages/Login.jsx`

```jsx
import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Already logged in → redirect
  if (isAuthenticated && user) {
    const redirectTo = user.role === "ADMIN" ? "/admin" : "/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      const from = location.state?.from?.pathname;
      const redirectTo =
        from || (result.user.role === "ADMIN" ? "/admin" : "/dashboard");
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Login</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            autoComplete="email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
```

---

### File 5: `src/App.jsx`

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
// ... your other imports

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected: Any authenticated user */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected: ADMIN only */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected: ADMIN + MANAGER */}
          <Route
            path="/manage/*"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
```

---

### File 6: `src/pages/Unauthorized.jsx`

```jsx
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1 className="display-1 text-danger">403</h1>
      <h2>Access Denied</h2>
      <p className="text-muted">
        You do not have permission to access this page.
      </p>
      <button className="btn btn-primary me-2" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default Unauthorized;
```

---

### Frontend `.env`

```env
REACT_APP_API_URL=http://localhost:8080/api
```

---

## Security Before vs After

```
┌────────────────────────────┬──────────────────────┬──────────────────────────────┐
│        Attack              │    BEFORE (❌)        │       AFTER (✅)              │
├────────────────────────────┼──────────────────────┼──────────────────────────────┤
│ localStorage:              │ ✅ Bypass works       │ ❌ GET /api/auth/verify →     │
│ accessToken = "test"       │  (checks key only)   │    JwtFilter rejects 401     │
├────────────────────────────┼──────────────────────┼──────────────────────────────┤
│ Expired JWT                │ ✅ Still works        │ ❌ Auto-refresh or logout     │
├────────────────────────────┼──────────────────────┼──────────────────────────────┤
│ USER accesses /admin       │ ✅ No role check      │ ❌ hasRole("ADMIN") blocks    │
│                            │                      │    (403 backend + frontend)  │
├────────────────────────────┼──────────────────────┼──────────────────────────────┤
│ Deleted user's token       │ ✅ No DB check        │ ❌ loadUserByUsername fails   │
├────────────────────────────┼──────────────────────┼──────────────────────────────┤
│ Refresh token reuse        │ ✅ No detection       │ ❌ Token rotation detects     │
│ (stolen token)             │                      │    & revokes all tokens       │
├────────────────────────────┼──────────────────────┼──────────────────────────────┤
│ Using refresh token        │ ✅ No type check      │ ❌ tokenType != "access"      │
│ as access token            │                      │    → rejected by filter       │
├────────────────────────────┼──────────────────────┼──────────────────────────────┤
│ API calls without auth     │ ❓ Depends            │ ❌ SecurityFilterChain        │
│                            │                      │    blocks all non-public      │
└────────────────────────────┴──────────────────────┴──────────────────────────────┘
```

---

## Complete Request Flow

```
User opens /admin
    │
    ▼
ProtectedRoute renders → loading = true
    │
    ▼
AuthContext.verifyToken() → GET /api/auth/verify
    │                        with header: Authorization: Bearer <token>
    ▼
Spring Boot JwtAuthenticationFilter
    │
    ├── Token is "test" → INVALID → 401 { expired: false }
    │                                  → Frontend: immediate logout
    │
    ├── Token is expired JWT → EXPIRED → 401 { expired: true }
    │                                     → Frontend: try refresh
    │                                        → if refresh OK → retry
    │                                        → if refresh fail → logout
    │
    ├── Token is valid JWT → extract email → load user from DB
    │       │
    │       ├── User not found → 401
    │       ├── User disabled  → 401
    │       └── User valid     → set SecurityContext → continue
    │                                │
    │                                ▼
    │                          AuthController.verifyToken()
    │                                │
    │                                ▼
    │                          Returns { success: true, user: {...} }
    │                                │
    │                                ▼
    │                    Frontend: setUser(user), isAuthenticated = true
    │                                │
    │                                ▼
    │                    ProtectedRoute: loading=false, check role
    │                         ├── role matches → render <AdminDashboard>
    │                         └── role mismatch → <Navigate to="/unauthorized">
    └──────────────────────────────────────────────────────────────────────
```

> **Key principle**: The frontend `ProtectedRoute` is **only for UX** (showing a loading spinner, redirecting). The **real security** is the Spring Boot `JwtAuthenticationFilter` + `SecurityFilterChain` — every API call is validated server-side.
---