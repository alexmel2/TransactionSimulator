# שלב 1: בנייה (Build)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# העתקת כל תיקיית השורש (ה-Context הוא התיקייה הראשית)
COPY . .

# ביצוע ה-Restore בנתיב המדויק שראינו בתמונה!
RUN dotnet restore "TransactionSimulatorAPi/TransactionSimulator.Api/TransactionSimulator.Api.csproj"

# מעבר לתיקייה הפנימית ובנייה שלה
WORKDIR "/src/TransactionSimulatorAPi/TransactionSimulator.Api"
RUN dotnet publish "TransactionSimulator.Api.csproj" -c Release -o /app/out

# שלב 2: הרצה (Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "TransactionSimulator.Api.dll"]