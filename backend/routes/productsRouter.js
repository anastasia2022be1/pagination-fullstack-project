import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Маршрут для получения продуктов с пагинацией и сортировкой
router.get("/api", async (req, res, next) => {
    try {
        // Получаем параметры запроса для пагинации
        const limit = parseInt(req.query.limit) || 10; // Устанавливаем лимит продуктов на странице, по умолчанию 10
        const page = parseInt(req.query.page) || 1; // Получаем номер текущей страницы, по умолчанию 1
        const skip = (page - 1) * limit; // Вычисляем количество документов для пропуска

        // Объект сортировки по умолчанию
        let sorting = { name: "asc" }; // Изначально сортируем по имени в порядке возрастания

        // Проверяем параметр сортировки в запросе
        if (req.query.sort === 'cheapest') {
            sorting = { price: "asc" }; // Если sort=cheapest, изменяем сортировку на цену в порядке возрастания
        }

        // Инициализация объекта фильтра для максимальной цены
        let filter = {};

        // Проверяем, указан ли параметр max_price в запросе
        if (req.query.max_price) {
            let price = parseInt(req.query.max_price); // Парсим max_price в целое число
            filter = { price: { $lt: price } }; // Фильтруем продукты с ценой меньше max_price
        }

        // Выполняем запрос к MongoDB с сортировкой и пагинацией
        const data = await Product.find(filter) // Извлекаем записи из коллекции Product с учетом фильтра
            .sort(sorting) // Сортируем результаты согласно объекту sorting
            .skip(skip) // Пропускаем необходимое количество документов
            .limit(limit); // Ограничиваем количество продуктов до лимита

        res.json(data);
    } catch (error) {
        next(error);
    }
});

export default router;