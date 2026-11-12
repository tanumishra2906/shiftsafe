# SHIFTSAFE – UPDATED COMPLETE PRODUCT REQUIREMENTS DOCUMENT (PRD)
## AI-Powered Women's Workplace & Commute Safety Platform

**Project Name:** SHIFTSAFE  
**Product Type:** Web-Based Application  
**Domain:** Women Safety | Workplace Safety | Commute Safety | AI/ML | HRTech  
**Initial Target Users:** Working women, organisations, HR teams, safety responders and trusted family members/friends.

---

# IMPORTANT UPDATE – READ BEFORE DEVELOPMENT

This is the UPDATED version of the SHIFTSAFE product concept.

I have made several important changes to the original product and AI scope. Please consider this document the latest source of truth. If any previous instructions or architecture decisions conflict with this document, follow this updated PRD.

### Major changes from the previous version

1. SHIFTSAFE now has exactly four AI features.
2. AI Risk Assessment & Prioritisation has been removed.
3. AI Workplace Complaint Intelligence has been removed.
4. AI Commute Anomaly Detection has been retained.
5. AI Women's Safety Assistant has been added.
6. Smart Complaint Structuring has been added.
7. AI-Powered Smart Alert Generation has been added.
8. The platform will continue to have three separate portals.
9. The employee must remain in control of personal information sharing.
10. The product is not limited to cab tracking or emergency SOS. It covers safety during working hours, workplace misconduct and daily commute safety.

**Do not reintroduce the two removed AI features in future suggestions or architecture unless I explicitly ask you to reconsider them.**

---

# 1. PRODUCT OVERVIEW

SHIFTSAFE is an AI-powered women's workplace and commute safety platform designed to create a connected safety ecosystem for working women.

The platform connects three stakeholders:

1. Working women (Employees).
2. Organisations / Companies.
3. Trusted Contacts (Family members or Friends).

The primary objective is to help women feel safer during:

- Working hours.
- Day, evening and night shifts.
- Commutes to and from the workplace.
- Personal or workplace emergency situations.
- Situations involving workplace misconduct or harassment.

SHIFTSAFE is not simply an SOS application or cab-tracking platform.

It combines employee safety management, organisation-level safety coordination, trusted-contact connectivity, workplace complaint reporting and AI-powered assistance.

The initial product will be a responsive WEBSITE. A native mobile application may be developed in the future.

# 2. CORE PRODUCT STRUCTURE

The application will have three separate portals.

### Portal 1: Employee Portal
Route: `/employee`

For working women who want to manage their workplace and commute safety.

### Portal 2: Organisation Portal
Route: `/organisation`

For company administrators, HR teams, authorised safety responders and complaint handlers.

### Portal 3: Trusted Contacts / Companion Portal
Route: `/companion`

For family members or friends who receive authorised updates about an employee's shifts, journeys and emergencies.

All three portals share a common backend and database.

Access must be controlled through authentication, role-based authorisation, individual sharing permissions and database-level security.

# 3. LANDING PAGE AND GENERAL APPLICATION FLOW

## 3.1 Landing Page

The public landing page should communicate:

- What SHIFTSAFE is.
- Why workplace and commute safety matter.
- How SHIFTSAFE works.
- The three connected portals.
- Its four AI-powered features.
- Privacy and security principles.
- Benefits for employees and organisations.

Main actions:

- Get Started.
- Login.
- Explore Features.

The design should be modern, professional, trustworthy and women-focused without looking overly decorative.

## 3.2 Login

Common login interface:

- Email / phone number.
- Password.
- Forgot password.
- Login.
- Signup.

After authentication, redirect users to their respective authorised portal.

## 3.3 Registration

### Employee Registration

Fields:

- Full name.
- Email.
- Phone number.
- Password.
- Organisation invitation/code (optional).
- Employee ID (optional).

Employees may register independently, but organisation-specific features will require organisation verification/linking.

