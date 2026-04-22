_) 3.1. Capstone Project name:
English: GlowScan — AI-Powered Beauty-Tech E-Commerce Platform for Facial Skin Analysis and Personalized Skincare
Vietnamese: GlowScan — Nền tảng thương mại điện tử Beauty-Tech tích hợp AI phân tích da mặt và tư vấn skincare cá nhân hóa
Abbreviation: GlowScan
Context:
The beauty and skincare market is experiencing rapid growth, particularly among young women aged 18–35 who are increasingly conscious about skin health. However, many individuals face significant barriers: the high cost of regular dermatology visits, the overwhelming volume of unverified product information online, and the lack of reliable personalized advice. Those living in smaller cities or with busy lifestyles are especially underserved, lacking both time and access to professional skincare guidance.
Existing market players such as Hasaki+ and other beauty e-commerce platforms have demonstrated the viability of combining product sales with beauty consultation services. However, most platforms remain fragmented — e-commerce sites push products without personalized skin assessment, while standalone analysis apps lack purchasing workflows and expert consultation. There is no unified platform that combines AI-driven facial skin analysis, e-commerce product sales (both online and in-store), tiered consultation services, and treatment progress tracking in a single ecosystem.
GlowScan addresses this gap as a Beauty-Tech e-commerce platform with the core concept: “A smart mirror in your phone — scan your face, know the problem, know what to buy, and connect with experts who can help.” The platform leverages AI-powered facial skin analysis as the entry point to drive informed product purchases and professional consultations. The core business model centers on selling skincare products through both an online store (with 3rd-party delivery integration) and partner physical stores equipped with professional skin measurement devices.
The platform serves users through a two-tier consultation model: Staff members provide general skincare advice and product recommendations based on the user’s scan results and product usage history, while certified beauty experts handle specialized, in-depth consultations for complex skin concerns. This structure, combined with multi-version photo tracking (before, during, and after treatment), enables a comprehensive and transparent skincare journey.
The primary challenge this project addresses is the absence of a holistic, AI-driven skincare e-commerce platform that seamlessly integrates facial skin analysis, product discovery and purchase, inventory management, tiered expert consultation, and treatment progress monitoring — all within a responsive, mobile-friendly web experience.
Proposed Solution:
Core Modules:
Face Scan AI (Facial Skin Only) — Users capture or upload a facial photo. AI models analyze skin conditions and output defined aesthetic parameters: acne severity, wrinkle depth, dark spots, pore size, estimated oiliness index, estimated hydration level, and skin type classification. The system includes a clear disclaimer that photo-based analysis provides estimates; parameters such as oiliness and hydration cannot be fully measured via camera and require in-store professional devices for precise readings. The data model is designed to accommodate device-measured parameters for future integration.
Product E-Commerce — Full-featured online store with product catalog, ingredient database, search/filter, shopping cart, checkout, and payment processing. Supports both online ordering with 3rd-party delivery (GHN, GHTK, etc.) and in-store purchase/pickup at GlowScan partner locations. Product recommendations are personalized based on AI scan results and user profile data (skin type, concerns, budget, allergies).
Two-Tier Consultation (Staff + Expert) — Staff provides general consultation: basic skincare advice, product guidance, and routine recommendations using the customer’s scan history and product usage history. For deeper or specialized concerns (dermatology-level advice, treatment planning), staff escalates to certified beauty experts. Expert consultations have a defined fee structure. Both tiers record consultation notes linked to the user profile.
Inventory & Delivery Management — Backend inventory tracking across warehouses and partner stores with low-stock alerts and restock workflows. Integration with 3rd-party delivery services for automated shipping label generation, real-time tracking, and delivery status sync.
Partner Store Locator — Map-based search for GlowScan partner physical stores where professional skin measurement devices are available. Users can view store details, available services, and book in-store consultations. Replaces the generic Clinic/Spa Finder with a focused partner network.
Exercise & Routine (Optional, AI-Driven) — Lower-priority module. If included, the AI automatically selects appropriate face yoga exercises and skincare routines based on scan results. Users do not manually browse a library; the system curates content relevant to their diagnosed conditions.
Target Users:
Women aged 18–35 interested in skincare and beauty
Individuals who cannot afford frequent spa or dermatology visits but need reliable, personalized skincare advice
People in smaller cities or with busy lifestyles seeking convenient online purchasing and consultation
Pricing & Revenue Model:
Product sales: Primary revenue from skincare product sales (online + in-store)
Free basic scan: Photo-based AI skin analysis available to all registered users at no cost to drive engagement and product discovery
In-store measurement fee: Professional device-based skin analysis at partner stores charged as a service fee (pricing set by store/admin)
Staff consultation: General consultation included with product purchase or available at a nominal fee
Expert consultation fee: Specialized consultations charged per session; fee set by the expert with platform commission
System Features:
AI Facial Skin Analysis: Deep learning models (CNN-based: EfficientNet, ResNet, or custom architectures) detecting and classifying facial skin conditions with defined aesthetic parameter outputs
E-Commerce Engine: Product catalog management, cart, checkout, payment gateway integration, order lifecycle management
Inventory Management: Real-time stock tracking, multi-location support, automated low-stock alerts
3rd-Party Delivery Integration: API integration with logistics partners for shipping, tracking, and status synchronization
Multi-Version Photo Tracking: Structured treatment timeline with before/during/after photos; side-by-side comparison with AI parameter diff visualization
Product Usage History: Users log products in use, track duration and perceived effectiveness; data shared with staff/experts for informed consultation
Two-Tier Consultation Workflow: Staff general advice with escalation path to certified experts; consultation notes and treatment plans linked to user profile
Notification Services: Email and push notifications for order updates, delivery status, routine reminders, consultation bookings, and new recommendations
Scalability: Cloud-based microservices architecture supporting growing user base, product catalog, and partner store network
Security & Privacy: Encrypted user data, secure photo storage, payment data compliance (PCI-DSS), and data protection standards
System Architecture:
Frontend: ReactJS responsive web application optimized for desktop and mobile browsers
Backend: NestJS (Node.js) for core API, e-commerce, and business logic; Python (FastAPI) for AI model serving
Database: PostgreSQL for relational data (users, orders, products, consultations); Redis for caching and sessions; Object Storage (S3/MinIO) for photos and product images
AI/ML: CNN-based facial skin analysis models with defined aesthetic parameter outputs; recommendation engine; deployed via containerized microservices
Infrastructure: Docker/Kubernetes deployment on cloud VPS with CI/CD pipelines
Functional Requirements:
Authentication: Social login, email/password, role-based access control (Admin, Staff, User, Expert)
Skin Analysis: Photo capture/upload, AI processing, aesthetic parameter output with visual annotations, disclaimer for photo limitations
E-Commerce: Product catalog CRUD, cart management, checkout, payment processing, order tracking
Inventory: Stock management, multi-location tracking, low-stock alerts, restock workflows
Delivery: 3rd-party logistics API integration, shipping label generation, real-time tracking
Consultation: Staff general advice workflow, expert escalation, fee management, consultation notes
Progress Tracking: Multi-version photo capture (before/during/after), parameter comparison, timeline view
Product Usage Logging: User-maintained product diary, effectiveness tracking, data accessible to consultants
Reporting & Analytics: Dashboard with sales, engagement, and consultation metrics; exportable reports (CSV, Excel, PDF)
(_) 3.2. Main proposal content (including result and product)
a) Theory and practice (document):
AI/ML Components: CNN-based facial skin analysis models (e.g., EfficientNet, ResNet, ArcFace for face detection), image preprocessing pipelines, recommendation engine for product suggestions
Documents to be delivered:
User Requirement Document (URD)
Software Requirements Specification (SRS)
Architecture Design Document
Detailed Design Document
System Implementation Report
Testing Document (Unit, Integration, System, Acceptance)
Installation & Deployment Guide
Source Code (Backend, Frontend Web)
Deployable software packages (Docker containers, web build)
Server-side technologies: NestJS (core API, e-commerce, order management), Python/FastAPI (AI model serving), PostgreSQL, Redis, Object Storage (S3/MinIO)
Client-side technologies: ReactJS (responsive web application, mobile-optimized)
b) System architecture and deployment:
The GlowScan platform follows a microservices architecture:
Frontend Service: ReactJS responsive SPA served via Nginx
API Gateway: NestJS handling authentication, routing, e-commerce, and business logic
AI Service: Python (FastAPI) hosting trained facial skin analysis models
E-Commerce Service: Product catalog, cart, checkout, order management, payment integration
Inventory Service: Stock tracking, multi-location management, low-stock alerting
Delivery Integration Service: 3rd-party logistics API connectors (GHN, GHTK, etc.)
Database Layer: PostgreSQL + Redis + Object Storage
Data transmitted securely via HTTPS; user photos processed and stored with encryption
Scope clarifications:
In scope: Photo-based AI facial skin analysis with estimated aesthetic parameters; full e-commerce flow; staff and expert consultation workflows; multi-version photo tracking; inventory and delivery management
Out of scope (future extension): Integration with professional in-store skin measurement devices (hardware API). However, the data model is designed to store device-measured parameters so that integration can be added without schema changes
Optional/lower priority: Exercise & Routine module (face yoga, skincare routines) — if time permits, with AI-driven selection
Expected deliverables:
Fully functional GlowScan responsive web platform with AI facial skin analysis and e-commerce
Cloud backend system deployed on VPS or cloud provider
Web admin panel with inventory, order, and consultation management (ReactJS + NestJS)
Responsive user-facing web application with e-commerce and AI scan (ReactJS)
Staff and expert portal interfaces
Trained AI facial skin analysis model with defined aesthetic parameter outputs and API documentation
Complete documentation package (as listed above)
Source code repositories (Backend, Frontend) with CI/CD pipelines
c) Program:

