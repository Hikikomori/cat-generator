# 🐱 Cat Generator 9000

Одностраничное приложение на **Next.js + TypeScript + MobX** для генерации случайных изображений котиков 🐈
Проект реализован в качестве pet-проекта для практики клиентского состояния, SSR и архитектуры.

## 🚀 Live demo
👉 [cat-generator-9000.netlify.app](https://cat-generator-9000.netlify.app)

## 🛠 Стек технологий

- Next.js
- TypeScript
- MobX
- React Hook Form
- SCSS Modules
- Netlify
- Docker (сборка и запуск контейнера)

## 🧩 Возможности

- Получение случайных изображений котиков через публичный API
- Управление состоянием через MobX
- Формы с валидацией через React Hook Form
- Чистый и адаптивный интерфейс с отзывчивой загрузкой и обработкой действий
- SSR на базе Next.js
- Модульная архитектура с SCSS Modules
- Возможность сборки и запуска в Docker-контейнере

## ⚙️ Установка и запуск

```bash
git clone https://github.com/Hikikomori/cat-generator.git
cd cat-generator
npm install
npm start
```

### Запуск через Docker

```bash
docker build -t cat-generator .
docker run -p 3000:3000 cat-generator
```

## 📸 Скриншот

![Интерфейс приложения](./public/interface.jpg)