### Organisation Registration

Fields:

- Organisation name.
- Official email.
- Organisation type.
- Office address.
- Admin name.
- Contact number.
- Password.
- Verification details.

### Trusted Contact Registration

Fields:

- Name.
- Email or phone.
- Password or OTP verification.
- Invitation link/code from employee.

A trusted contact cannot access an employee's information until the employee approves the connection.

---

# 4. PORTAL ONE – EMPLOYEE DASHBOARD

This is the primary user-facing portal.

The interface should prioritise accessibility, quick actions and simple navigation, especially during emergencies.

## 4.1 Main Dashboard Structure

Suggested sidebar navigation:

1. Overview
2. My Shifts
3. Share My Journey
4. Emergency SOS
5. AI Safety Assistant
6. Workplace Complaints
7. My Complaints
8. Trusted Contacts
9. Notifications
10. Profile & Settings

### Dashboard Overview

The employee dashboard should contain:

**Welcome section**
- Employee name.
- Profile information.
- Organisation name (if linked).
- Current date.
- Current shift information.

**Shift Overview**
- Today's shift.
- Shift start and end time.
- Shift type.
- Office location.
- Upcoming shifts.

**Journey Overview**
- Current active journey.
- Cab provider.
- Pickup time.
- Expected arrival time.
- Journey status.

**Quick Actions**
- Start/Share Journey.
- Emergency SOS.
- Ask AI Safety Assistant.
- Submit Workplace Complaint.

**Safety Notifications**
- Upcoming shift reminders.
- Journey check-in reminders.
- AI-detected unusual journey events.
- Emergency updates.
- Complaint status updates.

The dashboard should show relevant information without overwhelming the employee.

## 4.2 Employee Profile

Fields:

- Full name.
- Phone.
- Email.
- Employee ID.
- Organisation.
- Department.
- Designation.
- Office location.
- Emergency contacts.
- Connected trusted contacts.

Organisation-provided details should be prefilled wherever possible.

## 4.3 My Shifts

The organisation manages official shift schedules.

Employees can view:

- Current shift.
- Upcoming shifts.
- Previous shifts.
- Shift date.
- Start time.
- End time.
- Shift type (Day / Evening / Night).
- Office location.
- Shift updates or changes.

Employees should receive notifications when their organisation changes a shift.

Important distinction:

Official shift timings and commute timings are two different things.

Example:

- Official shift: 2 PM – 11 PM.
- Employee's cab pickup: 11:15 PM.
- Expected arrival: 11:50 PM.

Both should be maintained separately.

## 4.4 Share My Journey

Employees generally book their own Ola, Uber, Rapido or other rides.

SHIFTSAFE must NOT assume that organisations provide cabs.

There will be no company cab allocation, driver assignment or fleet management.

The employee enters her own ride details.

### Journey Registration Form

- Travel date.
- Cab provider.
- Pickup time.
- Expected arrival time.
- Pickup location.
- Destination.
- Vehicle registration number.
- Driver name (optional).
- Driver phone number (optional).

### Information Sharing

The employee chooses who can receive journey information:

- Organisation.
- Trusted contacts.
- Both.
- Neither (private journey).

She can also separately enable or disable live location sharing.

The employee should be able to configure individual permissions.

### Journey Dashboard

Display:

- Journey information.
- Selected recipients.
- Journey status.
- Start journey.
- End journey.
- Edit journey.
- Stop sharing.

Journey statuses:

Planned → Started → In Transit → Completed.

### Journey Check-in

When the expected arrival time passes without a completion check-in:

1. Send a reminder to the employee.
2. Ask whether she has reached safely.
3. If she does not respond within the configured escalation period, follow the authorised notification workflow.
4. Notify only the selected recipients according to sharing permissions.

A missed check-in alone must not automatically be treated as proof of an emergency.

---

# 5. EMPLOYEE EMERGENCY SOS

