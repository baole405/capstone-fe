# GlowScan - Project Context

## 1. Project Overview

- **Name**: GlowScan
- **Domain**: Beauty-Tech E-Commerce Platform
- **Core Concept**: "A smart mirror in your phone." Combines AI-powered facial skin analysis with personalized skincare recommendations, e-commerce, and tiered expert consultations.
- **Target Audience**: Women aged 18-35 seeking reliable, personalized skincare advice and convenient shopping.

## 2. Frontend Architecture & Tech Stack (ReactJS)

- **Framework**: ReactJS (Single Page Application - SPA)
- **Primary Roles/Portals**:
  1. End-Users (Responsive Mobile-first Web)
  2. Admin Panel (Web)
  3. Staff Portal (General Consultation)
  4. Expert Portal (Specialized Consultation)
- **Backend Ecosystem**: NestJS (Core API, E-commerce, Inventory) + Python/FastAPI (AI Models) + PostgreSQL.

## 3. Core Frontend Domains & Features

- **Face Scan AI Flow**: Camera integration/photo upload -> Display AI analysis results (acne, wrinkles, pores) with visual annotations and disclaimers.
- **E-Commerce Flow**: Product catalog, complex filtering, cart management, checkout, payment integration, order tracking.
- **Consultation System**: Chat/Booking interfaces for Staff (general) and Experts (specialized), consultation notes management.
- **Progress Tracking**: Multi-version photo comparison UI (Before/During/After) showing AI parameter differences.
- **Partner Store Finder**: Map-based search for physical stores equipped with professional measurement devices.

## 4. AI Agent Instructions

- **Coding Standard**: Follow strictly component-based architecture, ensure mobile responsiveness (Mobile-First approach).
- **Data Handling**: The frontend will communicate heavily with REST APIs. Assume robust loading/error states are required for all AI and E-commerce operations.
- **Security**: Never expose sensitive API keys in the frontend. Ensure secure photo transmission flows.
