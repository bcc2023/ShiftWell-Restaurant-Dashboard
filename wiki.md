
## Wiki for GoodOldDays ShiftWell System

### Project Understanding
**Overview**:
The GoodOldDays ShiftWell System is designed to tackle the significant challenge of manpower optimization in the hospitality and F&B sectors. This initiative arises from the need to address fluctuating customer demands, peak service hours, and high employee turnover rates, which are prevalent issues in these industries. The project aims to deploy advanced data-driven solutions to enhance the quality of service while minimizing operational costs through effective workforce management.
**Scope and Requirements**:

The GoodOldDays ShiftWell System project aims to achieve the following objectives:

#### Front-end:
1. **Dashboard Interface:** Design and develop an intuitive and responsive dashboard interface with clear navigation for easy access to essential functionalities.
   
2. **Customization Options:** Provide users with options to choose from minimization objectives in producing recommended schedules. Provide users with the employee database to easily manage employee information.
   
3. **Interactive Visualizations:** Implement interactive charts and graphs to present scheduling, forecasting, and dashboard in a user-friendly and engaging manner.
   
4. **User Experience Enhancements:** Focus on visual clarity and organization to enhance usability and engagement, ensuring a seamless and enjoyable experience for users.

#### Back-end:
1. **Visitor Forecasting:** Develop models and algorithms to accurately predict visitor demand based on historical data and trends, facilitating informed decision-making for staff scheduling and resource allocation.
   
2. **Automated Scheduling:** Build functionality to automate staff scheduling processes based on predicted demand and compliance rules, optimizing workforce management and operational efficiency.
   
3. **Workload Balancing:** Implement algorithms to balance workload and effectively manage staff schedules, ensuring equitable distribution of tasks and resources.

4. **Database Management:** Implement MySql database for robust employee information management to facilitate scheduling recommendation. 

#### Connecting Frontend and Backend:
- **Frontend and Backend APIs and Services:** Develop scalable Flask APIs with RESTful Design to support seamless data retrieval, manipulation, and storage, ensuring robust and efficient communication between frontend and backend components.





### Planning and Organization

** Milestones and Timeline**:

Requirement gathering (week 8): 
Both Backend and Frontend: Define objectives and research on the relevant technical expertise for frontend and backend.

Planning and data prep (week 9): 
Backend: Finalise the architecture for the system. Data preparation and preprocessing.
Frontend:  Finalise the webpage design and intended effect on interaction 

Model and dashboard development (week 10-11): 
Backend: Create the prediction model. Create the database. 
Frontend: Build real-time API and webpage html.

Integration and Testing (week 12): 
Both Backend and Frontend: Integration of the frontend and backend. Deploy system. Conduct final testing and bug fixing. 

**Task Allocation**
Frontend: 
Cao Han works on api building and employee 
Beichen works on css and Demand Forecast page
Boyu works on Dashboard page
Jiamin works on Recommended Schedule page
Backend: 


### Research and Analysis
**Extensive Data Analysis**:
The team employed rigorous data analysis methodologies to understand and predict customer behavior and demand. By examining historical sales data, weather patterns, and event schedules, the project developed a nuanced understanding of factors impacting customer volume. This comprehensive research allowed for the creation of accurate demand forecasting models that are pivotal for effective staff scheduling.

**Utilization of Predictive Analytics**:
Advanced predictive analytics tools were utilized to process and analyze large datasets, identifying trends and patterns that could influence staffing needs. The team integrated these insights into the dashboard, providing managers with real-time data on expected customer flows, thereby enabling proactive management of resources.

**Collaborative Research Approach**:
Collaboration with industry experts and stakeholders ensured that all research activities were aligned with real operational needs and challenges. Regular feedback sessions helped refine the data models and analytics, ensuring their relevance and accuracy in a dynamic business environment.
Possible references:
https://www.predicthq.com/events/lstm-time-series-forecasting
https://ietresearch.onlinelibrary.wiley.com/doi/10.1049/iet-its.2016.0208


### Creativity and Innovation
**Innovative Scheduling Solutions**:
Our project employs two distinct strategies to schedule employees, tailored to the specific needs of the restaurant. The first strategy, Reduce Cost, and the second, Good Service, each generate unique staff schedules based on the restaurant’s requirements. These modes are trained with different constraints to yield diverse scheduling outcomes.
As for our Dashboard, we’ve incorporated a booking system designed to accommodate walk-in customers without reservations. This feature enhances the ease of restaurant operations for the manager. Additionally, we’ve integrated a weather widget that enables the manager to forecast visitor numbers based on weather conditions. For instance, rainy weather might deter people from visiting Sentosa, resulting in fewer customers. Armed with this information, the manager can strategically decide to let some part-time staff leave early if necessary. This proactive approach ensures optimal staffing levels that align with customer demand.

Responsive Design Principles: Implementing responsive design principles ensures that web applications adapt seamlessly to different screen sizes and devices. By using flexible layouts, fluid grids, and media queries, developers can create a consistent user experience across various devices.

**Adaptive Features**:
The project team demonstrated innovation by integrating adaptive features such as weather-based scheduling adjustments and real-time booking management. These features allow the system to dynamically respond to sudden changes, ensuring that the business can maintain high service levels under varying conditions.