Emergency SOS is a central feature of SHIFTSAFE.

It must work independently of AI.

## 5.1 Three SOS Actions

### A. Loud Emergency SOS

- Activates a loud local emergency alarm.
- Creates an emergency incident.
- Sends alerts to selected trusted contacts and authorised organisation responders if sharing is enabled.
- Attaches available location information according to permissions.
- Includes relevant shared journey details if applicable.

### B. Silent Emergency SOS

- Creates an emergency incident without playing a sound.
- Notifies authorised recipients.
- Includes available location and relevant journey details.

### C. Call Emergency Services

- Opens the phone dialler to call 112 in India.

## 5.2 SOS Workflow

Employee activates SOS.

↓

Backend creates an emergency incident.

↓

Notification service sends alerts.

↓

Available authorised location and journey information are attached.

↓

Recipients receive the notification.

↓

Recipients acknowledge the alert.

↓

Incident status gets updated.

### Incident Statuses

- SOS Received.
- Acknowledged.
- Responder Assigned.
- Employee Contacted.
- Incident Closed.

### Additional Options

- Test SOS (must not alert real recipients).
- Emergency contact management.
- Alert history.
- Preferred SOS mode.
- End emergency session.

### Future Mobile Feature

Shake-to-SOS:

A future native Android application may detect three phone shakes and trigger an emergency alert.

The initial website must use clickable SOS controls because browsers cannot reliably detect background phone shakes or guarantee execution when closed or locked.

---

# 6. AI FEATURES – FINAL APPROVED SCOPE

This is one of the most important sections of the updated PRD.

SHIFTSAFE will contain exactly FOUR AI features.

Do not add AI Risk Assessment & Prioritisation or AI Workplace Complaint Intelligence.

## AI FEATURE 1: AI COMMUTE ANOMALY DETECTION

**Purpose:** Identify unusual journey events and initiate proactive safety check-ins.

The system should monitor authorised journey information and identify unusual patterns.

### Possible detection indicators

- Journey taking significantly longer than expected.
- Unexpected route deviation when live location is enabled.
- Employee not checking in after the expected arrival time.
- Unusual journey timing compared with the registered journey.
- Unexpected journey interruption or prolonged inactivity, where reliable data is available.

### Workflow

1. Employee registers a journey.
2. Employee starts the journey.
3. The system receives journey updates according to available permissions.
4. An anomaly detection mechanism analyses the available journey information.
5. If an unusual event is detected, the employee receives a safety check-in.
6. The employee can confirm that she is safe or request help.
7. If there is no response within the configured period, the predefined escalation workflow can notify authorised recipients.

### Example

Registered journey:

- Pickup: 11:15 PM.
- Expected arrival: 11:50 PM.

At 12:05 AM, the employee has not completed her journey.

System notification:

"Your journey is taking longer than expected. Are you safe?"

Possible responses:

- I'm Safe.
- I Need Help.
- Call Emergency Contact.

### Important Requirements

- Do not assume every delay means danger.
- Do not automatically send an emergency alert solely because of an anomaly.
- Manual SOS must always remain available.
- Anomaly detection must work only with available and authorised information.
- Do not claim continuous tracking when browser limitations prevent it.

### Technical Approach

Consider:

- Python.
- Scikit-learn.
- Rule-based anomaly detection for initial MVP.
- ML-based anomaly detection as the model matures.
- FastAPI for connecting the model to the main application.

Evaluate whether a lightweight statistical or Isolation Forest model is appropriate.

Do not introduce unnecessary complexity without a clear reason.

## AI FEATURE 2: AI WOMEN'S SAFETY ASSISTANT

**Purpose:** Provide accessible, conversational and verified safety guidance.

The employee should be able to ask questions in normal language instead of searching through multiple resources.

### Example Questions

