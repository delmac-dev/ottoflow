## AI API ROUTE TODO

[✓] create a super/system prompt that is a scheduling assistant
[✓] so it calls a series of tools that does the read and write to db
[✓] call a responder tool with params error and concise reason
[✓] call postData tool with params list of object called properties, list of object called schedules.the properties is of type { type, value}which is a list of properties that defines the structure of schedule list. the schedules is of type {}[] the key gotten from the values in the properties list

## Implementation Details

### AI Scheduling Assistant Features:
1. **Super Prompt**: Comprehensive system prompt that guides the AI to act as a scheduling assistant
2. **Tool-based Architecture**: Two main tools for handling responses and data
3. **PDF Processing**: Handles timetable PDF uploads with user prompts
4. **Structured Data Extraction**: Converts unstructured schedule data into organized format

### Available Tools:
- **responder**: Handles errors and explanatory responses
- **postData**: Processes successfully extracted schedule data with properties and schedules arrays

### Usage:
Upload a timetable PDF and provide a prompt describing what you want to extract (e.g., "Extract all class schedules with times and locations")
