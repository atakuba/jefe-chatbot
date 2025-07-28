<template>
    <form @submit.prevent="handleSubmit" class="relative">
      <fieldset :disabled="isSubmitting">
          <textarea
          @keypress.enter.prevent="handleSubmit"
            v-model.trim="newMessage"
            class="transition p-4 w-full text-sm border border-slate-300/60 shadow-sm placeholder:text-slate-400/90 focus:ring-4 focus:ring-slate-200 rounded"
            placeholder="Enter your message...">
          </textarea>
          <button type="submit"
            class="absolute top-2 right-2 h-10 w-10 flex items-center justify-center bg-gradient-to-t from-sky-500 to-emerald-500 rounded text-white">
            <svg xmlns="https://i.postimg.cc/MG8FPwgC/image-4.png" width="16" height="16" fill="currentColor" class="bi bi-send"
              viewBox="0 0 16 16">
              <path
                d="M15.854.146a.5.5 0 0 0-.658-.046L.819 11.541a.5.5 0 0 0 .75.75L14.547 1.453l.75-.75a.5.5 0 0 0-.046-.658zM6.543 12.612l-1.328 4.996L7.188 7.184 6.543 12.612z" />
            </svg>
          </button>
          </fieldset>
        </form>
</template>

<script setup lang="ts">
import { marked } from "marked";
import dompurify from "Dompurify";

const newMessage = ref("");
const messages = useMessages();
const {customerInitials} = useCustomer();
const isSubmitting = ref(false);

async function handleSubmit() {
  isSubmitting.value = true;

    messages.value.push({
        // name: customerInitials.value,
        message: newMessage.value,
        isAta: false,
        timestamp: new Date().toLocaleString([], {
            timeStyle: "short",
        })
    });

    const userMessage = newMessage.value;
    newMessage.value = "";

    

    await $fetch("/api/message", {
      method: "POST",
      query: {
        message: userMessage,
      },
      async onResponse({response}) {
        const content = response._data.data[0].content[0];

        if (content.type != "text") {
          return;
        }
      const parsedMessage = await marked.parse(
      dompurify.sanitize(content.text.value)
    );

        messages.value.push({
        // name: "Ata",
        message: parsedMessage,
        isAta: true,
        timestamp: new Date().toLocaleString([], {
            timeStyle: "short",
        }),
    });
    isSubmitting.value = false;
      }
    });

    
}
</script>