- What should I do if someone is harassing me at work?
- How can I report workplace harassment?
- What should I do if I feel unsafe during a cab journey?
- Which helpline should I contact?
- What are my options if my company does not respond to my complaint?
- Where can I find legal support?

### Features

1. Natural-language question understanding.
2. Conversational responses.
3. Verified safety guidance.
4. Relevant helpline information.
5. Workplace safety guidance.
6. Basic legal-resource guidance.
7. Multilingual support.
8. Relevant official resource links.

### Important

The AI should use a curated and verified knowledge base.

It should prioritise official government resources and trusted legal/safety information.

It must:

- Avoid fabricating helpline numbers.
- Avoid presenting uncertain legal information as fact.
- Distinguish general guidance from legal advice.
- Direct users to emergency services when appropriate.
- Avoid replacing emergency SOS.

### Suggested Technical Approach

- Gemini API or OpenAI API.
- Retrieval-Augmented Generation (RAG), if useful.
- Curated verified resource database.
- Source-aware responses.
- Next.js chat interface.

## AI FEATURE 3: SMART COMPLAINT STRUCTURING

**Purpose:** Convert natural-language workplace complaints into structured, reviewable reports.

Many employees may struggle to write formal complaints or organise incident details.

SHIFTSAFE should allow them to explain what happened in their own words.

### Example Input

"I was working late yesterday and my colleague repeatedly made inappropriate comments. I felt uncomfortable and I don't know how to report it."

### AI Processing

The AI identifies the available information and converts it into a structured format.

### Structured Output

- Complaint category: Inappropriate Behaviour.
- Incident date: Not provided.
- Incident time: Not provided.
- Workplace location: Not provided.
- Description: Organised incident description.
- Additional information required: Date, time and relevant context.

### Features

- Natural-language input.
- Complaint categorisation.
- Incident detail extraction.
- Structured report generation.
- Grammar and clarity improvement.
- Concise incident summary.
- Identification of missing information.
- Multilingual input support, if feasible.

### Most Important Workflow

Employee writes complaint.

↓

AI processes and structures the information.

↓

Employee reviews the generated report.

↓

Employee edits or approves it.

↓

Complaint is submitted.

↓

Organisation's authorised complaint handlers receive it.

AI must never submit a complaint without the employee's approval.

AI must not invent missing information, determine guilt or automatically decide the truth of an allegation.

## AI FEATURE 4: AI-POWERED SMART ALERT GENERATION

**Purpose:** Generate clear, contextual and actionable notifications from safety events.

This feature connects the anomaly detection system, SOS workflow and notification service.

### When can alerts be generated?

- AI Commute Anomaly Detection identifies an unusual journey event.
- Employee manually triggers SOS.
- Journey check-in is missed.
- An emergency incident is created.

### AI Responsibilities

- Generate readable alert messages.
- Summarise the detected event.
- Include relevant authorised journey information.
- Include available location information where permitted.
- Explain why the notification was generated.
- Suggest an appropriate next action.

### Example Alert

SHIFTSAFE – Smart Safety Alert

"An unusual journey delay has been detected.

The registered arrival time was 11:50 PM, but the journey is still marked as active.

Please contact the employee and verify her safety."

### Alert Recipients

Depending on the event and employee permissions:

- Employee.
- Selected trusted contacts.
- Organisation safety responders.

### Technical Distinction

AI generates the contextual notification text.

The actual trigger conditions, notification delivery, timers and escalation must be handled through reliable backend logic and predefined rules.

Do not make an LLM responsible for deciding whether an emergency notification should be delivered.

---

# 7. PORTAL TWO – ORGANISATION DASHBOARD

The organisation portal is for company administrators, HR teams and authorised safety responders.

It should help organisations manage employee shifts, receive authorised journey updates, coordinate emergencies and manage workplace complaints.

## 7.1 Organisation Dashboard Overview

Suggested sidebar:

