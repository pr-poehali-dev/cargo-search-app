"""AI-помощник для поиска лучших ставок на грузоперевозки"""
import json
import os
from openai import OpenAI

SYSTEM_PROMPT = """Ты — профессиональный помощник для перевозчиков и экспедиторов на бирже грузов ГрузПоток.
Твоя задача — помогать находить лучшие ставки, анализировать маршруты и давать советы по грузоперевозкам.

Ты умеешь:
- Анализировать маршруты и рассчитывать примерную стоимость
- Рекомендовать оптимальные ставки на основе дистанции, типа груза и сезона
- Объяснять, какие грузы выгоднее везти по конкретному направлению
- Советовать когда лучше брать груз (сезонность, загрузка направлений)
- Помогать в переговорах — как аргументировать цену

Базовые ставки для расчёта:
- Тент: 80-110 руб/км (до 20т)
- Рефрижератор: 120-160 руб/км (температурный режим +наценка 40%)
- Изотерм: 95-130 руб/км
- Борт/открытый: 70-100 руб/км
- Минимальный рейс: 15 000 руб

Попутная загрузка снижает ставку на 20-30%.
Срочность добавляет 15-25% к ставке.
Отвечай кратко, профессионально, по делу. Используй цифры и конкретику.
Пиши на русском языке."""


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    messages = body.get('messages', [])

    if not messages:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'messages required'})
        }

    client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])

    response = client.chat.completions.create(
        model='gpt-4o-mini',
        messages=[{'role': 'system', 'content': SYSTEM_PROMPT}] + messages,
        max_tokens=600,
        temperature=0.7,
    )

    reply = response.choices[0].message.content

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'reply': reply}, ensure_ascii=False)
    }
