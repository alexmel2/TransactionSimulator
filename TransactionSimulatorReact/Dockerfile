# שלב 1: בנייה
FROM node:20-alpine AS build
WORKDIR /app

# העתקת קבצי ה-package מהתיקייה הספציפית
COPY TransactionSimulatorReact/package*.json ./

# התקנת התלויות
RUN npm install

# העתקת כל שאר קבצי ה-Frontend
COPY TransactionSimulatorReact/ .

# בנייה של הפרויקט
RUN npm run build

# שלב 2: שרת Nginx להגשת הקבצים
FROM nginx:alpine
# ב-Vite התיקייה היא dist, ב-CRA היא build
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]