1. Overview.
2. Employee Management.
3. Shift Management.
4. Journey Monitoring.
5. Emergency Response Centre.
6. Complaint Management.
7. Reports & Analytics.
8. Notifications.
9. Organisation Settings.
10. Roles & Permissions.

### Dashboard Overview Cards

- Total registered employees.
- Today's shifts.
- Night shifts.
- Employee-shared journeys.
- Active emergency incidents.
- Open complaints.

These should be real database-driven metrics, not hardcoded numbers.

## 7.2 Employee Management

Organisation admin can:

- Invite employees.
- Add employees.
- Verify employee IDs.
- Edit employee details.
- Assign departments.
- Add designations.
- Manage office locations.
- Activate/deactivate accounts.
- Assign organisation roles.

## 7.3 Shift Management

Organisation can create and manage employee shifts.

Fields:

- Employee or employee group.
- Shift date.
- Start time.
- End time.
- Shift type (Day / Evening / Night).
- Office location.
- Optional notes.

Actions:

- Create shifts.
- Edit shifts.
- Cancel shifts.
- Assign shifts.
- View daily/weekly shift calendars.
- Filter night shifts.
- Notify employees about changes.

Employees should receive updated information in their own portal.

## 7.4 Journey Monitoring

The organisation sees only journeys explicitly shared by employees.

Display:

- Employee name.
- Travel date.
- Cab provider.
- Vehicle number.
- Driver name/phone if shared.
- Pickup time.
- Expected arrival.
- Pickup/destination if shared.
- Journey status.
- Available live location if shared.

Filters:

- Date.
- Employee.
- Department.
- Journey status.
- Office location.

There must be NO company cab allocation, driver assignment, driver management or fleet management.

## 7.5 Emergency Response Centre

This is the organisation's central emergency-management module.

Display:

- Employee name and ID.
- Alert type.
- Activation time.
- Available location.
- Relevant authorised journey details.
- Notification status.
- Assigned responder.
- Incident status.

Actions:

- Acknowledge alert.
- Assign responder.
- Contact employee.
- Contact authorised emergency contacts where permitted.
- Record actions.
- Escalate to emergency services.
- Close incident with outcome notes.

AI-generated alert summaries should be available where appropriate.

The organisation is not a replacement for emergency services.

## 7.6 Complaint Management

The organisation can:

- View complaints within its authorised scope.
- Review AI-structured complaint reports.
- Assign authorised complaint handlers.
- Review evidence.
- Add internal notes.
- Update case status.
- Send secure status updates.
- Close cases with outcome notes.

### Complaint Modes

Two types:

**Identified Confidential Complaint**

The identity is available only to specifically authorised handlers.

**Anonymous Complaint**

The employee submits a report without their name or employee ID.

### Complaint Categories

- Harassment.
- Verbal misconduct.
- Bullying.
- Discrimination.
- Inappropriate behaviour.
- Unsafe workplace environment.
- Other.

### Complaint Statuses

Submitted → Under Review → Assigned → Action in Progress → Resolved.

Employees should receive a complaint reference ID and be able to track progress.

Important:

- General HR must not automatically access all sensitive complaints.
- Appropriate Internal Committee members should handle relevant formal POSH complaints.
- Anonymous reports must not expose reporter identity through hidden API fields, metadata or account identifiers.
- AI structuring must not change the original meaning of the complaint.
- Formal POSH procedures must be handled in accordance with applicable law.

## 7.7 Reports & Analytics

Basic organisation-level reports:

- Total employees.
- Shifts by date.
- Number of night shifts.
- Shared journeys.
- Emergency incidents.
- Average alert acknowledgement time.
- Complaints received.
- Complaints resolved.

Use aggregated statistics and avoid unnecessary disclosure of individual employee information.

**Do not implement AI Workplace Complaint Intelligence or AI-generated workplace complaint pattern analysis.**

## 7.8 Organisation Roles & Permissions

Suggested roles:

