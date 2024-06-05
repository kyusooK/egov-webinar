# Node.js 런타임을 부모 이미지로 사용
FROM node:14-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 코드 복사
COPY . .

# React 애플리케이션 빌드
RUN npm run build

# 빌드된 애플리케이션을 제공하기 위해 Nginx 이미지 사용
FROM nginx:alpine

# 빌드 결과물을 Nginx HTML 디렉토리로 복사
COPY --from=0 /app/build /usr/share/nginx/html

# 포트 80 노출
EXPOSE 80

# Nginx 서버 시작
CMD ["nginx", "-g", "daemon off;"]