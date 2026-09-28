import type { ChatMessage } from "@/lib/types";

const iso = (hoursAgo: number) => new Date(Date.now() - hoursAgo * 3_600_000).toISOString();

function thread(driverId: string, entries: [ "dispatcher" | "driver", string, number ][]): ChatMessage[] {
  return entries.map(([from, text, hoursAgo], i) => ({
    id: `${driverId}-m${i + 1}`,
    driverId,
    from,
    text,
    sentAt: iso(hoursAgo),
  }));
}

export const messages: Record<string, ChatMessage[]> = {
  d1: thread("d1", [
    ["dispatcher", "Оленег, як там траса на Рівне, є затори?", 5.5],
    ["driver", "Все чисто, йду за графіком", 5.3],
    ["dispatcher", "Добре, тримай в курсі по прибуттю", 5.2],
  ]),
  d2: thread("d2", [
    ["dispatcher", "Ірино, бачу затримку по AO-10232, що сталось?", 3],
    ["driver", "Застрягла на митному пункті, годину чекаю", 2.8],
    ["driver", "Рушаю, буде плюс 1.5 год до ETA", 2.5],
    ["dispatcher", "Прийнято, попереджу клієнта", 2.4],
  ]),
  d3: thread("d3", [
    ["dispatcher", "Андрію, AO-10233 критичний — що по факту?", 1.5],
    ["driver", "Пробка на об'їзній через ремонт дороги, стою", 1.3],
    ["dispatcher", "Зрозумів, тримай новий ETA і повідом як рушиш", 1.2],
  ]),
  d5: thread("d5", [
    ["dispatcher", "Сергію, після Тернополя є нове завдання, готовий?", 20],
    ["driver", "Так, я вільний з обіду", 19.5],
  ]),
  d6: thread("d6", [
    ["dispatcher", "Наталіє, як вантаж, все ціле?", 6],
    ["driver", "Так, друковану продукцію везу акуратно 🙂", 5.8],
  ]),
  d8: thread("d8", [
    ["dispatcher", "Олено, до Кривого Рогу лишилось скільки?", 2],
    ["driver", "Хвилин 40, вже на під'їзді", 1.9],
  ]),
  d10: thread("d10", [
    ["dispatcher", "Тетяно, на завтра є рейс Львів — Рівне, візьмешся?", 12],
    ["driver", "Так, запишіть мене", 11.5],
  ]),
};