- Organisation Admin.
- HR Admin.
- Safety Responder.
- Complaint Handler.
- Internal Committee Member.
- Journey/Safety Liaison.

Each role must have only the access it requires.

A manager must not automatically access complaints involving them.

---

# 8. PORTAL THREE – TRUSTED CONTACTS / COMPANION DASHBOARD

This portal is for family members and friends connected to employees through approved invitations.

It is designed to help trusted people stay informed about authorised shifts, journeys and emergencies.

## 8.1 Companion Dashboard

Suggested sidebar:

1. Overview.
2. Connected People.
3. Shared Journeys.
4. Emergency Alerts.
5. Notifications.
6. Account Settings.

## 8.2 Connected People

Display:

- Connected employee.
- Profile details if shared.
- Organisation if shared.
- Shift timings if shared.
- Current journey if shared.
- Emergency notifications.

A trusted contact can connect with multiple employees only if each separately approves the connection.

## 8.3 Shared Journey Details

If the employee has granted permission, display:

- Cab provider.
- Vehicle registration.
- Driver information.
- Pickup time.
- Expected arrival.
- Pickup/destination.
- Journey status.
- Live location during an authorised session.

Notifications:

- Journey shared.
- Journey started.
- Journey check-in.
- Journey completed.
- Expected arrival passed without check-in.

## 8.4 Emergency Alerts

When an authorised emergency alert arrives, display:

- Employee name.
- Alert type.
- Activation time.
- Available location.
- Relevant shared journey information.
- AI-generated incident summary where applicable.

Actions:

- Acknowledge alert.
- Call employee.
- Contact emergency services.

Acknowledgement options:

- Received.
- Calling employee.
- Contacting emergency services.

## 8.5 Privacy Restrictions

Trusted contacts must never see:

- Workplace complaints.
- Employee ID/HR records.
- Other employees.
- Unshared journeys.
- Location outside an authorised sharing session.

The employee can revoke permissions at any time.

---

# 9. NOTIFICATION AND ALERT SYSTEM

SHIFTSAFE requires a common notification infrastructure.

Notification events may include:

- Shift assigned or updated.
- Journey registered.
- Journey started.
- Journey completed.
- Journey check-in reminder.
- Unusual journey event detected.
- AI-generated safety alert.
- Manual SOS.
- Complaint submitted.
- Complaint status updated.
- Trusted contact invitation.
- Trusted contact connection approved.

Notification channels:

- In-app notifications.
- Email.
- SMS where configured.
- Browser push notifications where supported.

Notifications must respect permissions and avoid exposing sensitive information in notification previews.

Delivery failures, duplicate alerts and delayed notifications must be handled appropriately.

---

# 10. TECHNOLOGY STACK

My current preferred stack:

### Frontend

- Next.js.
- React.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Lucide icons.

### Backend

- Next.js server-side logic.
- API routes / Route Handlers.
- Supabase.

I prefer not to introduce a separate Node.js/Express backend unless technically justified.

### Database

- PostgreSQL through Supabase.

### Authentication

- Supabase Auth.
- Email/password.
- Phone OTP where configured.
- Role-based access.
- Secure session handling.

### AI Layer

- Gemini API or OpenAI API for LLM-based functionality.
- Python.
- Scikit-learn.
- FastAPI for ML model integration where necessary.

### Maps and Location

- Browser Geolocation API.
- Google Maps or Mapbox.
- Location sharing only with explicit permission.

### Notifications

- Supabase Realtime.
- Email provider.
- SMS provider.
- Browser push notification service.

### Storage

- Supabase Storage for complaint evidence and attachments.

### Hosting

- Vercel.
- Supabase hosted backend/database.

---

# 11. DATABASE DESIGN

Potential PostgreSQL tables:

### Authentication and Organisation

- users
- organisations
- employees
- organisation_roles
- shifts

### Journey Management

