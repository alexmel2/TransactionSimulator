@echo off
echo Creating Docker configuration files...

:: 1. Create docker-compose.yml in the root folder
(
echo services:
echo   db:
echo     image: mcr.microsoft.com/mssql/server:2022-latest
echo     container_name: sql_server_db
echo     environment:
echo       - ACCEPT_EULA=Y
echo       - MSSQL_SA_PASSWORD=YourStrong@Pass123
echo     ports:
echo       - "1433:1433"
echo     volumes:
echo       - mssql_data:/var/opt/mssql/data
echo.
echo   server:
echo     build: ./TransactionSimulatorAPi
echo     container_name: backend_api
echo     depends_on:
echo       - db
echo     environment:
echo       - ConnectionStrings__DefaultConnection=Server=db,1433;Database=ShvaTransactionDb;User Id=sa;Password=YourStrong@Pass123;TrustServerCertificate=True;MultipleActiveResultSets=true;
echo     ports:
echo       - "5000:8080"
echo.
echo   client:
echo     build: ./TransactionSimulatorReact
echo     container_name: frontend_react
echo     ports:
echo       - "3000:80"
echo     depends_on:
echo       - server
echo.
echo volumes:
echo   mssql_data:
) > docker-compose.yml

:: 2. Create Dockerfile in API folder
cd TransactionSimulatorAPi
(
echo FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
echo WORKDIR /app
echo COPY *.csproj ./
echo RUN dotnet restore
echo COPY . ./
echo RUN dotnet publish -c Release -o out
echo.
echo FROM mcr.microsoft.com/dotnet/aspnet:8.0
echo WORKDIR /app
echo COPY --from=build /app/out .
echo ENV ASPNETCORE_URLS=http://+:8080
echo EXPOSE 8080
echo ENTRYPOINT ["dotnet", "TransactionSimulatorAPi.dll"]
) > Dockerfile
cd ..

:: 3. Create Dockerfile in React folder
cd TransactionSimulatorReact
(
echo FROM node:18 AS build
echo WORKDIR /app
echo COPY package*.json ./
echo RUN npm install
echo COPY . ./
echo RUN npm run build
echo.
echo FROM nginx:alpine
echo COPY --from=build /app/build /usr/share/nginx/html
echo EXPOSE 80
echo CMD ["nginx", "-g", "daemon off;"]
) > Dockerfile
cd ..

echo DONE! All files created successfully.
pause