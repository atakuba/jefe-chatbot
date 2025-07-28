<template>
  <section class="flex flex-col min-w-[520px] w-full">
    <!-- Customer Support Agent Header -->
    <div class="flex items-center gap-3.5 pb-4 border-b border-dashed">
      <div>
        <div class="w-12 h-12 overflow-hidden rounded-full image-fit border-2 border-slate-200/70">
          <img src="https://i.postimg.cc/MG8FPwgC/image-4.png" />
        </div>
      </div>
    </div>

    <!-- Messages -->
     <div class="text-center text-2xl py-12" v-if="pending">
      <svg xmlns="https://i.postimg.cc/MG8FPwgC/image-4.png" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 mx-auto animate-spin">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

     </div>
    <div ref="container" v-else class="flex-col gap-3.5 py-5 px-3 overflow-y-scroll h-[400px] space-y-4">
      <div v-for="message in messages" :key="message.timestamp" class="flex gap-3 items-start" :class="{'flex-row-reverse': !message.isAta}">
        <!-- Sender Avatar -->
        <div>
          <!-- Bot initials -->
          <div
            v-if="message.isAta"
            class="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full border-2 border-slate-200/70 bg-gradient-to-t from-indigo-500 to-purple-500 text-white font-bold text-sm uppercase">
            AI
          </div>

          <!-- User initials -->
          <div
            v-else
            class="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full border-2 border-slate-200/70 bg-gradient-to-t from-sky-500 to-emerald-500 text-white font-bold text-sm uppercase">
            {{ customerInitials }}
          </div>
        </div>

        <!-- Message Bubble -->
        <!-- Message Bubble -->
<div
  class="w-3/5 flex flex-col gap-2 border px-4 pt-3 pb-4 rounded-r-xl rounded-tl-xl bg-slate-50/80 border-slate-200/80">
  <!-- If bot: render HTML -->
  <div v-if="message.isAta" v-html="message.message"></div>
  
  <!-- If user: render plain text -->
  <div v-else>{{ message.message }}</div>

  <div class="text-xs text-slate-500/70">{{ message.timestamp }}</div>
</div>
      </div>
    </div>

    <MessageForm v-if="!pending" />
  </section>
</template>

<script setup lang="ts">
import type OpenAI from 'openai';

type ThreadMessage = OpenAI.Beta.Threads.Messages.Message;
const messages = useMessages(); // Message list with `isAta`
const { customerInitials } = useCustomer(); // Pulls initials from entered name
const container = ref();

onUpdated(() => {
  container.value.scrollTop = container.value.scrollHeight;
})

const {pending} = await useFetch("/api/message", {
  lazy: true,
  onResponse({response}) {
    response._data.data.reverse().forEach((element: ThreadMessage) => {
      const content = element.content[0];

    if(content?.type == "text") {
      messages.value.push({
        isAta: element.role == "assistant" ? true : false,
        message: content.text.value,
        timestamp: new Date().toLocaleString([], {
          timeStyle: "short",
        }),
      });
    }
    });
  },
});
</script>