- journeys
- journey_locations
- journey_checkins

### Trusted Contacts

- trusted_contacts
- trusted_contact_invitations
- sharing_permissions

### Emergency Management

- emergency_alerts
- alert_acknowledgements
- emergency_incidents
- incident_updates

### Workplace Complaints

- complaints
- complaint_updates
- complaint_attachments

### AI Features

- ai_conversations (if chat history is retained with consent).
- ai_messages (if required).
- ai_processing_logs (minimal metadata only, avoiding sensitive raw data where possible).

### General

- notifications
- audit_logs

Review the need for each table before implementation. Do not create unnecessary tables or duplicate existing entities.

Important relationships:

- One organisation has many employees.
- One employee has many shifts.
- One employee has many journeys.
- One employee can connect multiple trusted contacts.
- A trusted contact can connect to multiple employees through separate approvals.
- One journey can have multiple location updates and check-ins.
- One complaint can have multiple updates.
- One emergency incident can have multiple acknowledgements.

Do not introduce cab assignment, driver management or fleet management tables.

---

# 12. PRIVACY, SECURITY AND SAFETY REQUIREMENTS

These are non-negotiable.

1. Employees control their information sharing.
2. Organisation access must be permission-based.
3. Trusted contacts see only individually authorised information.
4. Complaint access must be strictly role-restricted.
5. Anonymous complaints must not reveal identity.
6. Use Supabase Row Level Security (RLS).
7. Never depend only on frontend button hiding for security.
8. Collect location only when authorised and required.
9. Define location-data retention policies.
10. Restrict evidence attachment access.
11. Record sensitive information access through audit logs.
12. Support immediate revocation of trusted-contact permissions.
13. Do not expose sensitive details through ordinary notifications.
14. Test internet loss, notification failure and location permission denial.
15. Prevent duplicate emergency alerts.
16. Keep manual SOS independent of AI.
17. AI-generated content must be reviewable where necessary.
18. Never fabricate missing complaint or incident information.
19. Do not allow AI to determine guilt or automatically validate allegations.
20. Do not allow AI failures to interrupt emergency workflows.

---

# 13. MVP DEVELOPMENT SCOPE

The project should be developed in phases.

### Phase 1 – Foundation

- Next.js project setup.
- Landing page.
- Authentication.
- Signup/login.
- Role-based routing.
- Supabase integration.
- User profiles.

### Phase 2 – Organisation Portal

- Organisation dashboard.
- Employee management.
- Shift management.
- Shift notifications.
- Role permissions.

### Phase 3 – Employee Portal

- Employee dashboard.
- Shift display.
- Share My Journey.
- Journey registration.
- Journey status.
- Individual sharing permissions.

### Phase 4 – Companion Portal

- Trusted contact invitations.
- Verification.
- Employee approval.
- Companion dashboard.
- Shared journey information.
- Permission-based notifications.

### Phase 5 – Emergency Management

- Loud SOS.
- Silent SOS.
- Emergency incident creation.
- Notification delivery.
- Acknowledgement.
- Available location sharing.
- Incident management.

### Phase 6 – Workplace Complaints

- Identified confidential complaints.
- Anonymous complaints.
- Evidence attachments.
- AI complaint structuring.
- Organisation complaint management.
- Complaint status tracking.

### Phase 7 – AI Integration

Implement the four approved AI features:

1. AI Commute Anomaly Detection.
2. AI Women's Safety Assistant.
3. Smart Complaint Structuring.
4. AI-Powered Smart Alert Generation.

Integrate them into the respective employee, organisation and companion workflows.

### Phase 8 – Finalisation

- Seek Help resources.
- Reports and analytics.
- Responsive design.
- Security testing.
- Notification testing.
- Error handling.
- Deployment.
- Pilot testing.

---

# 14. MVP VS FUTURE DEVELOPMENT

## Website MVP

The initial website should include:

