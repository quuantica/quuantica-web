import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import { CHAT_SYSTEM_PROMPT } from '@/lib/chatPrompt';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Rate limiting muy básico en memoria (ip -> timestamps)
const rateMap = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_MINUTE = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = rateMap.get(ip) ?? [];
  const recent = arr.filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  rateMap.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_MINUTE;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          'El asistente no está configurado. Falta la variable ANTHROPIC_API_KEY en el servidor.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // IP del cliente para rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({
        error: 'Has enviado muchos mensajes seguidos. Espera un momento e intenta otra vez.',
      }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  let body: { messages: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'Mensajes vacíos.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Limitar tamaño total para evitar abuso
  const totalChars = messages.reduce((s, m) => s + m.content.length, 0);
  if (totalChars > 12_000) {
    return new Response(
      JSON.stringify({ error: 'La conversación es muy larga. Refresca la página para empezar de nuevo.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const client = new Anthropic({ apiKey });

  // Stream desde Anthropic y reenvío como text/event-stream simple
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await client.messages.stream({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 600,
          system: CHAT_SYSTEM_PROMPT,
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        });

        for await (const event of response) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err: any) {
        const msg =
          err?.message || 'Hubo un error al contactar el asistente. Intenta de nuevo.';
        controller.enqueue(encoder.encode(`\n\n⚠️ ${msg}`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
