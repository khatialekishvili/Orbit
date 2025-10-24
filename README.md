## Orbit – Angular 19 Responsive Dashboard App  

A feature-rich Angular 19 web application that integrates dynamic user, post, todo, and promotion pages — including an interactive spinning wheel and leaderboard.  
The project demonstrates clean architecture, modular structure, and full responsiveness with Angular 19’s modern syntax (`@if`, `@for`, standalone components, and signals).

## Overview  
Orbit is a complete Angular project designed as a dynamic dashboard.  
It connects to the **JSONPlaceholder API** to fetch users, posts, and todos — while also including a custom **Promotions page** with interactive features (spinning wheel + leaderboard).  
Every component is built using **standalone Angular components**, **signals**, and the new `@if` / `@for` syntax introduced in Angular 17+.

## How to run:
1. npm install
2. ng serve


## Application Structure  

| Page | Purpose | Key Features |
|------|----------|--------------|
| **Users** | View all users | Search functionality, Posts/Todos buttons, Responsive table layout |
| **Posts** | View user posts | Details modal popup, Filtered posts by selected user |
| **Todos** | View todo list | Completed tasks highlighted in green, Scrollable clean layout |
| **Promotions** | Interactive tools | Animated spin wheel, Leaderboard with dynamic filters |



## Technologies & Tools Used  

| Category | Description |
|-----------|-------------|
| **Framework** | Angular 19+ (Standalone Components + Modern Control Flow) |
| **Reactivity** | RxJS & Signals for data flow and state management |
| **Routing** | Angular Router for seamless page navigation |
| **Styling** | SCSS for modular, reusable, and responsive design |
| **Layout** | CSS Grid & Flexbox for adaptive layouts |
| **Data Source** | JSONPlaceholder API (mock backend) |
| **UI Elements** | Angular Material Icons for a clean, modern look |
| **Language** | TypeScript for strong typing and maintainable logic |



## Key Features at a Glance  
- **Burger Menu & Sidebar Layout** – adaptive navigation for all screens  
- **Real-Time Date & Time Display** – dynamically updating header clock  
- **Live Data from JSONPlaceholder** – users, posts, and todos fetched via API  
- **Search & Filter Features** – quick, client-side filtering for users  
- **Animated Spin Wheel** – interactive 10-sector game with smooth rotation  
- **Leaderboard with Dynamic Filters** – filter results by week (I, II, III, IV, or ALL)  
- **Cross-Browser Compatibility** – tested on Chrome, Firefox, Safari, Edge  
- **Angular 19 Modern Syntax** – leverages `@if`, `@for`, and signals for performance  
- **Clean, Scalable Architecture** – readable code and maintainable structure 
