# OttoFlow

<img width="1599" height="899" alt="bg" src="https://github.com/user-attachments/assets/3589bce8-b47d-4b81-a77b-29972c40e027" />


An intelligent AI-powered timetable and schedule management application that extracts and organizes schedule data from PDF documents with visual board editing capabilities.

## Features

### 🤖 AI-Powered Schedule Extraction
- **Smart PDF Processing**: Upload timetable PDFs and extract schedule data using natural language prompts
- **Intelligent Consolidation**: Automatically merges consecutive time periods for the same course
- **Structured Data Output**: Converts unstructured PDF content into organized schedule objects

### 📊 Visual Board Interface
- **Interactive Canvas**: Drag-and-drop interface built with React Konva for visual schedule management
- **Multi-Board Support**: Create and manage multiple scheduling boards
- **Real-time Editing**: Dynamic board editing with selection tools and responsive design

### 🔧 Modern Tech Stack
- **Frontend**: Next.js 15 with React 19, TypeScript, and Tailwind CSS
- **UI Components**: Mantine UI library with custom theming
- **AI Integration**: Google Gemini AI for intelligent document processing
- **Authentication**: NextAuth.js for secure user management
- **Database**: MongoDB for data persistence
- **State Management**: Zustand for efficient state handling

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Google AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/delmac-dev/ottoflow.git
cd ottoflow
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Configure your MongoDB connection string, NextAuth secret, and Google AI API key.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Schedule Extraction
1. Upload a timetable PDF file
2. Provide a natural language prompt describing what to extract
3. The AI will process the document and extract structured schedule data
4. View and manage extracted schedules on the visual board interface

### Example Prompts
- "Extract all class schedules with times and locations"
- "Get Monday's computer science courses"
- "Find all lectures by Dr. Smith"

## API Reference

### POST `/api/ai`
Processes PDF files and extracts schedule data using AI.

**Request Body:**
```json
{
  "fileUrl": "string",
  "prompt": "string"
}
```

**Response:**
```json
{
  "message": "AI Processing Complete",
  "result": {
    "success": true,
    "data": {
      "schedules": [
        {
          "course": "COE 486",
          "start_time": "8:00",
          "end_time": "9:55",
          "location": "ECR",
          "lecturer": "A. S. Agbemenu"
        }
      ]
    }
  }
}
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── test/              # Development test components
├── components/            # Reusable React components
│   ├── ui/               # UI components
│   └── common/           # Common components
├── lib/                  # Utility libraries and configurations
│   ├── actions/          # Server actions
│   ├── stores/           # Zustand state stores
│   └── schema.ts         # Zod validation schemas
└── public/               # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- AI powered by [Google Gemini](https://ai.google.dev/)
- Canvas functionality powered by [Konva.js](https://konvajs.org/) and [React Konva](https://github.com/konvajs/react-konva)