- Three portals.
- Authentication and permissions.
- Employee management.
- Organisation shift management.
- Employee-entered journey details.
- Individual sharing permissions.
- Trusted contacts.
- Loud and silent SOS.
- Emergency notifications.
- Basic authorised location sharing.
- Workplace complaints.
- AI complaint structuring.
- AI Women's Safety Assistant.
- AI commute anomaly detection.
- AI smart alert generation.
- Seek Help resources.

## Future Native Mobile Application

- Shake-to-SOS.
- More reliable background location capabilities with appropriate permissions.
- Native push notifications.
- Better device-level emergency features.
- Improved journey monitoring.

## Future Integrations

- HRMS integrations.
- Ride-provider integrations if feasible.
- Additional languages.
- Advanced organisation reporting.

Do not make future integrations a dependency for the initial MVP.

---

# 15. WHAT I EXPECT FROM CLAUDE

Act as my:

- Product strategist.
- Senior full-stack architect.
- AI/ML engineer.
- Database architect.
- UI/UX consultant.
- Technical mentor.

I am a second-year B.Tech CSE student. Explain technical concepts clearly, but do not oversimplify important engineering decisions.

I want to develop this project step by step.

### Before writing code, I want you to:

1. Understand the complete updated product.
2. Review all three dashboards and their workflows.
3. Identify missing requirements or contradictions.
4. Evaluate the feasibility of all four AI features.
5. Explain which AI features require LLMs and which require ML.
6. Recommend an appropriate AI architecture.
7. Review the technology stack.
8. Review database relationships.
9. Design the access-control and sharing-permission architecture.
10. Identify security, privacy and legal concerns.
11. Separate hackathon MVP requirements from future features.
12. Estimate implementation complexity and dependencies.

### Important Development Instructions

- Do not start generating the entire project immediately.
- Do not randomly change the product concept.
- Do not remove existing core features without discussing them.
- Do not reintroduce the two removed AI features.
- Do not make the product cab-tracking-centric.
- Do not assume organisations provide cabs.
- Do not introduce unnecessary technologies.
- Do not use AI where simple backend logic is more reliable.
- Do not generate fake live dashboard data and present it as real.
- Maintain consistent design and functionality across all three portals.
- Explain the purpose of each major database table and API.
- Help me understand the code while building it.

When development starts, proceed screen by screen and feature by feature. First finalise the architecture and then build the application incrementally.

---

# 16. FIRST TASK – REVIEW THE UPDATED PRODUCT

Before coding, provide the following:

**A. Product Understanding**
Explain SHIFTSAFE in your own words and describe its complete three-portal ecosystem.

**B. Updated Dashboard Structure**
List every page, module, sidebar item, dashboard card and primary action for all three portals.

**C. AI Architecture**
Explain how the four approved AI features will work, what models/APIs they need, what data they consume and how they integrate with the application.

**D. Technical Architecture**
Recommend the frontend, backend, database, authentication, notification and AI architecture.

**E. Database Design**
Propose the initial PostgreSQL schema and relationships.

**F. Security and Privacy**
Explain how individual employee consent, RLS, complaint confidentiality and trusted-contact permissions will work.

**G. Development Roadmap**
Give a realistic implementation sequence for a working MVP.

**H. Open Decisions**
List any important decisions that still require my approval.

Do not begin coding until we have reviewed and agreed on the architecture.

## FINAL PRODUCT VISION

SHIFTSAFE should be a connected AI-powered safety ecosystem where:

- Women can manage their shifts, journeys, emergency situations and workplace complaints.
- Organisations can coordinate employee safety, manage shifts and respond to incidents.
- Trusted contacts can stay informed through employee-approved updates.
- AI can identify unusual commute events, provide verified safety guidance, structure workplace complaints and generate contextual safety alerts.

**The central principle of SHIFTSAFE is that technology should help women feel safer and more supported without taking away their control over their personal information.**