1
Web Application for Admin
1.1
Login / Logout
1.2
Manage user accounts (admins, staff, beauty experts, end-users) with role-based access control
1.3
View and edit personal/system information
1.4
Manage AI skin analysis models and configurations (parameter definitions, model versions)
1.5
Manage product catalog (skincare products, ingredients, pricing, images, stock levels)
1.6
Inventory management: track stock across warehouses/stores, low-stock alerts, restock workflows
1.7
Manage orders: view/filter/update order status, handle cancellations and refunds
1.8
3rd-party delivery integration: manage shipping partners (GHN, GHTK, etc.), track shipments
1.9
Manage GlowScan partner store listings (locations with professional measurement devices)
1.10
Manage instructor/expert profiles, verification status, and commission settings
1.11
Monitor user activity, scan history, product usage history, and engagement metrics
1.12
Generate reports (sales revenue, product performance, skin concern trends, consultation stats) and export data (CSV, Excel, PDF)
1.13
Dashboard: real-time overview of key business metrics (orders, revenue, active users, popular products)
2
Web/Mobile Application for Staff (General Consultation)
2.1
Login / Logout
2.2
View assigned customers and their skin analysis history
2.3
Access customer product usage history to provide informed general consultation
2.4
Provide basic skincare advice, product recommendations, and routine guidance
2.5
Escalate/connect customer to a specialist expert when deeper consultation is needed
2.6
Record consultation notes and follow-up actions
2.7
In-store mode: input device-measured skin parameters (oiliness, hydration, etc.) into user profile
3
Web Application (Responsive/Mobile) for End-Users
3.1
Register / Login / Logout (email, social login)
3.2
Face Scan AI: capture or upload facial photo for AI-powered skin analysis (scope: facial skin only)
3.3
View detailed skin analysis results with aesthetic parameters: acne severity, wrinkles, dark spots, pore size, estimated oiliness, estimated hydration, skin type classification
3.4
Acknowledge scan limitations: disclaimer that photo-based analysis provides estimates; full precision requires in-store device measurement
3.5
Multi-version photo capture: take photos at before, during, and after treatment stages for progress tracking
3.6
Side-by-side comparison view with AI-measured parameter differences across treatment timeline
3.7
Product Suggestion AI: receive personalized skincare product recommendations based on scan results and profile
3.8
E-commerce: browse product catalog, add to cart, checkout, choose delivery or in-store pickup
3.9
Order management: view order history, track delivery status in real-time
3.10
Product usage history: log products being used, track duration and perceived effectiveness
3.11
Partner Store Finder: search GlowScan partner stores with professional measurement devices on a map
3.12
Book general consultation with staff or specialized consultation with beauty experts
3.13
View consultation history, expert notes, and recommended actions
3.14
Exercise & Routine (optional): AI-selected face yoga exercises and skincare routines based on scan results
3.15
Configure notification preferences (email, push) for order updates, routine reminders, and new recommendations
3.16
Rate and provide feedback on products, staff, and experts
4
Instructor/Expert Portal
4.1
Register / Login / Logout
4.2
Create and manage expert profile (bio, specializations, certifications, pricing)
4.3
Define consultation fee structure and availability schedule
4.4
View referred/booked clients with their scan results and product usage history
4.5
Conduct consultations, record treatment plans and follow-up notes
4.6
Upload content (tutorials, skincare tips, routine guides)
4.7
View earnings, commission breakdown, and transaction history
d) Proposed Tasks for students:
Task package 1: Develop AI facial skin analysis module (data collection, model training, aesthetic parameter definition, API integration for scan and product recommendations).
Task package 2: Develop e-commerce and inventory backend (product catalog, cart, checkout, payment integration, inventory tracking, 3rd-party delivery API integration, order management).
Task package 3: Develop consultation and user management backend (authentication, role-based access, staff/expert consultation workflows, product usage history, notification services).
Task package 4: Develop frontend web application (responsive UI/UX for end-users with e-commerce and AI scan, admin panel with inventory/order dashboards, staff portal, expert portal).
Task package 5: Build – Deploy – Test the system (end-to-end integration, cloud deployment, CI/CD pipelines, testing at all levels).
Task package 6: Prepare project documentation: system analysis & design, test plan, installation guide, user manual, etc. (all team members contribute).
Each work group should have many students participating, but there will be one member responsible for the main responsibility.
Notice: All students are required to understand the reference documents thoroughly and may need to explain them to the viva committee