### Technical Skills
The project team managed complex data with high efficiency, utilizing advanced data processing tools and MySQL databases to power both data analysis and the real-time, predictive capabilities of the dashboard. The data management framework was optimized for handling large datasets, crucial for the accuracy of the predictive models.
The software development process was structured around agile methodologies, which facilitated rapid iterations and responsiveness to changing project needs. Front-end development was accomplished using HTML, CSS, and JavaScript, ensuring a robust and responsive user interface. The backend was developed using Node.js, which provided an event-driven architecture ideal for non-blocking asynchronous behaviors, enhancing the system’s scalability and throughput.
System integration was a key focus, with RESTful APIs designed using Node.js and Express framework ensuring seamless communication between the predictive analytics engine, the dynamic scheduling system, and the interactive dashboard. This integration was critical for maintaining efficient operations across different components of the system.
For machine learning capabilities, Python’s skopt (scikit-optimize) library, a Sequential model-based optimization package, was utilized to implement algorithms that enhanced the precision of demand forecasts. This setup ensured that the system was always aligned with the latest data insights, maintaining optimal performance and decision-making accuracy.




### Quality of Implementation
**Adherence to Best Practices**:
The implementation of the ShiftWell System adhered to industry best practices in software development, data security, and user interface design. Rigorous code reviews, consistent coding standards, and comprehensive testing protocols ensured high-quality outputs and reliable system performance.

**Attention to Detail**:
Quality was evident in every aspect of the system, from user interface elements to backend logic. Attention to detail ensured that even the smallest components contributed positively to the overall user experience and system functionality.

**System Robustness and Reliability**:
The ShiftWell System was rigorously tested under various operational scenarios to ensure its robustness and reliability. Stress testing, performance testing, and user acceptance testing were conducted to guarantee that the system could handle peak loads and complex operations without faltering.

**Feedback Integration**:
Throughout the project, feedback from end-users and stakeholders was continuously integrated into the development process. This iterative approach allowed the team to refine the system based on actual user needs and expectations, enhancing overall quality and effectiveness.

### Problem Solving

**Innovative Solutions for Staffing Fluctuations**:
The team leverages the employee database to manage sudden fluctuations in customer volume and staff availability. By integrating the database into the scheduling system, the project ensures that staffing levels are always optimized for both expected and unexpected scenarios, maintaining service quality without incurring unnecessary labor costs.

**Overcoming Technical Constraints**:
The team faced significant technical constraints, including limitations in data accuracy and availability. Through creative data augmentation techniques and the application of robust error-handling mechanisms, these issues were effectively mitigated, ensuring the reliability of the system’s outputs.

**Interdisciplinary Approach to Problem-Solving**:
The project benefitted from an interdisciplinary approach, combining insights from data science, software engineering, and operational management to devise holistic solutions. This collaborative effort was crucial in overcoming some of the most challenging aspects of the project, such as integrating real-time data feeds into the predictive models.

### Documentation of some important design decisions
Taking weather into consideration:
The consideration of real time weather conditions is reflected in both the frontend and backend ,as we believe it is an integral part of information in decision making of restaurant management. In Frontend, the project team decided to incorporate a weather widget into the dashboard, despite no explicit requirement for such a feature in the initial project specifications. Understanding the significant impact of weather on visitor attendance, particularly in Sentosa, the widget was designed to provide real-time weather forecasts. This enables the restaurant manager to make informed decisions regarding staffing and operational adjustments based on anticipated weather conditions. In Backend, The backend team developed a custom weather data scraper. This scraper autonomously gathers weather data from selected meteorological services and input the information into their model for more accurate results.  By integrating these features, the system not only meets the current needs but also prepares the platform for future scalability and functionality enhancements.

Proactive Design Approach:
Despite the absence of a specific requirement from the manager for an employee information database, the development team chose to implement a comprehensive employee management database. This decision was made to future-proof the system and extend its functionality, allowing for more robust operations such as detailed employee tracking, role management, and future scalability options. This proactive approach not only enhances the system's capabilities but also provides a foundation for potential feature expansions.

Comprehensive System Documentation:
The project's documentation is thorough and meticulously detailed. It covers every aspect of the system, from setup and configuration to user operation and maintenance. This documentation ensures that all users, regardless of their technical proficiency, can effectively interact with the system.

**Code Documentation and Standards**:
The source code is well-documented with comments and explanations that clarify the purpose and functionality of code blocks. Adherence to coding standards and best practices enhances the readability and maintainability of the code, facilitating easier updates and modifications.

**User Manuals and Training Materials**:
Detailed instructions to run code is available on GitHub, offering step-by-step guides on how to utilize the system’s features effectively. These materials are designed to help users quickly become proficient in navigating the dashboard and utilizing its various tools for decision-making. The data file and the entry point to input data file are clearly presented in the code directory and code file, enabling easy training with new data for future maintenance of the model.

**Technical Specifications and API Documentation**:
Technical specifications and API documentation are thoroughly written, providing developers and system integrators with the information needed to understand system interfaces and interactions. This documentation is crucial for ensuring successful integration with external systems and for future expansions of the system’s capabilities.

### Testing and Evaluation

#### Comprehensive Testing Framework
The GoodOldDays ShiftWell System was subjected to a rigorous testing framework to ensure its reliability and effectiveness. This included several phases:

- **Integration Testing:** Ensured that system modules operated cohesively.
- **System Testing:** Tested the complete system in an environment that simulated real-world conditions.
- **User Acceptance Testing (UAT):** Involved end users to validate the system against business requirements.

#### Evaluation of Outcomes
The system's performance was evaluated based on key indicators:

- **Accuracy of Predictive Models:** Match between system predictions and actual customer volumes.
- **User Interface Usability:** Feedback from users regarding the dashboard usability.
- **System Reliability and Responsiveness:** Performance under various operational scenarios.


### Presentation and Communication

#### Effective Information Dissemination
- **Detailed Demonstrations:** Showcased system functionalities successfully.
- **Strategic Meetings:** Held frequent meetings among members to align project goals.




