# UI Service

This project provides the user interface for the Vocal Studio application. It allows users to interact with the platform. You can run the service either with its internal Docker Compose file or as part of a unified setup with other project services.

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Docker
- Docker Compose

### Running the Service

#### Option 1: Using the Unified Docker Compose File (preferable)

1. Request the unified Docker Compose file from the application developer.

2. Use the unified Docker Compose file to run all services, including the UI service, database, and RabbitMQ:
   ```bash
   docker-compose -f <unified-docker-compose-file>.yml up --build
   ```

3. The UI service will start on port `3000` as part of the complete setup.

#### Option 2: Using the Internal Docker Compose File

1. Clone the repository:
   ```bash
   git clone https://github.com/yanakapylova/vocal-studio-ui
   cd https://github.com/yanakapylova/vocal-studio-ui

2. Start the service using the internal Docker Compose file:
   ```bash
   docker-compose up --build
   ```

3. The service will start on port `3000`.

## Configuration

- **Port**: The service runs on port `3000` by default.

## Test Credentials

Use the following test credentials to log in:

### Student Account (limited permissions):
- **Email**: yana@gmail.com
- **Password**: qwerty

### Teacher Account (admin permissions):
- **Email**: kristina@gmail.com
- **Password**: qwerty

## Troubleshooting

- **Port Conflicts**: If port `3000` is already in use, update the port in the Docker Compose file.
- **Database Connectivity**: Ensure the database URL is correct and reachable from the service.

## Contact
For questions or issues, please contact the application developer or the team responsible for this project.
