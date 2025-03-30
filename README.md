# Frontend Take-Home Task Submission

This is my submission for the frontend take-home task. The project is built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. You’ll find the source code, and setup instructions below.

---

## Setup Instructions

To run the frontend project locally:

### 1. Clone the Repository or Extract the Zip

If provided as a zip, extract the contents. If using Git:

```bash
git clone git@github.com:MTayeb93/ev-charging-dashboard.git
cd ev-charging-dashboard
```

### 2. Install Dependencies & Run Project
```bash
npm install
npm run dev
```

### 3. Tech Stack & Libraries Used
React (with hooks)

TypeScript

Vite

Tailwind CSS

Chart.js (via react-chartjs-2)

Yup for schema-based form validation

Lucide-react for iconography

### 4. Design & Implementation Notes

 1- Form Controls:
    I used range sliders for numeric fields like probability, consumption, and charging power to guide users toward acceptable values and improve input UX.
    Despite using sliders, all values are still strictly validated using Yup — including dynamic error messages for solid backend readiness.

 2- Data Submission:
 Upon form submission, the generated payload (object to be sent to the backend) is logged in the console to simulate an API call.

 3- Submit Button:
 The submit button disables while submitting to prevent duplicate requests. While the effect might not be noticeable in this small task, it's built in for good practice.

 4- Responsiveness:
 The UI is fully responsive and works well across different screen sizes.

 5- PDF Export:
 Users can export or print the report as a PDF. This could be useful in real-world scenarios where businesses might want to generate printable charging reports for end clients.

 ### 5.  Future Improvements
 
 If I had more time or were continuing this project:

 1- Bonus Task — Dynamic Charge Point Types:
    I had a UI concept in mind using different car logos and color-coded icons to represent different charge point types (e.g., fast, slow, etc.) with clean, visual grouping.

 2- Adaptive Charting for Mobile:
    On mobile, I would like to replace bar charts with pie charts for better visibility and interaction. Bar charts can feel cramped on small screens, while pie charts offer a quicker overview.